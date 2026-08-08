import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { BentoCard } from "@/components/landingpage/Bentocard";
import { Testimonials } from "@/components/landingpage/testimonials";
import { Pricing } from "@/components/landingpage/pricing";
import { Faq } from "@/components/landingpage/faq";
import { Founder } from "@/components/landingpage/founder";
import { Footer } from "@/components/landingpage/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <BentoCard />
      <Testimonials />
      <Pricing />
      <Faq />
      <Founder />
      <Footer />
    </>
  );
}
