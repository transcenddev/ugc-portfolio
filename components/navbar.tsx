import { MobileMenu } from "./mobile-menu";

const links = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#contact", label: "Work with me" },
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

        {/* Desktop navigation. Contact is the one filled control in the bar, so it
            reads as the way in without relying on colour alone — the other
            three are 20px muted text against a 38px solid pill. Accent stays
            duplicated from the hero deliberately: the nav chip is utility,
            the hero CTA is the invitation. */}
        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {links.map((link) =>
            link.href === "#contact" ? (
<a
              className="rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-accent/90"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </a>
            ) : (
              <a
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </a>
            ),
          )}
        </nav>

        {/* Narrow viewports get a disclosure menu instead of a crowded row. */}
        <div className="md:hidden">
          <MobileMenu links={links} />
        </div>
      </div>
    </header>
  );
}
