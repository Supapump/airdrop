import AirdropWidget from "@/components/AirdropWidget";
import { HeroAnimation } from "@/components/hero-animation"

export default function Home() {
  return (
    <div className="relative min-h-screen font-[family-name:var(--font-geist-sans)]">
      {/* Background animation */}
      <HeroAnimation />

      {/* Content container */}
      <div className="relative z-10 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="text-4xl font-bold">SUPA Airdrop</h1>
          <AirdropWidget />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-green-500">
          <p>
            Powered by <a href="https://supapump.fun">Supa Pump</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
