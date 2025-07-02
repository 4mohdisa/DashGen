import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="relative mx-auto flex w-full shrink-0 items-center justify-between py-6 px-4">
      <div></div>
      <Link href="/">
        <div className="font-black text-2xl tracking-tight text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          DashGen
        </div>
      </Link>
      <ThemeToggle />
    </header>
  );
}
