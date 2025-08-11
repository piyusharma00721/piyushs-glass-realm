import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const SiteHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="glass glass-hover rounded-lg px-3 py-2">
          <span className="font-display text-lg tracking-widest">Piyush’s Relm</span>
        </Link>
        <div className="flex items-center gap-3">
          <a
            href="mailto:hello@piyush.dev"
            className="nav-link text-sm opacity-90 hover:opacity-100"
            aria-label="Email Piyush"
          >
            <span className="inline-flex items-center gap-2"><Mail className="opacity-80" /> Email</span>
          </a>
          <a href="#" aria-label="Download CV">
            <Button variant="glass" size="sm" className="rounded-full">
              Download CV
            </Button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
