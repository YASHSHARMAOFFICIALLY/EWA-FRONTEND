"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// These answer what someone hesitating about the practice actually asks —
// not billing. Payment, refunds and access questions belong on a support page,
// where someone who has already bought will look for them.
const FAQS = [
  {
    question: "I've never meditated. Will I be lost?",
    answer:
      "No. Ana talks you through every session from the first breath to the last, so there is nothing to figure out on your own — no posture to hold, no technique to memorise, no silent room where you wonder whether you're doing it right. Most people start with a ten-minute session and stay there for a while. That's the practice, not the warm-up for it.",
  },
  {
    question: "How much time does this actually take?",
    answer:
      "Ten to twenty minutes on an ordinary day. Sessions run from short resets you can do between meetings to longer hypnosis journeys of forty minutes or more, and you choose by how much you have left in you that day — not by what the schedule says. Consistency does more here than duration.",
  },
  {
    question: "What's the difference between the meditation, breathwork and hypnosis?",
    answer:
      "They work on different layers. Breathwork moves the nervous system directly and fast — it's what to reach for when your body is already activated. Meditation builds the attention that lets you notice a pattern while it's happening instead of afterwards. Hypnosis goes underneath both, to the beliefs running the pattern in the first place. The courses weave all three because working on one alone tends not to hold.",
  },
  {
    question: "Is hypnosis safe? Will I lose control?",
    answer:
      "You stay awake, aware and in charge the entire time — you can open your eyes and stop whenever you want. It isn't stage hypnosis, and nobody makes you do anything. What it feels like, mostly, is a very focused daydream. If old material surfaces, you're free to come out of it and come back another day.",
  },
  {
    question: "Do I need to be flexible, or do yoga poses?",
    answer:
      "The yogic practices here are breath, kriya and attention work, done sitting or lying down. Nothing requires flexibility, equipment or floor space beyond somewhere to sit comfortably. If you can breathe and stay still, you can do all of it.",
  },
  {
    question: "Is this religious? Do I have to believe anything?",
    answer:
      "The techniques come from yogic tradition, but the practice asks for no belief and no conversion. You're invited to try something and notice what changes for you — nothing more. Students arrive from every faith and from none.",
  },
  {
    question: "Is this therapy? I'm dealing with anxiety and old trauma.",
    answer:
      "No — this is education and practice, not treatment, and Ana is a teacher rather than a clinician. Many people practise alongside therapy and find the two support each other. If you're in active crisis, working with trauma, pregnant, or living with epilepsy, a heart condition or a psychiatric diagnosis, talk to your doctor or therapist first — particularly before the intense breathwork sessions, which are genuinely strong.",
  },
  {
    question: "How long before I feel something?",
    answer:
      "Most people notice the nervous-system effects in the first session or two — calmer body, easier sleep. The identity-level changes are slower and less dramatic: a reaction that doesn't fire, a decision that feels obvious now. Think in weeks of practice, not days, and don't measure it daily.",
  },
  {
    question: "What if I fall off for a few weeks?",
    answer:
      "Then you come back and start where you are. Nothing expires, nothing resets, and every lesson resumes at the second you left it. Missing time isn't a failure of the practice — it's the most normal part of it.",
  },
  {
    question: "Where should I start?",
    answer:
      "With the foundation course. It sequences the breath, meditation and hypnosis work in the order they build on each other, so you aren't guessing what to open next. Everything else in the library stays there for when you're ready.",
  },
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      className={`shrink-0 text-zinc-400 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Faq() {
  // Single open index: an accordion where everything can be open at once stops
  // being a scannable list. null = all closed.
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white dark:bg-[#07040F]">
      <div className="mx-auto max-w-3xl px-5 py-24 sm:py-28">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary sm:text-[13px]">
            FAQ
          </p>
          <h2 className="mt-6 text-[2.25rem] font-bold leading-[1.1] tracking-[-0.03em] text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Questions before you begin.
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400">
            If yours isn&apos;t here, write to us — a person answers, usually the
            same day.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {FAQS.map((faq, index) => {
            const open = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-colors dark:border-white/10 dark:bg-white/[0.03]"
              >
                {/* A real <button>, not a clickable div: keyboard focus, Enter
                    and Space all come for free, and aria-expanded tells screen
                    readers the state the chevron only shows visually. */}
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                  aria-controls={`faq-panel-${index}`}
                  id={`faq-trigger-${index}`}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary sm:px-6 sm:py-5"
                >
                  <span className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 sm:text-base">
                    {faq.question}
                  </span>
                  <Chevron open={open} />
                </button>

                {/* height: auto animates properly here — no max-h guess that
                    clips a long answer or leaves dead space under a short one. */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="panel"
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-[15px] leading-[1.7] text-zinc-600 dark:text-zinc-400 sm:px-6 sm:pb-6">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Faq;
