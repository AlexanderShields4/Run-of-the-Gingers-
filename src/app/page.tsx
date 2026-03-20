import { getVoteCounts } from "./actions";
import HomeDashboard from "./HomeDashboard";

export default async function Page() {
  const initialVoteCounts = await getVoteCounts();
  return <HomeDashboard initialVoteCounts={initialVoteCounts} />;
}
