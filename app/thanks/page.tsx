import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ThanksPage() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Thank you</CardTitle>
          <CardDescription>
            Your answers have been saved. We will use them to recommend a laptop
            that fits your needs.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-muted-foreground text-center text-sm">
          You can close this page. If you need to update anything, start again
          with the same or a different email.
        </CardContent>
        <CardFooter className="justify-center">
          <Button asChild variant="outline">
            <Link href="/">Back to start</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
