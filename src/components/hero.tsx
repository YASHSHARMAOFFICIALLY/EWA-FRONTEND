// Four-point sparkle used as the bullet inside both CTAs.
function Sparkle({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0c.7 6.2 5.1 10.6 11.3 11.3v1.4C17.1 13.4 12.7 17.8 12 24c-.7-6.2-5.1-10.6-11.3-11.3v-1.4C6.9 10.6 11.3 6.2 12 0Z"
      />
    </svg>
  );
}

// Primary CTA appears twice (above and below the film), so it lives in one place.
function MemberCta() {
  return (
    <a
      href="#start"
      className="inline-flex h-14 items-center gap-3 rounded-full bg-primary px-9 text-[13px] font-semibold uppercase tracking-[0.14em] text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Sparkle />
      Become a member
    </a>
  );
}

// Pure white ground, continuous with the navbar above — the page opens on paper
// and colour is spent only on the kicker, the accent word and the primary CTA.
// Colours are literal, not tokens: the hero stays white in dark mode, so the
// type has to stay dark to keep contrast (zinc-900 on white = 17.9:1).
export function Hero() {
  return (
    <section id="home" className="bg-white text-zinc-900">
      <div className="mx-auto max-w-4xl px-5 pb-24 pt-4 text-center sm:pb-28">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-[13px]">
          Beyond mindset. Beyond manifestation.
        </p>

        {/* Regular weight, not medium: this serif's display sizes carry their
            authority through stroke contrast, and bumping the weight flattens
            that contrast into something generic. leading is 0.95 because the
            letterforms already hold plenty of vertical air. */}
        {/* No max-width: the two lines are hand-broken with <br>, so any cap
            narrower than the longest line ("Become The Creator") re-wraps it.
            tracking is negative because Inter's default spacing looks loose
            once it passes ~48px. */}
        <h1 className="mt-6 text-[2.75rem] font-bold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-[4.5rem]">
          Become The Creator
          <br />
          Of Your <span className="text-primary">Reality.</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-zinc-600">
          Transform your subconscious, nervous system, and identity through
          meditation, hypnosis, and ancient yogic practices.
        </p>

        <p className="mt-10 text-[13px] font-semibold uppercase tracking-[0.18em] text-primary">
          The path to remembering who you are
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <MemberCta />
          {/* Secondary CTA is gold, not grey — grey would read as "disabled"
              next to a saturated purple pill. #8a6d3f on white is 5.4:1. */}
          <a
            href="#path"
            className="inline-flex h-14 items-center gap-3 rounded-full border border-[#e0d3bb] px-9 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#8a6d3f] transition-colors hover:bg-[#faf6ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a6d3f]"
          >
            <Sparkle className="size-3.5" />
            Explore the path
          </a>
        </div>

        {/* ponytail: poster frame + play affordance, no player. Swap the button
            for <video controls poster src> once the film is in /public. */}
        <div className="mt-11 overflow-hidden rounded-xl bg-zinc-100 shadow-[0_30px_70px_-30px_rgba(24,24,27,0.45)]">
          <button
            type="button"
            aria-label="Play introduction film"
            className="group relative flex aspect-video w-full items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300" />
            <span className="relative flex size-20 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="ml-1 size-7 text-primary" aria-hidden="true">
                <path fill="currentColor" d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
          </button>
        </div>

        {/* text-balance evens the line lengths so the centred rag doesn't leave
            a stub word on the last line. */}
        <p className="mx-auto mt-10 max-w-2xl text-balance text-[19px] leading-relaxed text-zinc-600">
          You were not born to live a life on autopilot. You are the operant power
          behind your reality. EWA is a transformational platform that guides you to{" "}
          <strong className="font-semibold text-zinc-900">
            reprogram your subconscious, regulate your nervous system,
          </strong>{" "}
          and{" "}
          <strong className="font-semibold text-zinc-900">embody a new identity</strong>{" "}
          — so you can manifest from the depth of who you truly are.
        </p>

        <div className="mt-9 flex justify-center">
          <MemberCta />
        </div>
      </div>
    </section>
  );
}
