import { Flame } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#0c0808]/80 border-b border-[#2a2020]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-2 bg-[#ff3d00]/10 rounded-lg group-hover:bg-[#ff3d00]/20 transition-colors">
            <Flame className="w-6 h-6 text-[#ff3d00]" />
          </div>
          <span className="font-black text-xl tracking-tight text-white group-hover:text-[#ff9100] transition-colors">
            Run of the Gingers
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">
            Live Odds
          </Link>
          <Link 
            href="/lock-it-in" 
            className="text-sm font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-[#ff9100] transition-colors"
          >
            Lock It In
          </Link>
        </nav>
      </div>
    </header>
  );
}
