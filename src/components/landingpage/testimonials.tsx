import { CircularTestimonials, type Testimonial } from "@/components/ui/circular-testimonials";

// TODO: placeholder copy — swap for real member testimonials before launch.
// Photos are Unsplash stock; real member portraits should replace them too.
const testimonials: Testimonial[] = [
  {
    quote:
      "Eleven minutes of yoga nidra before bed, that was the whole change. I'd tried every sleep app going. Ana doesn't ask you to relax — she just walks you down until you're already there.",
    name: "Tamar Mendelson",
    designation: "Nervous System Reset · 8 months in",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "I came for the breathwork and stayed for Ana's hypnosis sessions. Six weeks in I caught myself not spiralling before a pitch — no talking myself down, no script. The reaction just wasn't there anymore.",
    name: "Joe Charlescraft",
    designation: "Subconscious Reprogramming · 2 years in",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "Every other platform gave me a library and wished me luck. Ana gives you the next twenty minutes. I've kept a 200-day streak without once deciding to — the practice just tells me where it left off.",
    name: "Martina Edelweist",
    designation: "Daily Practice · 200-day streak",
    src: "https://images.unsplash.com/photo-1524267213992-b76e8577d046?q=80&w=1368&auto=format&fit=crop",
  },
];

// Same white ground as the hero and pricing, so the page stays one sheet of
// paper. Colour is spent on the kicker and the arrow buttons only.
export function Testimonials() {
  return (
    <section id="testimonials" className="bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-[13px]">
            Members
          </p>
          <h2 className="mt-6 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            The work speaks for itself.
          </h2>
        </div>

        <div className="mt-12 flex justify-center">
          <CircularTestimonials
            testimonials={testimonials}
            autoplay
            // Section keeps the hero's literal white ground, so the type stays
            // literal too; only the arrows take brand tokens.
            colors={{
              name: "#131019",
              designation: "#71717a",
              testimony: "#3f3f46",
              arrowBackground: "var(--primary)",
              arrowForeground: "var(--primary-foreground)",
              arrowHoverBackground: "#131019",
            }}
            fontSizes={{ name: "28px", designation: "16px", quote: "19px" }}
          />
        </div>
      </div>
    </section>
  );
}
