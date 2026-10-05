import { processSteps, services } from "@/content/portfolio";

export function WhatIMake() {
  return (
    <section className="border-b border-line" id="services">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-10">
        <div className="lg:grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-muted">What I make</p>
            <h2 className="display-l mt-4 max-w-sm text-ink">
              Content made for how people actually watch.
            </h2>
            <p className="mt-6 max-w-sm leading-7 text-muted">
              Story-driven content that blends natural product integration,
              relatable storytelling, and engaging visuals, so your brand feels
              like part of the content, not just an ad.
            </p>
          </div>

          <ul className="mt-10 divide-y divide-line border-y border-line lg:mt-0">
            {services.map((service) => (
              <li className="py-5" key={service.title}>
                <h3 className="text-base font-semibold text-ink">
                  {service.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm leading-6 text-muted">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Numbered because this genuinely is a sequence. */}
        <div className="mt-16 border-t border-line pt-10">
          <p className="eyebrow text-muted">How it works</p>
          <ol className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step, index) => (
              <li key={step.title}>
                <span className="meta text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm leading-6 text-muted">
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
