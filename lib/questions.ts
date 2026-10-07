export type QuestionType = "single" | "multi" | "text" | "rank";

export type Question = {
  id: number;
  type: QuestionType;
  prompt: string;
  helper?: string;
  options?: string[];
  /** For rank questions: items to order 1..N */
  rankItems?: string[];
  placeholder?: string;
};

export const QUESTIONS: Question[] = [
  {
    id: 1,
    type: "single",
    prompt: "What is the main purpose of the laptop?",
    options: [
      "Office work",
      "Programming/development",
      "Programming + AI",
      "Programming + gaming",
      "Programming + video/photo editing",
      "Everything",
    ],
  },
  {
    id: 2,
    type: "multi",
    prompt: "What kind of development will be done?",
    helper: "Select all that apply.",
    options: [
      "Websites",
      "Mobile apps",
      "Backend/server development",
      "Data science/Python",
      "AI/ML",
      "Not sure / mixed development",
    ],
  },
  {
    id: 3,
    type: "single",
    prompt: "Will you run many applications together?",
    helper: "Example: Chrome + VS Code + Teams + Docker + database + Postman.",
    options: ["Usually only a few", "Quite a lot", "Very heavy multitasking"],
  },
  {
    id: 4,
    type: "single",
    prompt: "Will you use Docker or virtual machines?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: 5,
    type: "single",
    prompt: "Will you develop Android/mobile apps using Android Studio?",
    options: ["Yes", "No", "Maybe later"],
  },
  {
    id: 6,
    type: "single",
    prompt: "Will you run AI models directly on the laptop?",
    helper: "Example: Ollama, local LLMs, image generation, machine learning.",
    options: ["Yes, definitely", "Occasionally", "No", "Not sure"],
  },
  {
    id: 7,
    type: "single",
    prompt: "Do you need a dedicated graphics card?",
    helper:
      "In simple terms: do you want the laptop to handle AI, gaming, 3D work, or heavy graphics?",
    options: ["Yes", "No", "I don't know"],
  },
  {
    id: 8,
    type: "single",
    prompt: "Do you play games on the laptop?",
    options: ["No", "Occasionally", "Yes, regularly"],
  },
  {
    id: 9,
    type: "single",
    prompt: "How important is laptop weight?",
    options: [
      "Very important - I carry it every day",
      "Somewhat important",
      "Not important - mostly stays on desk",
    ],
  },
  {
    id: 10,
    type: "single",
    prompt: "What is the maximum weight you would be comfortable carrying?",
    options: [
      "Around 1.3–1.5 kg",
      "Around 1.5–1.8 kg",
      "Around 2 kg",
      "Even 2.3–2.5 kg is okay",
    ],
  },
  {
    id: 11,
    type: "single",
    prompt: "How important is battery life?",
    options: [
      "Very important - need 7–10 hours",
      "5–7 hours is enough",
      "Mostly plugged in, so not important",
    ],
  },
  {
    id: 12,
    type: "single",
    prompt: "What screen size would you prefer?",
    options: [
      "14-inch: portable",
      "15.6-inch: balanced",
      "16-inch: larger screen",
      "No preference",
    ],
  },
  {
    id: 13,
    type: "single",
    prompt: "Will you normally use an external monitor?",
    options: ["Yes, most of the time", "Sometimes", "No"],
  },
  {
    id: 14,
    type: "single",
    prompt: "Is screen quality very important?",
    helper: "Example: very sharp display, rich colours, OLED.",
    options: ["Very important", "Nice to have", "Not important"],
  },
  {
    id: 15,
    type: "single",
    prompt: "Do you work outdoors or in brightly lit places often?",
    options: ["Yes", "Sometimes", "No"],
  },
  {
    id: 16,
    type: "single",
    prompt:
      "Do you want the laptop to have a number keypad on the right side of the keyboard?",
    options: ["Yes", "No", "Don't care"],
  },
  {
    id: 17,
    type: "single",
    prompt: "How much storage do you need?",
    options: [
      "512 GB is enough",
      "1 TB preferred",
      "More than 1 TB eventually",
    ],
  },
  {
    id: 18,
    type: "single",
    prompt: "Do you store large files locally?",
    helper:
      "Example: videos, source-code repositories, databases, virtual machines, AI models.",
    options: ["Yes, many", "Some", "Very few"],
  },
  {
    id: 19,
    type: "single",
    prompt: "Do you want the option to increase RAM later?",
    options: ["Yes, definitely", "Preferably", "Don't care"],
  },
  {
    id: 20,
    type: "single",
    prompt: "Would you prefer 32 GB RAM now if it fits within the budget?",
    options: ["Yes", "16 GB is enough", "Don't know"],
  },
  {
    id: 21,
    type: "single",
    prompt: "How long do you expect to keep this laptop?",
    options: ["2–3 years", "4–5 years", "5+ years"],
  },
  {
    id: 22,
    type: "single",
    prompt: "What matters more?",
    options: [
      "Maximum performance",
      "Maximum battery life",
      "Lightweight",
      "Balanced combination",
    ],
  },
  {
    id: 23,
    type: "single",
    prompt:
      "Would you accept a gaming-looking laptop if it gives much better performance?",
    options: [
      "Yes",
      "Maybe, if design is subtle",
      "No, I want a professional-looking laptop",
    ],
  },
  {
    id: 24,
    type: "single",
    prompt:
      "Would you accept a thick/heavy laptop if performance is significantly better?",
    options: ["Yes", "Maybe", "No"],
  },
  {
    id: 25,
    type: "single",
    prompt: "Do you frequently travel with your laptop?",
    options: [
      "Daily commute",
      "A few times a week",
      "Occasionally",
      "Rarely",
    ],
  },
  {
    id: 26,
    type: "single",
    prompt: "Do you need good speakers/webcam for meetings?",
    options: ["Very important", "Normal quality is fine", "Not important"],
  },
  {
    id: 27,
    type: "single",
    prompt: "Do you need fingerprint login or face recognition?",
    options: ["Yes", "Nice to have", "No"],
  },
  {
    id: 28,
    type: "multi",
    prompt: "Are there any brands you prefer?",
    helper: "Select all that apply.",
    options: [
      "Lenovo",
      "HP",
      "Dell",
      "ASUS",
      "Acer",
      "Apple",
      "No preference",
    ],
  },
  {
    id: 29,
    type: "text",
    prompt: "Are there any brands you do NOT want?",
    helper: 'Mention brand(s), or type "No restriction".',
    placeholder: "e.g. Acer, or No restriction",
  },
  {
    id: 30,
    type: "multi",
    prompt: "Are you comfortable buying online from:",
    helper: "Select all that apply.",
    options: [
      "Amazon",
      "Flipkart",
      "Brand's official website",
      "Reliance/Croma/Vijay Sales",
      "Any reliable seller",
    ],
  },
  {
    id: 31,
    type: "multi",
    prompt: "Do you have any particular bank credit/debit cards?",
    helper: "This can matter a lot during sales. Select all that apply.",
    options: [
      "SBI",
      "HDFC",
      "ICICI",
      "Axis",
      "Kotak",
      "Other",
      "None",
    ],
  },
  {
    id: 32,
    type: "single",
    prompt:
      "Are you okay using credit-card offers or EMI to stretch your budget?",
    options: ["Yes", "No"],
  },
  {
    id: 33,
    type: "text",
    prompt: "What is your budget?",
    helper: "Enter your maximum budget in rupees, or a range if you prefer.",
    placeholder: "e.g. 60000 or 50000-70000",
  },
  {
    id: 34,
    type: "single",
    prompt: "Would you consider an open-box/refurbished laptop?",
    options: [
      "No, new only",
      "Open-box from reliable seller",
      "Refurbished is also okay",
    ],
  },
  {
    id: 35,
    type: "single",
    prompt: "What operating system do you intend to use?",
    options: ["Windows only", "Windows + WSL/Linux", "Linux", "Not sure"],
  },
  {
    id: 36,
    type: "single",
    prompt: "Do you need Microsoft Office included?",
    options: ["Yes", "Nice to have", "No"],
  },
  {
    id: 37,
    type: "single",
    prompt: "Do you want the laptop primarily for work rather than entertainment?",
    options: [
      "Almost entirely work",
      "Mostly work",
      "50/50 work and entertainment",
    ],
  },
  {
    id: 38,
    type: "single",
    prompt: "Which is more important to you?",
    options: [
      "Laptop should feel fast today",
      "Laptop should remain powerful for 4–5 years",
    ],
  },
  {
    id: 39,
    type: "single",
    prompt: "If I give you two choices, which sounds better?",
    options: [
      "A: 1.5 kg, excellent battery, very good performance",
      "B: 2.3 kg, average battery, much higher performance + powerful graphics",
    ],
  },
  {
    id: 40,
    type: "rank",
    prompt: "Rank these from 1 to 6, where 1 is most important:",
    helper: "Assign each item a unique rank from 1 (most important) to 6 (least).",
    rankItems: [
      "Performance",
      "Portability",
      "Battery",
      "Screen",
      "Future upgradeability",
      "Build quality",
    ],
  },
];

export const QUESTION_IDS = QUESTIONS.map((q) => q.id);

export type AnswerValue =
  | string
  | string[]
  | Record<string, number>;

export type Answers = Record<string, AnswerValue>;

export function isAnswerComplete(question: Question, value: AnswerValue | undefined): boolean {
  if (value === undefined || value === null) return false;

  if (question.type === "single" || question.type === "text") {
    return typeof value === "string" && value.trim().length > 0;
  }

  if (question.type === "multi") {
    return Array.isArray(value) && value.length > 0;
  }

  if (question.type === "rank") {
    if (typeof value !== "object" || Array.isArray(value)) return false;
    const items = question.rankItems ?? [];
    const ranks = Object.values(value);
    if (items.some((item) => !(item in value))) return false;
    if (ranks.length !== items.length) return false;
    const unique = new Set(ranks);
    if (unique.size !== items.length) return false;
    return ranks.every((r) => Number.isInteger(r) && r >= 1 && r <= items.length);
  }

  return false;
}

export function formatAnswerForSheet(value: AnswerValue | undefined): string {
  if (value === undefined) return "";
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.join(", ");
  return Object.entries(value)
    .map(([key, rank]) => `${key}=${rank}`)
    .join("; ");
}
