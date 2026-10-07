import { NextResponse } from "next/server";

import { appendSubmissionRow } from "@/lib/google-sheets";
import {
  isAnswerComplete,
  QUESTIONS,
  type AnswerValue,
  type Answers,
} from "@/lib/questions";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubmitBody = {
  name?: string;
  email?: string;
  answers?: Answers;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SubmitBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim().toLowerCase() ?? "";
    const answers = body.answers ?? {};

    if (!name) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    for (const question of QUESTIONS) {
      const value = answers[String(question.id)] as AnswerValue | undefined;
      if (!isAnswerComplete(question, value)) {
        return NextResponse.json(
          { error: `Please answer question ${question.id}.` },
          { status: 400 }
        );
      }
    }

    await appendSubmissionRow({ name, email, answers });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Submit failed:", error);
    return NextResponse.json(
      { error: "Could not save your answers. Please try again." },
      { status: 500 }
    );
  }
}
