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

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            className="bg-accent px-6 py-3.5 text-sm font-semibold text-white hover:bg-accent-hover"
            href={`mailto:${contactDetails.email}`}
          >
            {contactDetails.email}
          </a>
          <a
            className="border border-stage-line px-6 py-3.5 text-sm font-semibold text-stage-text hover:border-stage-text"
            href="tel:+639669879402"
          >
            +63 966 987 9402
          </a>
          <a
            className="border border-stage-line px-6 py-3.5 text-sm font-semibold text-stage-text hover:border-stage-text"
            href={contactDetails.calendly}
            rel="noopener noreferrer"
            target="_blank"
          >
            Book a call
          </a>
        </div>

        <dl className="mt-16 grid gap-8 border-t border-stage-line pt-10 sm:grid-cols-3">
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
            </dd>
          </div>
          <div>
            <dt className="meta text-stage-muted">Based in</dt>
            <dd className="mt-2 text-sm text-stage-text">
              {contactDetails.location}
            </dd>
          </div>
          <div>
            <dt className="meta text-stage-muted">Available for</dt>
            <dd className="mt-2 text-sm text-stage-text">
              Short-form UGC, Talking-Head Videos, Product Demos & Unboxings, Lifestyle B-Roll, Tutorials & How-To
            </dd>
          </div>
        </dl>

        <footer className="mt-16 border-t border-stage-line pt-8">
          <p className="meta text-stage-muted">
            Reymar Mirante © {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </section>
  );
}
