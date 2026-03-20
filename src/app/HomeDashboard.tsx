"use client";

import { useState, useMemo } from "react";
import { runners as initialRunners, Runner } from "@/lib/mockData";
import { calculateImpliedProbability } from "@/lib/odds";
import RunnerCard from "@/components/RunnerCard";
import RunnerProfileModal from "@/components/RunnerProfileModal";
import PredictionForm from "@/components/PredictionForm";
import { submitVote } from "./actions";
import { motion } from "framer-motion";

interface HomeDashboardProps {
  initialVoteCounts: Record<string, number>
  isLoggedIn: boolean
  hasVoted: boolean
}

export default function HomeDashboard({ initialVoteCounts, isLoggedIn, hasVoted }: HomeDashboardProps) {
  const [predictions, setPredictions] = useState<Record<string, number>>(initialVoteCounts);
  const [selectedRunner, setSelectedRunner] = useState<Runner | null>(null);

  const totalVotes = useMemo(() => {
    return Object.values(predictions).reduce((acc, curr) => acc + curr, 0);
  }, [predictions]);

  const getProb = useMemo(() => (runnerId: string) => {
    if (totalVotes === 0) return 1 / initialRunners.length;
    return calculateImpliedProbability(predictions[runnerId] ?? 0, totalVotes);
  }, [predictions, totalVotes]);

  const sortedRunners = useMemo(() => {
    return [...initialRunners].sort((a, b) => getProb(b.id) - getProb(a.id));
  }, [getProb]);

  const handleVote = async (runnerId: string) => {
    const updatedCounts = await submitVote(runnerId);
    setPredictions(updatedCounts);
  };

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Left Column: Leaderboard / Odds Dashboard */}
      <div className="flex-1">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff3d00] to-[#ff9100] mb-2 tracking-tight">
            Live Odds Pipeline
          </h1>
          <p className="text-gray-400">
            Real-time sentiment tracker for the Run of the Gingers. Total volume: <span className="text-white font-mono">{totalVotes}</span>
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {sortedRunners.map((runner, index) => {
            const impliedProb = getProb(runner.id);
            return (
              <RunnerCard
                key={runner.id}
                runner={runner}
                impliedProb={impliedProb}
                onSelect={(r) => setSelectedRunner(r)}
                index={index}
              />
            );
          })}
        </div>
      </div>

      {/* Right Column: Prediction Form Widget */}
      <div className="lg:w-96 shrink-0 relative">
        <div className="sticky top-24">
          <PredictionForm
            runners={initialRunners}
            onSubmitVote={handleVote}
            isLoggedIn={isLoggedIn}
            alreadyVoted={hasVoted}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 p-4 rounded-xl bg-[var(--card)] border border-[var(--border)] text-sm text-gray-500"
          >
            <p><strong>Note on Odds:</strong> The displayed odds include a simulated 10% algorithmic "house edge" typical of sportsbooks. Implied probabilities sum to &gt;100%.</p>
          </motion.div>
        </div>
      </div>

      <RunnerProfileModal
        runner={selectedRunner}
        onClose={() => setSelectedRunner(null)}
      />
    </div>
  );
}
