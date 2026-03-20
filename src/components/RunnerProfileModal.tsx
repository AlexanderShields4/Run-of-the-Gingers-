"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Runner } from "@/lib/mockData";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface RunnerProfileModalProps {
  runner: Runner | null;
  onClose: () => void;
}

// Mock odds history data for the chart
const generateMockChartData = (runnerName: string) => {
  return Array.from({ length: 10 }).map((_, i) => ({
    time: `T-${10 - i}m`,
    impliedProb: Math.max(10, Math.min(90, 40 + Math.sin(i) * 20 + (runnerName.length * 2) - 15)),
  }));
};

export default function RunnerProfileModal({ runner, onClose }: RunnerProfileModalProps) {
  if (!runner) return null;

  const chartData = generateMockChartData(runner.name);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#110c0c] border border-[#ff3d00]/30 rounded-3xl w-full max-w-2xl overflow-hidden shadow-[0_0_40px_rgba(255,61,0,0.15)] relative flex flex-col max-h-[90vh]"
        >
          {/* Header/Cover */}
          <div className="h-32 bg-gradient-to-r from-[#ff3d00]/20 to-[#b87333]/20 relative">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-[#ff3d00] hover:text-white text-gray-400 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="absolute -bottom-12 left-6 w-24 h-24 rounded-full border-4 border-[#110c0c] overflow-hidden bg-black">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={runner.image_url} alt={runner.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="pt-16 pb-6 px-6 overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-3xl font-black text-white leading-none mb-1">{runner.name}</h2>
                <p className="text-[#ff9100] font-mono tracking-widest uppercase text-sm">"{runner.nickname}"</p>
              </div>
            </div>

            <p className="text-gray-300 mb-8 leading-relaxed border-l-2 border-[#ff3d00] pl-4 italic">
              {runner.bio}
            </p>

            {/* Stats */}
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-bold">Attributes</h3>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">Speed</span>
                  <span className="text-[#ff9100] font-mono">{runner.speed_stat}/100</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${runner.speed_stat}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#ff3d00] to-[#ff9100]"
                  />
                </div>
              </div>
              
              <div className="bg-black/40 p-4 rounded-xl border border-white/5">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400 text-sm">Stamina</span>
                  <span className="text-[#b87333] font-mono">{runner.stamina_stat}/100</span>
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${runner.stamina_stat}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-[#b87333] to-[#ff9100]"
                  />
                </div>
              </div>
            </div>

            {/* Odds Chart */}
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4 font-bold">Live Odds Shift Engine</h3>
            <div className="bg-black/40 p-4 rounded-xl border border-white/5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis 
                    dataKey="time" 
                    stroke="#4b5563" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#4b5563" 
                    fontSize={12}
                    tickFormatter={(val) => `${val}%`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#110c0c', borderColor: '#2a2020', borderRadius: '8px' }}
                    itemStyle={{ color: '#ff9100' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="impliedProb" 
                    stroke="#ff3d00" 
                    strokeWidth={3}
                    dot={{ fill: '#110c0c', stroke: '#ff9100', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: '#ff9100' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
