"use client";

import { useEffect, useState } from "react";

type Cycle = "monthly" | "annually";
type Currency = "USD" | "INR";

type Plan = {
  id: string;
  title: string;
  desc: string;
  // Prices are set per currency, not converted at runtime. A live FX rate would
  // make ₹2,449 drift to ₹2,451 overnight; local price points are a pricing
  // decision, not a maths one.
  price: Record<Currency, { monthly: number; annually: number }>;
  badge?: string;
  buttonText: string;
  features: string[];
  href: string;
};

const PLANS: Plan[] = [
  {
    id: "seeker",
    title: "Seeker",
    desc: "For the practitioner starting out — the core meditations, breathwork and hypnosis sessions, practised on your own schedule.",
    price: {
      USD: { monthly: 29, annually: 306 },
      INR: { monthly: 1499, annually: 14990 },
    },
    buttonText: "Begin the practice",
    features: [
      "Full meditation & breathwork library",
      "Guided hypnosis sessions",
      "Nervous-system regulation track",
      "Progress and streak tracking",
      "New sessions every month",
      "Community circle access",
    ],
    href: "#start",
  },
  {
    id: "creator",
    title: "Creator",
    desc: "For the member going all the way in — everything in Seeker, plus live containers and direct guidance from the teachers.",
    price: {
      USD: { monthly: 79, annually: 834 },
      INR: { monthly: 3999, annually: 39990 },
    },
    badge: "Most chosen",
    buttonText: "Become a member",
    features: [
      "Everything in Seeker",
      "Live weekly group containers",
      "Ancient yogic practice deep-dives",
      "Identity-rewiring 8-week program",
      "1:1 onboarding call with a guide",
      "Priority answers from teachers",
      "Early access to new courses",
    ],
    href: "#start",
  },
];

// Four-point sparkle, same mark as the hero CTAs.
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

function Check({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} shrink-0`} aria-hidden="true">
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m5 12.5 4.5 4.5L19 7"
      />
    </svg>
  );
}

// ponytail: timezone, not an IP lookup. The browser already knows where it is,
// so this costs no geo API, no server round-trip and no extra dependency.
// It runs after mount on purpose — computing it during render would return USD
// on the server and INR on the client, which is a hydration mismatch.
// Display only: the currency actually charged must be re-decided server-side at
// checkout, since a timezone is trivially spoofed.
function useCurrency(): Currency {
  const [currency, setCurrency] = useState<Currency>("USD");

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // Asia/Calcutta is the legacy alias older browsers still report.
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") setCurrency("INR");
  }, []);

  return currency;
}

function formatPrice(amount: number, currency: Currency) {
  return new Intl.NumberFormat(currency === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

// Same white ground as the hero, so the page reads as one sheet of paper.
// Colour is spent on the primary card border and the CTA only.
export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("monthly");
  const annually = cycle === "annually";
  const currency = useCurrency();

  return (
    <section id="pricing" className="bg-white text-zinc-900">
      <div className="mx-auto max-w-5xl px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-[13px]">
            Membership
          </p>
          <h2 className="mt-6 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
            Choose how deep you go.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-zinc-600">
            One membership, every practice. Cancel whenever — the work is yours
            either way.
          </p>
        </div>

        {/* Toggle is a real switch, not two buttons: one control, one state,
            and screen readers get the on/off semantics for free. */}
        <div className="mt-10 flex items-center justify-center gap-4">
          <span
            className={`text-sm font-medium ${annually ? "text-zinc-500" : "text-zinc-900"}`}
          >
            Monthly
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={annually}
            aria-label="Bill annually"
            onClick={() => setCycle(annually ? "monthly" : "annually")}
            className="relative h-6 w-12 rounded-full bg-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <span
              className={`absolute left-1 top-1 size-4 rounded-full bg-white transition-transform duration-300 ease-out ${
                annually ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium ${annually ? "text-zinc-900" : "text-zinc-500"}`}
          >
            Annually
          </span>
        </div>

        {/* Seven auto rows + grid-rows-subgrid on each card: every card's title,
            price, caption, description, CTA and feature list snap to the SAME
            row line, so a longer description in one card can't push its button
            out of line with the other. Row gap is 0 because the cards' own
            margins already space the rows. */}
        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:grid-rows-[repeat(7,auto)] lg:gap-y-0">
          {PLANS.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              annually={annually}
              currency={currency}
            />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-500">
          Prices in {currency}. Every plan starts with a 7-day trial — no card
          charged until it ends.
        </p>
      </div>
    </section>
  );
}

function PlanCard({
  plan,
  annually,
  currency,
}: {
  plan: Plan;
  annually: boolean;
  currency: Currency;
}) {
  const featured = Boolean(plan.badge);
  const price = plan.price[currency][annually ? "annually" : "monthly"];

  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 lg:row-span-7 lg:grid lg:grid-rows-subgrid ${
        featured
          ? "border-primary shadow-[0_30px_70px_-40px_rgba(119,58,193,0.55)]"
          : "border-zinc-200"
      }`}
    >
      {plan.badge && (
        <span className="absolute -top-3 left-8 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-foreground">
          {plan.badge}
        </span>
      )}

      <h3 className="text-lg font-semibold tracking-tight">{plan.title}</h3>

      {/* tabular-nums keeps the digits from shifting width when the toggle
          swaps 29 for 306 — brand.md rule for anything that updates in place. */}
      <p className="mt-4 flex items-baseline gap-1 font-mono tabular-nums">
        <span className="text-4xl font-bold tracking-tight sm:text-5xl">
          {formatPrice(price, currency)}
        </span>
        <span className="text-sm text-zinc-500">{annually ? "/yr" : "/mo"}</span>
      </p>

      {/* key forces a remount so the fade replays on every toggle. */}
      <span
        key={annually ? "yr" : "mo"}
        className="mt-2 animate-[fade-up_0.25s_ease-out] text-sm text-zinc-500"
      >
        {annually ? "Billed in one annual payment" : "Billed monthly"}
      </span>

      <p className="mt-4 text-[15px] leading-relaxed text-zinc-600">{plan.desc}</p>

      <a
        href={plan.href}
        className={`mt-8 inline-flex h-14 items-center justify-center gap-3 rounded-full px-8 text-[13px] font-semibold uppercase tracking-[0.14em] transition ${
          featured
            ? "bg-primary text-primary-foreground hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            : "border border-[#e0d3bb] text-[#8a6d3f] hover:bg-[#faf6ee] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8a6d3f]"
        }`}
      >
        <Sparkle />
        {plan.buttonText}
      </a>

      <p className="mt-8 text-[13px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
        Includes
      </p>
      <ul className="mt-4 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-[15px] text-zinc-700">
            <Check className="mt-1 size-4 text-primary" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
