import { CircularTestimonials, type Testimonial } from "@/components/ui/circular-testimonials";

// TODO: placeholder copy — swap for real member testimonials before launch.
// Photos are Unsplash stock; real member portraits should replace them too.
const testimonials: Testimonial[] = [
  {
    quote:
      "I'd done years of mindset work and still woke up in the same loop. The nervous system practices were the missing piece — six weeks in, I stopped bracing for a day that hadn't happened yet.",
    name: "Tamar Mendelson",
    designation: "Member since 2024",
    src: "https://images.unsplash.com/photo-1512316609839-ce289d3eba0a?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "The hypnosis sessions did in a month what talk therapy hadn't touched in two years. I don't have to talk myself into the new identity anymore. It's just how I move now.",
    name: "Joe Charlescraft",
    designation: "Member since 2023",
    src: "https://images.unsplash.com/photo-1628749528992-f5702133b686?q=80&w=1368&auto=format&fit=crop",
  },
  {
    quote:
      "What sold me is that nothing here asks you to pretend. You do the practice, the body catches up, and one morning you notice you've become someone who doesn't need convincing.",
    name: "Martina Edelweist",
    designation: "Member since 2024",
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
            colors={{
              name: "#131019",
              designation: "#71717a",
              testimony: "#3f3f46",
              arrowBackground: "#773AC1",
              arrowForeground: "#ffffff",
              arrowHoverBackground: "#131019",
            }}
            fontSizes={{ name: "28px", designation: "16px", quote: "19px" }}
          />
        </div>
      </div>
    </section>
  );
}
