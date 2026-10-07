"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ShareButton } from "@/components/share-button";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  loadRecommendations,
  type StoredRecommendations,
} from "@/lib/session";

export default function ThanksPage() {
  const [stored, setStored] = useState<StoredRecommendations | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setStored(loadRecommendations());
    setReady(true);
  }, []);

  const recommendations = stored?.recommendations;
  const recommendationsError = stored?.recommendationsError;

  return (
    <div className="flex flex-1 flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Thank you</CardTitle>
          <CardDescription>
            Your answers have been saved. Here are personalized laptop picks
            based on what you told us.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground space-y-3 text-center text-sm">
          <p>
            Prices change often - treat these as a starting point and double-check
            current deals before buying.
          </p>
          <p>
            Know someone picking a laptop? Share this questionnaire with them.
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap justify-center gap-3">
          <ShareButton />
          <Button asChild variant="outline">
            <Link href="/">Start over</Link>
          </Button>
        </CardFooter>
      </Card>

      {!ready ? (
        <p className="text-muted-foreground text-center text-sm">Loading…</p>
      ) : null}

      {ready && recommendationsError && !recommendations ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recommendations unavailable</CardTitle>
            <CardDescription>{recommendationsError}</CardDescription>
          </CardHeader>
        </Card>
      ) : null}

      {ready && recommendations ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">
              Your recommendations
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {recommendations.summary}
            </p>
          </div>

          <div className="space-y-4">
            {recommendations.picks.map((pick) => (
              <Card key={`${pick.rank}-${pick.name}`}>
                <CardHeader className="gap-2">
                  <div className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                    Pick #{pick.rank}
                  </div>
                  <CardTitle className="text-lg leading-snug">{pick.name}</CardTitle>
                  {pick.approxPriceInr ? (
                    <CardDescription className="text-foreground text-base font-medium">
                      {pick.approxPriceInr}
                    </CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed">
                  <div>
                    <p className="mb-1 font-medium">Why this fits</p>
                    <p className="text-muted-foreground">{pick.why}</p>
                  </div>
                  {pick.tradeoffs ? (
                    <div>
                      <p className="mb-1 font-medium">Tradeoffs</p>
                      <p className="text-muted-foreground">{pick.tradeoffs}</p>
                    </div>
                  ) : null}
                  {pick.buyTip ? (
                    <div>
                      <p className="mb-1 font-medium">Buy tip</p>
                      <p className="text-muted-foreground">{pick.buyTip}</p>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : null}

      {ready && !recommendations && !recommendationsError ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">No recommendations to show</CardTitle>
            <CardDescription>
              Your answers were saved. Start over if you want to generate picks
              again.
            </CardDescription>
          </CardHeader>
        </Card>
      ) : null}
    </div>
  );
}
