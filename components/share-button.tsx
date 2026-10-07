"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const SHARE_TITLE = "Laptop Needs Questionnaire";
const SHARE_TEXT =
  "Answer a short questionnaire about how you use a laptop. Your answers help get a personalized laptop recommendation (budget, work style, battery, and more).";

export function ShareButton({
  variant = "outline",
  className,
}: {
  variant?: "outline" | "secondary" | "ghost";
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function onShare() {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const fullText = `${SHARE_TEXT}\n\n${url}`;

    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: SHARE_TITLE,
          text: SHARE_TEXT,
          url,
        });
        return;
      }

      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      // User cancelled the native share sheet - ignore
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(fullText);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      } catch {
        // Ignore if clipboard is also unavailable
      }
    }
  }

  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => void onShare()}
    >
      {copied ? <Check /> : <Share2 />}
      {copied ? "Link copied" : "Share this"}
    </Button>
  );
}
