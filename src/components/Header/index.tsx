import { Link } from "react-router-dom";
import { Video, CircleUser } from "lucide-react";
import { Button } from "@/components/ui";

function Header() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Video className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">LiveApp</span>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Start Live Button */}
          <Link to={"/livestream"}>
            <Button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Video className="h-4 w-4" />
              Start Live
            </Button>
          </Link>

          {/* Login Button */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
          >
            <CircleUser className="h-4 w-4" />
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
