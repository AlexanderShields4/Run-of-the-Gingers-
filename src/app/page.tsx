import { getInitialPageData } from "./actions";
import HomeDashboard from "./HomeDashboard";

export default async function Page() {
  const { voteCounts, isLoggedIn, hasVoted } = await getInitialPageData();
  return <HomeDashboard initialVoteCounts={voteCounts} isLoggedIn={isLoggedIn} hasVoted={hasVoted} />;
}
