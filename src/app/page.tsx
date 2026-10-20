import Hero from "@/components/home/Hero";
import StatsBand from "@/components/home/StatsBand";
import TrustBand from "@/components/home/TrustBand";
import HonestComparison from "@/components/home/HonestComparison";
import SavingsExplorer from "@/components/home/SavingsExplorer";
import HowItWorks from "@/components/home/HowItWorks";
import Industries from "@/components/home/Industries";
import StateMap from "@/components/home/StateMap";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";

/**
 * The homepage runs short on purpose. Everything here either asks for the
 * lead or earns the right to ask: the survey, the carrier band, the honest
 * comparison, the savings explorer, the process, the audiences, the map and
 * the scenarios. Why Us, the advisor band, Who We Help and the FAQ moved off
 * the front page — the FAQ (and its schema) now lives on /find-my-plans, where the
 * person reading it is already deciding.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <StatsBand />
      <TrustBand />
      <HonestComparison />
      <SavingsExplorer />
      <HowItWorks />
      <Industries />
      <StateMap />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
