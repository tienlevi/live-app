import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Card className="relative overflow-hidden border-primary/20 bg-gradient-to-br from-primary/10 to-transparent">
          <div className="absolute right-0 top-0 -z-10 size-64 rounded-full bg-primary/10 blur-3xl" />
          <CardHeader className="pb-4 text-center">
            <CardTitle className="text-2xl sm:text-3xl">
              Ready to Start Your Journey?
            </CardTitle>
            <CardDescription className="text-base">
              Join our community of creators and start streaming today. No
              credit card required.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-8">
            <Button size="lg" asChild>
              <Link to="/join-room">Get Started for Free</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default CTA;
