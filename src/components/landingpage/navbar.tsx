"use client";

import { useState } from "react";
import Link from "next/link";
import { Headset, Globe, Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Membership", href: "/membership" },
  { label: "Academy", href: "/academy" },
  { label: "Coach Training", href: "/coach-training" },
  { label: "Events", href: "/events" },
];

export default function MainNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-neutral-950">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-10">
        {/* Logo — swap for your own EWA wordmark/logo */}
        <Link
          href="/"
          className="flex items-center gap-1 text-2xl font-extrabold tracking-tight text-purple-600"
        >
          <span>Your&#8203;Brand</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="mt-1 text-purple-600"
            aria-hidden="true"
          >
            <path
              d="M4 8l8 8 8-8"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        {/* Center nav links (desktop) */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-lg font-bold text-neutral-900 transition-colors hover:text-purple-600 dark:text-neutral-100 dark:hover:text-purple-400"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right cluster (desktop) */}
        <div className="hidden items-center gap-5 lg:flex">
          <button
            type="button"
            aria-label="Support"
            className="text-neutral-900 transition-colors hover:text-purple-600 dark:text-neutral-100"
          >
            <Headset className="h-6 w-6" strokeWidth={2} />
          </button>

          <button
            type="button"
            className="flex items-center gap-1.5 text-neutral-900 transition-colors hover:text-purple-600 dark:text-neutral-100"
          >
            <Globe className="h-5 w-5" strokeWidth={2} />
            <span className="text-base font-semibold">EN</span>
          </button>

          <span className="h-6 w-px bg-neutral-300 dark:bg-neutral-700" />

          <Link
            href="/home"
            className="rounded-full bg-gradient-to-r from-purple-500 to-purple-700 px-7 py-3 text-base font-bold text-white shadow-sm transition-opacity hover:opacity-95"
          >
            My Home
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="text-neutral-900 lg:hidden dark:text-neutral-100"
        >
          {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-neutral-100 px-6 py-4 lg:hidden dark:border-neutral-800">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-lg font-bold text-neutral-900 dark:text-neutral-100"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-5">
            <button
              type="button"
              aria-label="Support"
              className="text-neutral-900 dark:text-neutral-100"
            >
              <Headset className="h-6 w-6" />
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 text-neutral-900 dark:text-neutral-100"
            >
              <Globe className="h-5 w-5" />
              <span className="text-base font-semibold">EN</span>
            </button>
          </div>

          <Link
            href="/home"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-gradient-to-r from-purple-500 to-purple-700 px-7 py-3 text-center text-base font-bold text-white"
          >
            My Home
          </Link>
        </div>
      )}
    </header>
  );
}
