"use client";

import { motion } from "framer-motion";
import { Runner } from "@/lib/mockData";
import { impliedToAmerican } from "@/lib/odds";

interface RunnerCardProps {
  runner: Runner;
  impliedProb: number;
  onSelect: (runner: Runner) => void;
  index: number;
}

export default function RunnerCard({ runner, impliedProb, onSelect, index }: RunnerCardProps) {
  const oddsString = impliedToAmerican(impliedProb);
  const probPercent = (impliedProb * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={() => onSelect(runner)}
      className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:border-[#ff3d00] hover:shadow-[0_0_15px_rgba(255,61,0,0.3)] transition-all duration-300 group"
    >
      <div className="relative w-20 h-20 shrink-0 rounded-full overflow-hidden border-2 border-[var(--border)] group-hover:border-[#ff9100] transition-colors">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={runner.image_url} alt={runner.name} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-xl font-bold flex items-center gap-2 truncate">
          {runner.name}
        </h3>
        <p className="text-sm text-gray-400 italic mb-2">"{runner.nickname}"</p>
        
        <div className="flex gap-4 text-sm">
          <div className="flex flex-col">
            <span className="text-gray-500 uppercase text-xs tracking-wider">Speed</span>
            <span className="font-mono text-[#ff9100] font-bold">{runner.speed_stat}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 uppercase text-xs tracking-wider">Stamina</span>
            <span className="font-mono text-[#b87333] font-bold">{runner.stamina_stat}</span>
          </div>
        </div>
      </div>

      <div className="shrink-0 flex flex-col items-end justify-center bg-black/40 rounded-xl p-3 border border-black group-hover:bg-[#ff3d00]/10 transition-colors">
        <span className="text-xs text-gray-400 uppercase tracking-widest mb-1">Odds</span>
        <span className="text-2xl font-black text-[#ff3d00] group-hover:text-[#ff9100] drop-shadow-[0_0_8px_rgba(255,61,0,0.5)]">
          {oddsString}
        </span>
        <span className="text-[10px] text-gray-500 mt-1">{probPercent}% implied</span>
      </div>
    </motion.div>
  );
}
