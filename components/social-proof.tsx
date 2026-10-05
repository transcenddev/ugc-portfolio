/* eslint-disable @next/next/no-img-element -- brand logos and testimonial
   screenshots are small static PNGs with unknown intrinsic sizes; next/image
   would require remote/loader config for no real benefit here. */

import { VideoMedia } from "./video-media";

const brands = [
  { name: "Old Spice", file: "oldspice.png" },
  { name: "1HORA", file: "1hora.png" },
  { name: "Goojodoq", file: "goojodoq.png" },
  { name: "Athlene", file: "athlene.png" },
  { name: "Atomax", file: "atomax.png" },
  { name: "Gourmet", file: "gourmet.png" },
  { name: "Inspi", file: "inspi logo.png" },
  { name: "Pro Combat", file: "procombat logo.png" },
  { name: "SCVCN", file: "scvcn logo.png" },
  { name: "Yandy", file: "yandy logo.png" },
  { name: "Yoole", file: "yoole.png" },
  { name: "TNW", file: "logo.png" },
];

const testimonialImages = [
  {
    src: "/assets/testimonials/arleah_grace_grencio_testimonial_spmadrid.png",
    alt: "Written testimonial from Arleah Grace Grencio",
  },
  {
    src: "/assets/testimonials/echen_testimonial.png",
    alt: "Written testimonial from Echen",
  },
  {
    src: "/assets/testimonials/ry_buan_testimonial_sp_madrid.png",
    alt: "Written recommendation from Ry Buan",
  },
  {
    src: "/assets/testimonials/julius_tuliao_testimonial_spmadrid.png",
    alt: "Written testimonial from Julius Tuliao",
  },
  // {
  //   src: "/assets/testimonials/echen_testimonial2.png",
  //   alt: "Additional written testimonial from Echen",
  // },
];

export function SocialProof() {
  return (
    <section className="border-b border-line" id="proof">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-10">
        <p className="eyebrow text-muted">Trusted by</p>

        <ul className="mt-8 grid grid-cols-3 items-center gap-x-6 gap-y-10 sm:grid-cols-4 sm:gap-x-10 lg:grid-cols-6">
          {brands.map((brand) => (
            <li
              className="flex h-10 items-center justify-center"
              key={brand.file}
            >
              <img
                alt={brand.name}
                className="max-h-8 max-w-[6.5rem] object-contain opacity-70 transition-opacity duration-200 hover:opacity-100"
                loading="lazy"
                src={`/assets/brands/${encodeURI(brand.file)}`}
              />
            </li>
          ))}
        </ul>

        <div className="mt-20 border-t border-line pt-16 sm:mt-24">
          <p className="eyebrow text-muted">In their words</p>
          <h2 className="display-l mt-4 max-w-xl text-ink">
            What clients say.
          </h2>

          <div className="mt-10 grid gap-8 lg:grid-cols-[0.55fr_1.45fr] lg:gap-12">
            <figure className="mx-auto w-full max-w-[18rem] lg:mx-0">
              <div className="aspect-[9/18] overflow-hidden rounded-lg bg-stage-raised">
                <VideoMedia
                  file="ian_madrid_testimonial.mp4"
                  label="Video testimonial from Ian Madrid"
                  mode="grid"
                  poster="/assets/posters/testimonials/ian_madrid_testimonial.webp"
                  src="/assets/testimonials/ian_madrid_testimonial.mp4"
                />
              </div>
              <figcaption className="mt-3">
                <p className="text-sm font-medium text-ink">
                  Ian (Martin) Madrid
                </p>
                <p className="meta mt-1 text-muted">
                  CEO, SP Madrid · Founder, OkPo &amp; Convinced AI
                </p>
              </figcaption>
            </figure>

            {/* <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {testimonialImages.map((testimonial, index) => (
                <li
                  className={`overflow-hidden rounded-lg border border-line bg-white ${
                    index === testimonialImages.length - 1
                      ? "col-span-2 sm:col-span-1"
                      : ""
                  }`}
                  key={testimonial.src}
                >
                  <img
                    alt={testimonial.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    src={testimonial.src}
                  />
                </li>
              ))}
            </ul> */}

            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {testimonialImages.map((testimonial) => (
                <li
                  className="aspect-[4/3] overflow-hidden rounded-lg border border-line bg-white"
                  key={testimonial.src}
                >
                  <img
                    alt={testimonial.alt}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    src={testimonial.src}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
