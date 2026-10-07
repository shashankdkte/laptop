"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SubmitOverlay } from "@/components/submit-overlay";
import {
  isAnswerComplete,
  QUESTIONS,
  type AnswerValue,
  type Answers,
} from "@/lib/questions";
import type { Recommendations } from "@/lib/openai-recommend";
import {
  clearQuizSession,
  loadAnswers,
  loadUser,
  saveAnswers,
  saveRecommendations,
  type UserIdentity,
} from "@/lib/session";
import { Loader2 } from "lucide-react";

export default function QuizPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserIdentity | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const storedUser = loadUser();
    if (!storedUser) {
      router.replace("/");
      return;
    }
    setUser(storedUser);
    setAnswers(loadAnswers() as Answers);
    setReady(true);
  }, [router]);

  const question = QUESTIONS[step];
  const progress = ((step + 1) / QUESTIONS.length) * 100;
  const currentValue = answers[String(question?.id)];
  const canContinue = useMemo(
    () => (question ? isAnswerComplete(question, currentValue) : false),
    [question, currentValue]
  );

  function updateAnswer(value: AnswerValue) {
    if (!question) return;
    const next = { ...answers, [String(question.id)]: value };
    setAnswers(next);
    saveAnswers(next);
    setError("");
  }

  function toggleMulti(option: string, checked: boolean) {
    const existing = Array.isArray(currentValue) ? currentValue : [];
    const next = checked
      ? [...existing, option]
      : existing.filter((item) => item !== option);
    updateAnswer(next);
  }

  function updateRank(item: string, rank: number) {
    if (!question) return;
    const items = question.rankItems ?? [];
    const current =
      typeof currentValue === "object" &&
      currentValue !== null &&
      !Array.isArray(currentValue)
        ? { ...currentValue }
        : Object.fromEntries(items.map((name) => [name, 0]));

    // Clear any other item that already has this rank
    for (const key of Object.keys(current)) {
      if (key !== item && current[key] === rank) {
        current[key] = 0;
      }
    }
    current[item] = rank;
    updateAnswer(current);
  }

  async function submitAll() {
    if (!user) return;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          answers,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        recommendations?: Recommendations | null;
        recommendationsError?: string;
      };
      if (!response.ok) {
        throw new Error(data.error || "Submit failed.");
      }

      saveRecommendations({
        recommendations: data.recommendations ?? null,
        recommendationsError: data.recommendationsError,
      });
      clearQuizSession();
      router.push("/thanks");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  }

  function onNext() {
    if (!canContinue) return;
    if (step === QUESTIONS.length - 1) {
      void submitAll();
      return;
    }
    setStep((s) => s + 1);
  }

  if (!ready || !question) {
    return (
      <p className="text-muted-foreground text-center text-sm">Loading…</p>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      {submitting ? <SubmitOverlay /> : null}

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Question {step + 1} of {QUESTIONS.length}
          </span>
          <span className="font-medium">{user?.name}</span>
        </div>
        <Progress value={progress} />
      </div>

      <Card className={submitting ? "pointer-events-none opacity-60" : undefined}>
        <CardHeader>
          <CardTitle className="text-xl leading-snug">{question.prompt}</CardTitle>
          {question.helper ? (
            <CardDescription>{question.helper}</CardDescription>
          ) : null}
        </CardHeader>
        <CardContent className="space-y-3">
          {question.type === "single" && question.options ? (
            <RadioGroup
              value={typeof currentValue === "string" ? currentValue : ""}
              onValueChange={updateAnswer}
              className="gap-2"
            >
              {question.options.map((option) => (
                <Label
                  key={option}
                  htmlFor={`opt-${option}`}
                  className="hover:bg-accent/60 flex cursor-pointer items-start gap-3 rounded-lg border p-3 font-normal"
                >
                  <RadioGroupItem value={option} id={`opt-${option}`} className="mt-0.5" />
                  <span className="text-sm leading-relaxed">{option}</span>
                </Label>
              ))}
            </RadioGroup>
          ) : null}

          {question.type === "multi" && question.options ? (
            <div className="space-y-2">
              {question.options.map((option) => {
                const selected = Array.isArray(currentValue)
                  ? currentValue.includes(option)
                  : false;
                return (
                  <Label
                    key={option}
                    htmlFor={`chk-${option}`}
                    className="hover:bg-accent/60 flex cursor-pointer items-start gap-3 rounded-lg border p-3 font-normal"
                  >
                    <Checkbox
                      id={`chk-${option}`}
                      checked={selected}
                      onCheckedChange={(state) =>
                        toggleMulti(option, state === true)
                      }
                      className="mt-0.5"
                    />
                    <span className="text-sm leading-relaxed">{option}</span>
                  </Label>
                );
              })}
            </div>
          ) : null}

          {question.type === "text" ? (
            <Input
              value={typeof currentValue === "string" ? currentValue : ""}
              onChange={(e) => updateAnswer(e.target.value)}
              placeholder={question.placeholder}
            />
          ) : null}

          {question.type === "rank" && question.rankItems ? (
            <div className="space-y-3">
              {question.rankItems.map((item) => {
                const rankMap =
                  typeof currentValue === "object" &&
                  currentValue !== null &&
                  !Array.isArray(currentValue)
                    ? currentValue
                    : {};
                const selectedRank = rankMap[item] || "";
                return (
                  <div
                    key={item}
                    className="flex flex-col gap-2 rounded-lg border p-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="text-sm font-medium">{item}</span>
                    <select
                      className="border-input bg-background h-9 rounded-md border px-3 text-sm"
                      value={selectedRank}
                      onChange={(e) =>
                        updateRank(item, Number(e.target.value))
                      }
                    >
                      <option value="">Rank…</option>
                      {question.rankItems!.map((_, index) => (
                        <option key={index + 1} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
          ) : null}

          {error ? <p className="text-destructive text-sm">{error}</p> : null}
        </CardContent>
        <CardFooter className="flex justify-between gap-3">
          <Button
            type="button"
            variant="outline"
            disabled={step === 0 || submitting}
            onClick={() => setStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          <Button
            type="button"
            disabled={!canContinue || submitting}
            onClick={onNext}
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" />
                Saving…
              </>
            ) : step === QUESTIONS.length - 1 ? (
              "Submit"
            ) : (
              "Next"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
