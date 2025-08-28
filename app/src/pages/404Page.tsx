import { Link } from "react-router";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-user-background via-white to-user-muted flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <div className="relative">
          <div className="text-[120px] md:text-[180px] font-bold text-user-primary/20 leading-none select-none">
            404
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-user-foreground">
            Oops! Page Not Found
          </h1>
          <p className="text-lg text-user-muted-foreground max-w-md mx-auto">
            The page you're looking for seems to have been recycled or moved to
            a different location.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            className="bg-user-primary hover:bg-user-secondary min-w-[160px]"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="min-w-[160px] bg-transparent"
          >
            <Link to="/user/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
