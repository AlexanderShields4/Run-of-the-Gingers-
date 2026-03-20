"use client";

import { useState } from "react";
import { Runner } from "@/lib/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface PredictionFormProps {
  runners: Runner[];
  onSubmitVote: (runnerId: string) => void;
}

export default function PredictionForm({ runners, onSubmitVote }: PredictionFormProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleSubmit = () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    
    // Simulate network delay
    setTimeout(() => {
      onSubmitVote(selectedId);
      setIsSubmitting(false);
      setHasVoted(true);
    }, 600);
  };

  if (hasVoted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#151111] border border-[#ff9100]/50 rounded-2xl p-6 text-center"
      >
        <h3 className="text-2xl font-bold text-[#ff9100] mb-2">Vote Locked In!</h3>
        <p className="text-gray-400">Your prediction has altered the timeline. Watch the odds shift.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-[#151111] border border-[#2a2020] rounded-2xl p-6 shadow-2xl relative overflow-hidden">
      {/* Decorative gradient blob */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#ff3d00]/20 rounded-full blur-[50px] pointer-events-none" />

      <h3 className="text-xl font-bold mb-4 text-white">Cast Your Prediction</h3>
      <p className="text-sm text-gray-400 mb-6">Who will conquer the Run of the Gingers? Your vote instantly affects the live odds.</p>

      <div className="flex flex-col gap-3 mb-6">
        {runners.map(runner => (
          <label 
            key={runner.id} 
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
              selectedId === runner.id 
                ? 'border-[#ff9100] bg-[#ff9100]/10' 
                : 'border-[#2a2020] hover:border-gray-600 bg-black/40'
            }`}
          >
            <div className="relative flex items-center justify-center w-5 h-5 rounded-full border border-gray-500 shrink-0 overflow-hidden">
              <AnimatePresence>
                {selectedId === runner.id && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    exit={{ scale: 0 }}
                    className="w-3 h-3 bg-[#ff9100] rounded-full"
                  />
                )}
              </AnimatePresence>
            </div>
            <input 
              type="radio" 
              name="runner-vote" 
              value={runner.id}
              className="hidden"
              onChange={() => setSelectedId(runner.id)}
            />
            <div className="flex-1 flex justify-between items-center">
              <span className="font-semibold">{runner.name}</span>
              <span className="text-xs text-gray-500">{runner.nickname}</span>
            </div>
          </label>
        ))}
      </div>

      <button
        disabled={!selectedId || isSubmitting}
        onClick={handleSubmit}
        className="w-full py-4 rounded-xl font-bold text-lg uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-[#ff3d00] to-[#ff9100] text-white hover:shadow-[0_0_20px_rgba(255,145,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
      >
        {isSubmitting ? (
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-6 h-6 border-2 border-white border-t-transparent rounded-full mx-auto"
          />
        ) : (
          "Lock It In"
        )}
      </button>
    </div>
  );
}
