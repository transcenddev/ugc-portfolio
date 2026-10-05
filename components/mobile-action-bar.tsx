"use client";

import { useEffect, useState } from "react";

/** Emitted by MobileMenu so this bar can step aside while the menu is open. */
const MENU_TOGGLE_EVENT = "reymar:mobile-menu";

/**
 * Mobile-only action bar. Keeps "watch" and "contact" one tap away while
 * scrolling, then steps aside once the contact section is on screen so it
 * never covers the CTA it duplicates. It also steps aside while the header's
 * full-width menu is open, since the two would otherwise overlap.
 */
export function MobileActionBar() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    const onToggle = (event: Event) => {
      setIsMenuOpen((event as CustomEvent<boolean>).detail);
    };

    window.addEventListener(MENU_TOGGLE_EVENT, onToggle);
    return () => window.removeEventListener(MENU_TOGGLE_EVENT, onToggle);
  }, []);

  const isConcealed = isHidden || isMenuOpen;

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm transition-transform duration-300 md:hidden ${
        isConcealed ? "translate-y-full" : "translate-y-0"
      }`}
    >
      <div
        className="flex gap-3 px-5 py-3"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <a
          className="flex-1 rounded-lg border border-ink px-4 py-3 text-center text-sm font-semibold text-ink transition-colors duration-150 ease-out hover:border-ink/80 hover:bg-ink/5"
          href="#featured"
        >
          Watch my work
        </a>
        <a
          className="flex-1 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-accent/90"
          href="#contact"
        >
          Let&apos;s Talk
        </a>
      </div>
    </div>
  );
}