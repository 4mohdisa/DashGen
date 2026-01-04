"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { ArrowRight } from "lucide-react";

export default function Header() {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";
  const isCreatePage = pathname === "/create";
  const isChatPage = pathname.startsWith("/chats/");

  return (
    <header className="relative mx-auto flex w-full shrink-0 items-center justify-between py-4 px-4 md:py-6">
      <div className="flex items-center gap-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="font-black text-2xl tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DashGen
          </div>
        </Link>
        
        {/* Navigation Links - Only show on landing page */}
        {isLandingPage && (
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="#use-cases" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Use Cases
            </Link>
            <Link 
              href="https://github.com/4mohdisa/dashgen" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        
        {/* Show "Start Creating" button on landing page, or "New Dashboard" on chat pages */}
        {isLandingPage && (
          <Link
            href="/create"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 hover:shadow-lg"
          >
            Start Creating
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
        
        {isChatPage && (
          <Link
            href="/create"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border/50 bg-card/50 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-foreground hover:bg-card transition-colors"
          >
            New Dashboard
          </Link>
        )}
      </div>
    </header>
  );
}
