import { Link } from "next-view-transitions";

const links = [
  { href: "#home", label: "Home" },
  { href: "#membership", label: "Membership" },
  { href: "#about", label: "About" },
  { href: "#faq", label: "FAQ" },
];

// ponytail: no lucide-react dep for 3 icons.
const icon = "size-5 shrink-0";

function SupportIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={icon} aria-hidden="true">
      <path strokeLinecap="round" d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="2" y="13" width="4" height="6" rx="1.5" />
      <rect x="18" y="13" width="4" height="6" rx="1.5" />
      <path strokeLinecap="round" d="M20 19v.5a2.5 2.5 0 0 1-2.5 2.5H14" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={icon} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={icon} aria-hidden="true">
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

const focus =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

// No "use client": with the theme toggle gone this holds no state or hooks, so
// it renders on the server. <details> gives the mobile menu its open/close for
// free — that was already the reason no useState was needed here.
export function Navbar() {
  return (
    // bg-card, not bg-background: the bar must read as a white plate sitting on
    // top of the page, the way it does over a saturated hero. Opaque on purpose
    // — blur over a gradient muddies the hero and the link contrast at once.
    <header className="sticky top-0 z-50 bg-card">
      <nav
        aria-label="Main"
        className="relative mx-auto flex h-20 max-w-[1400px] items-center gap-10 px-5 sm:px-8"
      >
        <Link
          href="/"
          className={`flex flex-col gap-0.5 rounded-md text-primary ${focus}`}
        >
          <span className="flex items-start text-[28px] font-bold leading-none tracking-tight">
            EWA
            {/* Leaf rides the cap-height like Mindvalley's — centered on the
                baseline it reads as a dropdown caret instead of a mark. */}
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
          {/* Lockup tagline — muted and small so it sits under the mark without
              competing with the nav links for weight. */}
          <span className="text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-muted-foreground">
            Elevate with Ana
          </span>
          <span className="sr-only">— home</span>
        </Link>

        {/* Absolutely centred on the bar, not flex-centred between logo and
            controls — those two sides have different widths, so a flex-centred
            list would sit off-centre on the page. gap-0 on the list: spacing
            lives in the links' own px-3.5, which is also their hit area. */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`inline-flex h-10 items-center rounded-md px-3.5 text-[17px] font-medium text-foreground transition-colors hover:text-primary ${focus}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2">
          <a
            href="#support"
            aria-label="Support"
            className={`hidden size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent sm:inline-flex ${focus}`}
          >
            <SupportIcon />
          </a>

          {/* ponytail: static locale badge, not a control — no i18n wired yet.
              Swap for a real language menu when locales exist. */}
          <span className="hidden items-center gap-1.5 text-[17px] font-medium text-foreground sm:flex">
            <GlobeIcon />
            EN
          </span>

          {/* mx-1 on top of the parent's gap-2 gives the divider 12px of air on
              each side — it needs more breathing room than the items it splits,
              or it reads as a stray glyph in the row. */}
          <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-border sm:block" />

          <a
            href="#start"
            className={`hidden h-12 items-center rounded-full bg-primary px-7 text-[17px] font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:inline-flex ${focus}`}
          >
            My Home
          </a>

          {/* Mobile menu — native <details> so Escape, focus and toggling are free */}
          <details className="relative lg:hidden">
            <summary
              aria-label="Open menu"
              className={`inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-full text-foreground transition-colors hover:bg-accent [&::-webkit-details-marker]:hidden ${focus}`}
            >
              <MenuIcon />
            </summary>
            <ul className="absolute right-0 top-12 w-56 rounded-2xl border border-border bg-popover p-2 shadow-xl">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={`flex h-11 items-center rounded-xl px-3 text-[15px] font-medium text-popover-foreground transition-colors hover:bg-accent ${focus}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="sm:hidden">
                <a
                  href="#start"
                  className={`mt-1 flex h-11 items-center justify-center rounded-full bg-primary px-3 text-[15px] font-semibold text-primary-foreground ${focus}`}
                >
                  My Home
                </a>
              </li>
            </ul>
          </details>
        </div>
      </nav>
    </header>
  );
}
