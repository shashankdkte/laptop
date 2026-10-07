"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const MESSAGES = [
  "Saving your answers…",
  "Writing to Google Sheets…",
  "Almost done, please wait…",
  "Still working, this can take a moment…",
];

export function SubmitOverlay() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % MESSAGES.length);
    }, 2800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/75 px-4 backdrop-blur-sm"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="bg-card w-full max-w-sm rounded-xl border px-6 py-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex size-14 items-center justify-center rounded-full bg-primary/10">
          <Loader2 className="text-primary size-7 animate-spin" />
        </div>

        <p
          key={messageIndex}
          className="animate-submit-fade text-base font-medium"
        >
          {MESSAGES[messageIndex]}
        </p>
        <p className="text-muted-foreground mt-2 text-sm">
          Please keep this page open.
        </p>

        <div className="bg-primary/15 mt-6 h-1.5 overflow-hidden rounded-full">
          <div className="animate-submit-bar bg-primary h-full w-1/3 rounded-full" />
        </div>
      </div>
    </div>
  );
}
