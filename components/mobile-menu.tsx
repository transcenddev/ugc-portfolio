"use client";

import { useRef } from "react";

/** Broadcasts open state so the mobile action bar can step aside. */
const MENU_TOGGLE_EVENT = "reymar:mobile-menu";

type MenuLink = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  links: MenuLink[];
};

function BurgerIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.8"
      viewBox="0 0 24 24"
    >
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

/**
 * Disclosure menu for narrow viewports. Native <details> keeps this
 * keyboard-operable and needs no state, and the panel closes on click
 * because a same-page anchor does not dismiss a native details element.
 *
 * The trigger is a 44x44 touch target around a 20px glyph. The two icons are
 * swapped with visibility rather than morphed, and the accessible name stays
 * constant — <details> already reports expanded state, so no aria-expanded
 * is needed.
 *
 * The panel is absolutely positioned against the sticky <header> (which is a
 * positioned element, so it is the containing block) rather than against this
 * <details>, which is why `relative` is absent here. That lets it span the
 * full viewport width while the trigger stays inside the max-width bar.
 */
export function MobileMenu({ links }: MobileMenuProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);

  const close = () => {
    detailsRef.current?.removeAttribute("open");
  };

  /**
   * Native <details> toggles without React knowing, so state is read back off
   * the element in a toggle listener rather than mirrored into state.
   */
  const announce = () => {
    window.dispatchEvent(
      new CustomEvent(MENU_TOGGLE_EVENT, {
        detail: detailsRef.current?.open ?? false,
      }),
    );
  };

  return (
    <details className="group" onToggle={announce} ref={detailsRef}>
      <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-ink [&::-webkit-details-marker]:hidden">
        <span className="group-open:hidden">
          <BurgerIcon />
        </span>
        <span className="hidden group-open:inline">
          <CloseIcon />
        </span>
        <span className="sr-only">Menu</span>
      </summary>

      <nav
        aria-label="Primary"
        className="mobile-panel absolute inset-x-0 top-full z-40 border-b border-line bg-paper"
      >
        <div className="mx-auto max-w-6xl px-5 py-6 sm:px-8 lg:max-w-7xl lg:px-10">
          <ul className="border-t border-line">
            {links.map((link) => (
              <li className="border-b border-line" key={link.href}>
                <a
                  className="block py-4 font-display text-2xl font-bold uppercase tracking-tight text-ink transition-colors hover:text-accent"
                  href={link.href}
                  onClick={close}
                >
                  {link.label}
                </a>
              </li>
))}
          </ul>
        </div>
      </nav>
    </details>
  );
}