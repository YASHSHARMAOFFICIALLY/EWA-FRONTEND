"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  BookOpen,
  Waveform,
  Target,
  Lightning,
  MagnifyingGlass,
  DiscordLogo,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────
   EWA bento: pastel tinted cards, white icon chips, one
   orbit diagram. Content tracks the backend's
   ARCHITECTURE.md: webhook-granted access, Cloudflare
   Stream lessons, resume position, and the Discord perk
   (modules/discord) as the headline member benefit.
────────────────────────────────────────────────────── */

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Each card is one flat tint with no border — the tint IS the edge. Borders on
// top of a fill would double the boundary and make the grid look like a table.
type Tint = "violet" | "mint" | "lilac" | "blush" | "sand" | "sky";

const TINTS: Record<Tint, { card: string; chip: string; icon: string }> = {
  violet: {
    card: "bg-[#EEE9FB] dark:bg-[#1A1226]",
    chip: "bg-white dark:bg-white/10",
    icon: "text-[#6D3FBF] dark:text-[#C4A2FF]",
  },
  mint: {
    card: "bg-[#E4F3EA] dark:bg-[#0F1F16]",
    chip: "bg-white dark:bg-white/10",
    icon: "text-[#2F7D57] dark:text-[#8FD9B4]",
  },
  lilac: {
    card: "bg-[#EDEAFB] dark:bg-[#171331]",
    chip: "bg-white dark:bg-white/10",
    icon: "text-[#5B4BD1] dark:text-[#AFA5FF]",
  },
  blush: {
    card: "bg-[#FBEAF0] dark:bg-[#26121B]",
    chip: "bg-white dark:bg-white/10",
    icon: "text-[#B2436E] dark:text-[#F2A0BE]",
  },
  sand: {
    card: "bg-[#F7EEDD] dark:bg-[#211A0F]",
    chip: "bg-white dark:bg-white/10",
    icon: "text-[#8A6D3F] dark:text-[#E3C88A]",
  },
  sky: {
    card: "bg-[#E6EEFA] dark:bg-[#0E1726]",
    chip: "bg-white dark:bg-white/10",
    icon: "text-[#2F5FA8] dark:text-[#9CC2F5]",
  },
};

