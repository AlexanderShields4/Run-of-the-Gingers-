/**
 * Calculate implied probability of a runner winning based on prediction distribution.
 * 
 * @param runnerVotes The number of votes this runner received.
 * @param totalVotes The total number of votes cast across all runners.
 * @returns A decimal representing the raw implied probability (0.0 to 1.0)
 */
export function calculateImpliedProbability(runnerVotes: number, totalVotes: number): number {
  if (totalVotes === 0) return 0;
  return runnerVotes / totalVotes;
}

/**
 * Convert implied probability to American odds format (+XXX or -XXX).
 * Adds a configurable house edge.
 * 
 * @param impliedProbability The decimal probability (0.0 to 1.0)
 * @param houseEdge The house edge to apply (default 10% -> 0.10) to adjust the lines in favor of the "house"
 * @returns The formatted American odds string, e.g., "+150" or "-120".
 */
export function impliedToAmerican(impliedProbability: number, houseEdge: number = 0.10): string {
  if (impliedProbability <= 0) return "+0"; // Edge case
  if (impliedProbability >= 1) return "-10000"; // Prevent infinity

  // To simulate a sportsbook's juice/vigorish, we artificialy inflate the implied probability.
  // In a real scenario, the total implied probability of all runners combined equals 100% + house edge.
  // We'll simply inflate this single runner's probability slightly to worsen the payout.
  let inflatedProb = impliedProbability * (1 + houseEdge);
  
  // Cap at 0.99 so we don't calculate log odds for 100%+ which mathematically breaks American odds formulas.
  if (inflatedProb >= 0.99) inflatedProb = 0.99;

  let odds: number;

  if (inflatedProb >= 0.5) {
    // Favorite: - odds (how much you need to bet to win $100)
    // Formula: (Prob / (1 - Prob)) * -100
    odds = Math.round((inflatedProb / (1 - inflatedProb)) * -100);
  } else {
    // Underdog: + odds (how much you win on a $100 bet)
    // Formula: ((1 - Prob) / Prob) * 100
    odds = Math.round(((1 - inflatedProb) / inflatedProb) * 100);
  }

  return odds > 0 ? `+${odds}` : `${odds}`;
}
