import { contactDetails } from "@/content/portfolio";

const ArrowIcon = () => (
  <svg
    aria-hidden="true"
    className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.8"
    viewBox="0 0 24 24"
  >
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export function Contact() {
  return (
    <section className="bg-stage text-stage-text" id="contact" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="eyebrow text-stage-muted">
              UGC &amp; brand collaborations
            </p>

            <h2 className="display-l mt-4 max-w-2xl text-stage-text">
              Let&apos;s work together.
            </h2>

            <p className="lead mt-6 max-w-md text-stage-muted">
              Tell me about the product and the deliverables you need. I&apos;ll
              come back with a concept and a timeline.
            </p>
            <p className="meta mt-4 text-stage-muted">
              Replies within 24–72 hours · Remote worldwide (GMT+8) · Media kit
              available
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap mt-10">
              <a
                className="bg-accent rounded-lg px-6 py-4 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-accent-hover"
                href={`mailto:${contactDetails.email}`}
              >
                {contactDetails.email}
              </a>
              <a
                className="border border-stage-line rounded-lg px-6 py-4 text-sm font-semibold text-stage-text transition-colors duration-150 ease-out hover:border-stage-text hover:bg-white/5"
                href={contactDetails.phoneHref}
              >
                {contactDetails.phone}
              </a>
              <a
                className="border border-stage-line rounded-lg px-6 py-4 text-sm font-semibold text-stage-text transition-colors duration-150 ease-out hover:border-stage-text hover:bg-white/5"
                href={contactDetails.cal}
                rel="noopener noreferrer"
                target="_blank"
              >
                Book a call
              </a>
            </div>
          </div>

          <aside className="mt-12 lg:mt-0">
            <dl className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
              <div>
                <dt className="meta text-stage-muted">Social</dt>
                <dd className="mt-2 flex flex-col items-start gap-2">
                  <a
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-stage-text hover:text-accent"
                    href="https://www.instagram.com/2049rae/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Instagram
                    <ArrowIcon />
                  </a>
                  <a
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-stage-text hover:text-accent"
                    href="https://www.tiktok.com/@2049rae"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    TikTok
                    <ArrowIcon />
                  </a>
                  <a
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-stage-text hover:text-accent"
                    href="https://www.facebook.com/2049rae"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Facebook
                    <ArrowIcon />
                  </a>
                  <a
                    className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-stage-text hover:text-accent"
                    href="https://www.youtube.com/@2049rae"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    YouTube
                    <ArrowIcon />
                  </a>
                </dd>
              </div>
              <div>
                <dt className="meta text-stage-muted">Based in</dt>
                <dd className="mt-2">
                  <a
                    className="text-sm text-stage-text transition-colors hover:text-accent"
                    href="https://www.google.com/maps/search/?api=1&query=Cavite,Philippines"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {contactDetails.location}
                  </a>
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        <footer className="mt-16 border-t border-stage-line pt-8">
          <p className="meta text-stage-muted">
            Reymar Mirante &copy; {new Date().getFullYear()}
          </p>
          <p className="mt-2 font-mono text-xs text-stage-muted">
            made with crashing out, too much coffee and curiosity
          </p>
          <p className="mt-1 font-mono text-xs text-stage-muted">
            no, wait — actually Next.js, React, TypeScript, and Tailwind CSS
          </p>
        </footer>
      </div>
    </section>
  );
}
