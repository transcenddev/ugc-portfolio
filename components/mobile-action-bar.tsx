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
  const [isContactVisible, setIsContactVisible] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    const hero = document.getElementById("top");
    if (!contact || !hero) return;

    let contactInView = false;
    let heroInView = false;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === contact) contactInView = entry.isIntersecting;
          if (entry.target === hero) heroInView = entry.isIntersecting;
        }
        setIsContactVisible(contactInView);
        setIsHeroVisible(heroInView);
      },
      { threshold: 0.15 },
    );

    observer.observe(contact);
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onToggle = (event: Event) => {
      setIsMenuOpen((event as CustomEvent<boolean>).detail);
    };

    window.addEventListener(MENU_TOGGLE_EVENT, onToggle);
    return () => window.removeEventListener(MENU_TOGGLE_EVENT, onToggle);
  }, []);

  const isConcealed = isContactVisible || isHeroVisible || isMenuOpen;

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
          className="flex-1 rounded-lg border border-ink px-4 py-3 text-center text-sm font-semibold text-ink transition-colors duration-150 ease-out hover:border-ink/80 hover:bg-ink/5 inline-flex items-center justify-center gap-2"
          href="#featured"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5.2v13.6a1 1 0 0 0 1.52.86l10.35-6.8a1 1 0 0 0 0-1.72L9.52 4.34A1 1 0 0 0 8 5.2Z" />
          </svg>
          My work
        </a>
        <a
          className="flex-1 rounded-lg bg-accent px-4 py-3 text-center text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-accent/90 inline-flex items-center justify-center gap-2"
          href="#contact"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          Let&apos;s talk
        </a>
      </div>
    </div>
  );
}
