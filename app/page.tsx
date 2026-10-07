"use client";

import { type FormEvent, useState } from "react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShareButton } from "@/components/share-button";
import { saveUser } from "@/lib/session";

export default function HomePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    saveUser({ name: trimmedName, email: trimmedEmail });
    router.push("/quiz");
  }

  return (
    <div className="flex flex-1 flex-col justify-center gap-8">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium tracking-wide text-primary uppercase">
          Laptop Needs
        </p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Questionnaire
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          About 40 simple questions. Enter your email so we can save your answers
          and get back to you with recommendations.
        </p>
        <div className="pt-2">
          <ShareButton />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Start here</CardTitle>
          <CardDescription>
            No password needed - just your name and email.
          </CardDescription>
        </CardHeader>
        <form onSubmit={onSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@example.com"
              />
            </div>
            {error ? <p className="text-destructive text-sm">{error}</p> : null}
          </CardContent>
          <CardFooter className="pt-6">
            <Button type="submit" className="w-full">
              Continue to questions
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
