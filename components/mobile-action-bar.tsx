"use client";

import { useEffect, useState } from "react";

/**
 * Mobile-only action bar. Keeps "watch" and "contact" one tap away while
 * scrolling, then steps aside once the contact section is on screen so it
 * never covers the CTA it duplicates.
 */
export function MobileActionBar() {
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHidden(entry.isIntersecting),
      { threshold: 0.15 },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm transition-transform duration-300 md:hidden ${
        isHidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className="flex gap-3 px-5 py-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          className="flex-1 border border-ink px-4 py-3 text-center text-sm font-semibold text-ink"
          href="#featured"
        >
          Watch my work
        </a>
        <a
          className="flex-1 bg-accent px-4 py-3 text-center text-sm font-semibold text-white"
          href="#contact"
        >
          Let&apos;s Talk
        </a>
      </div>
    </div>
  );
}
