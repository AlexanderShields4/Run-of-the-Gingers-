export default function LockItInPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff3d00] to-[#ff9100] mb-4">
          Lock It In
        </h1>
        <p className="text-xl text-gray-400">The rules of engagement for the Run of the Gingers.</p>
      </div>

      <div className="space-y-8">
        <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-9xl font-black">01</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4 relative z-10">What is this?</h2>
          <p className="text-gray-300 leading-relaxed relative z-10">
            This app is a purely statistical tracker powered by crowd wisdom. There is absolutely NO real money, gambling, or cryptocurrency natively supported on this application. It acts as a live dashboard representing the community's current belief regarding who will win the footrace.
          </p>
        </section>

        <section className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-9xl font-black">02</span>
          </div>
          <h2 className="text-2xl font-bold text-[#ff9100] mb-4 relative z-10">How are odds calculated?</h2>
          <p className="text-gray-300 leading-relaxed relative z-10">
            When you cast a prediction on the live dashboard, you influence the implied probability based on total votes. We convert this into American Betting Odds (+150, -120) and add a traditional 10% "house edge" simulation to make the numbers feel authentic.
          </p>
        </section>

      </div>
    </div>
  );
}
