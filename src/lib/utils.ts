// ponytail: join, not clsx + tailwind-merge. Nothing in this codebase passes
// conflicting Tailwind classes that need last-wins merging — the call sites only
// append. Swap in twMerge the day a component takes a className that must
// override a base class (e.g. a caller passing `p-0` over a built-in `p-4`).
export function cn(...inputs: (string | false | null | undefined)[]) {
  return inputs.filter(Boolean).join(" ");
}
