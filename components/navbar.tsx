import { MobileMenu } from "./mobile-menu";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8 lg:max-w-7xl lg:px-10">
        <a
          aria-label="Reymar — back to top"
          className="font-display text-lg font-extrabold uppercase tracking-tight text-ink"
          href="#top"
        >
          Reymar Mirante
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              className="text-sm font-medium text-muted hover:text-ink"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
          ))}

          <a
            className="bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
            href="#contact"
          >
            Contact me
          </a>
        </nav>

        {/* Narrow viewports get a disclosure menu instead of a crowded row. */}
        <div className="md:hidden">
          <MobileMenu contactHref="#contact" links={links} />
        </div>
      </div>
    </header>
  );
}