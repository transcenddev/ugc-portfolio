import Image from "next/image";

export function Hero() {
  return (
    <section className="border-b border-line" id="top">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:grid lg:max-w-7xl lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow text-muted">
            UGC CREATOR • STORYTELLER • PHOTOGRAPHER
          </p>

          <h1 className="display-xl mt-5 text-ink">
            I create authentic content that feels{" "}
            <span className="text-accent">real.</span>
          </h1>

          {/* <p className="lead mt-5 max-w-md text-muted">
            I&apos;m <span className="font-semibold">Reymar Mirante</span>. I
            create story-driven UGC and visual content that helps brands connect
            with Gen Z through fitness, lifestyle, men&apos;s grooming,
            skincare, and tech.
          </p> */}

          {/* <h1 className="display-xl mt-5 text-ink">Reymar Mirante</h1>

          <p className="lead mt-5 max-w-md text-muted">
            I create authentic, story-driven content that helps brands connect
            with Gen Z across fitness, lifestyle, men&apos;s grooming, skincare,
            and tech.
          </p> */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="bg-accent px-6 py-3.5 text-center text-sm font-semibold text-white hover:bg-accent-hover"
              href="#featured"
            >
              Watch my work
            </a>
            <a
              className="border border-ink px-6 py-3.5 text-center text-sm font-semibold text-ink hover:bg-ink hover:text-paper"
              href="#contact"
            >
              Let&apos;s talk
            </a>
          </div>
        </div>

        <div className="mt-12 lg:mt-0">
          <div className="mx-auto w-full max-w-[20rem] overflow-hidden rounded-xl lg:ml-auto lg:mr-0 lg:max-w-[23rem]">
            <Image
              alt="Reymar, photographed at night along the Pasig River in Manila"
              className="h-full w-full object-cover"
              height={3024}
              priority
              sizes="(min-width: 1024px) 23rem, (min-width: 640px) 20rem, 100vw"
              src="/assets/images/poker_face_all_black_fit_manila_night_lights_reymar.JPG"
              width={2268}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
