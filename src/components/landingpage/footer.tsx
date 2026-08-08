import { Link } from "next-view-transitions";

// The page is one continuous sheet of white paper from the navbar down, so the
// footer is the single dark plate that ends it. Literal colours, not tokens,
// for the same reason the hero uses literal white: this block stays dark in
// both themes, so its type has to stay light to keep contrast.
// #07040F is the brand dark base from brand.md.

const sections = [
  {
    title: "Platform",
    links: [
      { href: "#platform", label: "How it works" },
      { href: "#pricing", label: "Membership" },
      { href: "#testimonials", label: "Member stories" },
      { href: "#teacher", label: "About Anahaa" },
      { href: "#faq", label: "Questions" },
    ],
  },
  {
    title: "Practice",
    links: [
      { href: "#start", label: "Start the foundation" },
      { href: "#pricing", label: "The full library" },
      { href: "#platform", label: "Private Discord" },
      { href: "#support", label: "Contact support" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/refunds", label: "Refunds" },
    ],
  },
];

// ponytail: three inline paths, not a social-icon dependency for three marks.
function XMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[17px]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z"
      />
    </svg>
  );
}

function InstagramMark() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-[18px]"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-[18px]" aria-hidden="true">
      <path
        fill="currentColor"
        d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1.2 12c0 1.6.1 3.2.3 4.8a2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2c.2-1.6.3-3.2.3-4.8 0-1.6-.1-3.2-.3-4.8ZM9.8 15.3V8.7l5.7 3.3-5.7 3.3Z"
      />
    </svg>
  );
}

// No Discord icon here on purpose: the server has no public invite. Members are
// added by the bot after they link their account, so a link would only lead
// non-members to a door that won't open.
const socials = [
  { href: "https://x.com/ElevateWithAna", label: "X", Mark: XMark },
  {
    href: "https://www.instagram.com/channel/AbYAgyluzcq_t1Ly/",
    label: "Instagram",
    Mark: InstagramMark,
  },
  {
    href: "https://www.youtube.com/@ElevateWithAna",
    label: "YouTube",
    Mark: YoutubeMark,
  },
];

const linkClass =
  "text-[15px] text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD74FF] rounded-sm";

export function Footer() {
  // Rendered on the server, so this is the year the page was built or
  // requested. Fine for a copyright line; nothing here needs a live clock.
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#07040F] text-zinc-300">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {/* The page ends on Anahaa's bio, which has no action attached. One
            closing line and one button, nothing more. */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-12 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-md text-[1.75rem] font-bold leading-[1.2] tracking-[-0.03em] text-white sm:text-[2rem]">
            The next twenty minutes are already waiting.
          </h2>
          <a
            href="#start"
            className="inline-flex h-14 shrink-0 items-center justify-center rounded-full bg-[#AD74FF] px-9 text-[13px] font-semibold uppercase tracking-[0.14em] text-[#100A1B] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD74FF]"
          >
            Become a member
          </a>
        </div>

        <div className="grid gap-12 py-12 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div>
            {/* Same lockup as the navbar, inverted: mark in the dark-mode
                primary, tagline muted against the dark ground. */}
            <Link
              href="/"
              className="inline-flex flex-col gap-0.5 rounded-md text-[#AD74FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD74FF]"
            >
              <span className="flex items-start text-[28px] font-bold leading-none tracking-tight">
                EWA
                <svg
                  viewBox="0 0 24 24"
                  className="-ml-0.5 -mt-1.5 size-4 shrink-0"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M2 3c7.5 1.5 12 6 13.5 13C17.5 9.5 20.5 5 24 2.5c-2 6-5.5 12.5-10 17.5C11 13 7 6.5 2 3Z"
                  />
                </svg>
              </span>
              <span className="text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-zinc-500">
                Elevate with Anahaa
              </span>
              <span className="sr-only">, home</span>
            </Link>

            <p className="mt-6 max-w-xs text-[15px] leading-[1.7] text-zinc-400">
              Meditation, breathwork and hypnosis taught in the order they
              actually build on each other.
            </p>

            <ul className="mt-7 flex items-center gap-3">
              {socials.map(({ href, label, Mark }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition-colors hover:border-white/25 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#AD74FF]"
                  >
                    <Mark />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {sections.map((section) => (
            <nav key={section.title} aria-label={section.title}>
              <h3 className="text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                {section.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className={linkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[13px] tabular-nums text-zinc-500">
            © {year} EWA
          </p>
          {/* A hypnosis and breathwork product needs this line somewhere, and
              the footer is where people look for it. */}
          <p className="max-w-xl text-[13px] leading-[1.7] text-zinc-500">
            Education and practice, not medical treatment. If you are pregnant
            or living with a heart, seizure or psychiatric condition, speak to
            your doctor before the strong breathwork sessions.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
