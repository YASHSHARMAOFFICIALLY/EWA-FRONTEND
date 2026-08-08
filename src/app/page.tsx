import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoCard } from "@/components/landingpage/Bentocard";
import { Testimonials } from "@/components/landingpage/testimonials";
import { Pricing } from "@/components/landingpage/pricing";
import { Faq } from "@/components/landingpage/faq";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BentoCard />
      <Testimonials />
      <Pricing />
      <Faq />
    </>
  );
}
