import {
  formatAnswerForSheet,
  QUESTIONS,
  type Answers,
} from "@/lib/questions";

export type LaptopPick = {
  rank: number;
  name: string;
  approxPriceInr: string;
  why: string;
  tradeoffs: string;
  buyTip: string;
};

export type Recommendations = {
  summary: string;
  picks: LaptopPick[];
};

type ResponsesApiResult = {
  output_text?: string;
  output?: Array<{
    type?: string;
    content?: Array<{
      type?: string;
      text?: string;
    }>;
  }>;
  error?: { message?: string };
};

function formatAnswersForPrompt(answers: Answers): string {
  return QUESTIONS.map((question) => {
    const value = formatAnswerForSheet(answers[String(question.id)]);
    return `Q${question.id}. ${question.prompt}\nA: ${value}`;
  }).join("\n\n");
}

function extractOutputText(response: ResponsesApiResult): string {
  if (typeof response.output_text === "string" && response.output_text.trim()) {
    return response.output_text;
  }

  const chunks: string[] = [];
  for (const item of response.output ?? []) {
    if (item.type !== "message") continue;
    for (const content of item.content ?? []) {
      if (content.type === "output_text" && content.text) {
        chunks.push(content.text);
      }
    }
  }
  return chunks.join("\n").trim();
}

function parseRecommendationsJson(raw: string): Recommendations {
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = (fenced?.[1] ?? raw).trim();
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1) {
    throw new Error("Model did not return JSON.");
  }

  const parsed = JSON.parse(candidate.slice(start, end + 1)) as Recommendations;
  if (!parsed.summary || !Array.isArray(parsed.picks) || parsed.picks.length === 0) {
    throw new Error("Model JSON missing summary or picks.");
  }

  const picks = parsed.picks.slice(0, 3).map((pick, index) => ({
    rank: Number(pick.rank) || index + 1,
    name: String(pick.name ?? "").trim(),
    approxPriceInr: String(pick.approxPriceInr ?? "").trim(),
    why: String(pick.why ?? "").trim(),
    tradeoffs: String(pick.tradeoffs ?? "").trim(),
    buyTip: String(pick.buyTip ?? "").trim(),
  }));

  if (picks.some((pick) => !pick.name || !pick.why)) {
    throw new Error("Model JSON incomplete.");
  }

  return {
    summary: String(parsed.summary).trim(),
    picks,
  };
}

export async function generateLaptopRecommendations(
  answers: Answers
): Promise<Recommendations> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  const questionnaire = formatAnswersForPrompt(answers);

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      tools: [
        {
          type: "web_search",
          search_context_size: "low",
        },
      ],
      max_output_tokens: 1200,
      instructions: [
        "You are a practical laptop advisor for shoppers in India.",
        "Use web search to find currently available laptops and approximate INR prices on Amazon.in, Flipkart, or official brand sites.",
        "Respect the user's budget and priorities from the questionnaire.",
        "Prefer models that are realistically available to buy in India now.",
        "Return exactly 3 picks: 1) best overall fit, 2) best value, 3) stretch option if useful (or a safer alternative if budget is tight).",
        "Prices change often - use approximate ranges and say so in buyTip when helpful.",
        "Respond with JSON only, no markdown, matching this shape:",
        '{"summary":"short paragraph","picks":[{"rank":1,"name":"Model","approxPriceInr":"₹xx,xxx","why":"...","tradeoffs":"...","buyTip":"..."}]}',
      ].join(" "),
      input: [
        {
          role: "user",
          content: `Recommend laptops based on this questionnaire:\n\n${questionnaire}`,
        },
      ],
    }),
  });

  const data = (await response.json()) as ResponsesApiResult;

  if (!response.ok) {
    throw new Error(data.error?.message || `OpenAI request failed (${response.status})`);
  }

  const text = extractOutputText(data);
  if (!text) {
    throw new Error("Empty recommendation response.");
  }

  return parseRecommendationsJson(text);
}
