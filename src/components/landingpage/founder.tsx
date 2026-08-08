import Image from "next/image";

// Closes the page after the FAQ: once the objections are answered, the last
// thing left to trust is the person teaching. Portrait sits right and she is
// lit looking left, back into the copy, so the gaze leads the eye to the words
// rather than off the edge of the page.
export function Founder() {
  return (
    <section id="teacher" className="bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
          {/* Portrait is ordered first on mobile: a face pulls people into a
              block of text far better than a kicker does. */}
          <div className="order-1 mx-auto w-full max-w-[300px] sm:max-w-[420px] lg:order-2">
            <div className="overflow-hidden rounded-[32px] shadow-[0_40px_80px_-40px_rgba(119,58,193,0.5)]">
              <Image
                src="/ananhaa.webp"
                alt="Anahaa, founder and teacher at EWA"
                width={400}
                height={400}
                sizes="(max-width: 1024px) 90vw, 420px"
                className="h-full w-full object-cover"
                priority={false}
              />
            </div>
          </div>

          <div className="order-2 lg:order-1">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-[13px]">
              Your teacher
            </p>

            {/* Her line runs as the heading, not as a pull-quote inside the
                body. It is the whole argument of the platform in one sentence,
                so nothing should outrank it on this screen. */}
            <h2 className="mt-6 text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] sm:text-[2.25rem]">
              &ldquo;Everything changed when I learned I could change my
              identity before I changed my reality.&rdquo;
            </h2>

            <div className="mt-7 space-y-4 text-[17px] leading-relaxed text-zinc-600">
              <p>
                I&apos;m Anahaa. For a long time I did it the other way round,
                fixing the circumstances first and waiting to feel different.
                It never held.
              </p>
              <p>
                Nine years of practice and a lot of living taught me the order
                it actually works in. Change who you are being, and the reality
                catches up on its own.
              </p>
              <p>
                Since then I have taught this to people across the world, most
                of whom arrived tired and fairly sceptical. Every session in
                here is one I still use myself.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <span className="font-mono text-sm tabular-nums text-zinc-900">
                9+ years
              </span>
              <span className="h-4 w-px bg-zinc-200" aria-hidden="true" />
              <span className="text-sm text-zinc-500">
                Teaching and lived experience
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Founder;
