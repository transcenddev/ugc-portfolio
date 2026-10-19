import { processSteps, services } from "@/content/portfolio";

export function WhatIMake() {
  return (
    <section className="border-b border-line" id="services" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-10">
        {/* Full-width label so the headline and the service list share one
            top edge instead of the list hanging off the eyebrow's baseline. */}
        <p className="eyebrow text-muted">What I make</p>

        <div className="mt-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* flex-col + mt-auto pins the link to the bottom of the taller
              grid row, using the void the short headline column leaves. */}
          <div className="flex flex-col">
            <h2 className="display-l max-w-sm text-ink">
              Content made for how people actually watch.
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-muted">
              Story-driven content that blends natural product integration,
              relatable storytelling, and engaging visuals, so your brand feels
              like part of the content, not just an ad.
            </p>
            <div className="mt-8 lg:mt-auto lg:pt-12">
              <a
                className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-accent"
                href="#work"
              >
                See it in the work
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <ul className="mt-10 divide-y divide-line border-y border-line lg:mt-0">
            {services.map((service) => (
              <li className="group/row py-5" key={service.title}>
                <h3 className="text-base font-semibold text-ink transition-colors group-hover/row:text-accent">
                  {service.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Numbered because this genuinely is a sequence. Hairline cells give
            each step its own object, and the band's full-width silhouette
            contrasts with the asymmetric list above instead of repeating it. */}
        <div className="mt-20 sm:mt-24">
          <p className="eyebrow text-muted">How it works</p>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <li
                className="group/step flex flex-col bg-paper p-6 transition-colors hover:bg-white/70 sm:p-7"
                key={step.title}
              >
                <span
                  aria-hidden="true"
                  className="display-m text-muted/40 transition-colors group-hover/step:text-accent"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-base font-semibold text-ink transition-colors group-hover/step:text-accent">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