function Card({
  tint,
  icon: Icon,
  title,
  children,
  className,
  visual,
}: {
  tint: Tint;
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  className?: string;
  visual?: React.ReactNode;
}) {
  const t = TINTS[tint];

  return (
    <motion.div
      variants={item}
      className={cn(
        "flex flex-col rounded-[28px] p-8 sm:p-9",
        t.card,
        className,
      )}
    >
      <div
        className={cn(
          "flex size-11 shrink-0 items-center justify-center rounded-full",
          t.chip,
        )}
      >
        <Icon size={20} className={t.icon} weight="regular" />
      </div>

      <h3 className="mt-7 text-[22px] font-bold leading-[1.25] tracking-[-0.02em] text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.7] text-zinc-600 dark:text-zinc-400">
        {children}
      </p>

      {visual}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Orbit — the four-step practice loop
   ───────────────────────────────────────────── */

const STEPS = [
  { n: 1, label: "Meditate", x: 120, y: 50 },
  { n: 2, label: "Breathe", x: 190, y: 120 },
  { n: 3, label: "Rewire", x: 120, y: 190 },
  { n: 4, label: "Embody", x: 50, y: 120 },
];

// Quarter arcs between adjacent nodes, in cycle order.
const ARCS = [
  "M 120 50 A 70 70 0 0 1 190 120",
  "M 190 120 A 70 70 0 0 1 120 190",
  "M 120 190 A 70 70 0 0 1 50 120",
  "M 50 120 A 70 70 0 0 1 120 50",
];

function Orbit() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % STEPS.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-auto flex items-center justify-center pt-8">
      {/* viewBox is wider than the 240-unit artwork and offset -34 on x: the side
          labels are anchored start/end outside the ring, so "Breathe" runs to
          ~258 and "Embody" back to ~-16. A 0..240 box clipped both in half. */}
      <svg viewBox="-34 0 308 240" className="w-full max-w-[340px]" aria-hidden="true">
        {/* Track the arc travels along */}
        <circle
          cx="120"
          cy="120"
          r="70"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-[#6D3FBF]/15 dark:text-white/10"
        />

        {/* Only the current quarter is drawn, and it redraws each step — the
            loop reads as one thing moving, not four static arcs. */}
        <motion.path
          key={active}
          d={ARCS[active]}
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          className="text-[#6D3FBF] dark:text-[#AD74FF]"
          initial={{ pathLength: 0, opacity: 0.4 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Dashed ring around the hub, rotating slowly */}
        <motion.circle
          cx="120"
          cy="120"
          r="38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 6"
          className="text-[#6D3FBF]/35 dark:text-white/20"
          style={{ originX: "120px", originY: "120px" }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
        />

        {/* Hub */}
        <circle
          cx="120"
          cy="120"
          r="30"
          className="fill-white dark:fill-[#241A38]"
        />
        <text
          x="120"
          y="124"
          textAnchor="middle"
          className="fill-[#6D3FBF] text-[9px] font-bold tracking-[0.14em] dark:fill-[#C4A2FF]"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          PRACTICE
        </text>

        {STEPS.map((s, i) => {
          const on = i === active;
          return (
            <g key={s.n}>
              <motion.circle
                cx={s.x}
                cy={s.y}
                r="17"
                className="fill-white dark:fill-[#241A38]"
                animate={{ scale: on ? 1.12 : 1 }}
                style={{ originX: `${s.x}px`, originY: `${s.y}px` }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              />
              <text
                x={s.x}
                y={s.y + 4}
                textAnchor="middle"
                className={cn(
                  "text-[12px] font-bold transition-colors",
                  on
                    ? "fill-[#6D3FBF] dark:fill-[#C4A2FF]"
                    : "fill-zinc-400 dark:fill-zinc-500",
                )}
              >
                {s.n}
              </text>
              {/* Labels sit outside the ring so they never collide with it. */}
              <text
                x={s.x + (s.x === 190 ? 26 : s.x === 50 ? -26 : 0)}
                y={s.y + (s.y === 50 ? -26 : s.y === 190 ? 34 : 4)}
                textAnchor={s.x === 190 ? "start" : s.x === 50 ? "end" : "middle"}
                className={cn(
                  "text-[11px] font-semibold transition-colors",
                  on
                    ? "fill-[#6D3FBF] dark:fill-[#C4A2FF]"
                    : "fill-zinc-500 dark:fill-zinc-500",
                )}
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function BentoCard() {
  return (
    <section id="platform" className="bg-white dark:bg-[#07040F]">
      <div className="mx-auto max-w-6xl px-5 py-24 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-[13px]">
            The platform
          </p>
          <h2 className="mt-6 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Built for the practice, not the checkout.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            One membership opens the whole library, every course, and the
            private circle. Everything below is what happens after you join,
            the part most course platforms treat as an afterthought.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {/* Hero cell: wide and two rows tall, so the orbit has room to breathe
              and the eye lands here first. */}
          <Card
            tint="sky"
            icon={BookOpen}
            title="The path is a loop, not a ladder."
            className="lg:col-span-2 lg:row-span-2"
            visual={<Orbit />}
          >
            Meditate, breathe, rewire, embody, then round again and deeper.
            Nothing here is a course you finish once and shelve.
          </Card>

          <Card tint="mint" icon={Waveform} title="Anahaa guides every session end to end.">
            No reading list, no homework you do alone. Each session is filmed
            and led start to finish, so you close your eyes and follow.
          </Card>

          <Card tint="lilac" icon={Target} title="Sessions meet your nervous system where it is.">
            A ten-minute downshift on the days you have nothing left, a
            forty-minute hypnosis when you do. Both count as practice.
          </Card>

          <Card tint="violet" icon={Lightning} title="Your streak remembers what motivation forgets.">
            Minutes practised, days in a row, courses opened. The number does
            the nagging so you don&apos;t have to.
          </Card>

          <Card tint="blush" icon={MagnifyingGlass} title="You never lose your place.">
            Every lesson resumes at the second you left it, on the phone you
            started on and the laptop you finish on.
          </Card>

          {/* The Discord perk is the one benefit no other course platform in
              this space ships, so it gets its own card rather than a bullet
              buried in the pricing list. */}
          <Card
            tint="sand"
            icon={DiscordLogo}
            title="A private Discord, open the day you join."
          >
            Members only, and no invite link to chase. Connect Discord once and
            the door opens by itself, with Anahaa and everyone else practising
            beside you.
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

export default BentoCard;
