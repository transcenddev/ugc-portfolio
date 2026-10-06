import Image from "next/image";

export function About() {
  return (
    <section className="border-b border-line" id="about" tabIndex={-1}>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16 lg:px-10">
        <div className="w-full max-w-sm overflow-hidden rounded-xl">
          <Image
            alt="Reymar smiling outdoors in a beach setting"
            className="h-full w-full object-cover"
            height={1920}
            loading="lazy"
            sizes="(min-width: 1024px) 20rem, 100vw"
            src="/assets/images/smile_bicep_beach_shirtless_reymar.JPG"
            width={1440}
          />
        </div>

        <div className="mt-10 lg:mt-0">
          <p className="eyebrow text-muted">Who you&apos;re working with</p>

          <h2 className="display-l mt-4 max-w-lg text-ink">
            Real stories. Thoughtful visuals. Content that connects.
          </h2>

          <p className="mt-6 max-w-xl leading-7 text-muted">
            I&apos;m <span className="font-semibold">Reymar Mirante</span>. a
            Gen Z creator who creates story-driven UGC and visual content for
            fitness, lifestyle, men&apos;s grooming, skincare, and tech brands.
          </p>

          <p className="mt-4 max-w-xl leading-7 text-muted">
            I create from real experiences and everyday moments, bringing a
            natural perspective to every piece. My goal is to make content that
            feels genuine, relatable, and worth watching.
          </p>

          <p className="mt-4 max-w-xl leading-7 text-muted">
            I see content creation as an art form. I use pacing, storytelling,
            and visual elements to give each piece its own character while
            keeping the message clear, natural, and engaging.
          </p>
        </div>
      </div>
    </section>
  );
}
