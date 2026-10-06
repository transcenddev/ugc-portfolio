"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const ROTATING_WORDS = ["story-driven", "relatable", "authentic", "cinematic"];

const ROTATE_EVERY = 1000;

export function RotatingWord({
  words,
  interval = ROTATE_EVERY,
}: {
  words: string[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [interval, words.length]);

  return (
    <span className="relative inline-block align-baseline">
      <span className="invisible select-none" aria-hidden="true">
        {words[0]}
      </span>
      {words.map((word, i) => (
        <span
          key={word}
          className="absolute inset-0"
          style={{
            opacity: i === index ? 1 : 0,
            transform: i === index ? "translateY(0)" : "translateY(4px)",
            transition: "opacity 300ms ease-out, transform 300ms ease-out",
            willChange: "opacity, transform",
          }}
          aria-hidden={i !== index}
        >
          {word}
        </span>
      ))}
    </span>
  );
}

export function Hero() {
  return (
    <section className="border-b border-line" id="top">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-16 lg:grid lg:max-w-7xl lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:px-10 lg:pb-28 lg:pt-20">
        <div>
          <p className="eyebrow text-muted">
            UGC CREATOR • STORYTELLER • VIDEOGRAPHER
          </p>

          <h1 className="display-xl mt-5 text-ink">
            I create <RotatingWord words={ROTATING_WORDS} /> content that feels{" "}
            <span className="text-accent">real.</span>
          </h1>

          <p className="lead mt-5 max-w-md text-muted">
            Turning real experiences into content for fitness, lifestyle,
            men&apos;s grooming, skincare, and tech brands.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              className="cta-fill-hover rounded-lg border border-accent px-6 py-3.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white inline-flex items-center gap-2 sm:px-8"
              href="#featured"
            >
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch my work
            </a>

            <a
              className="px-2 py-3.5 text-center text-sm font-semibold text-ink transition-colors hover:underline hover:decoration-1 hover:underline-offset-8 whitespace-nowrap"
              href="#contact"
            >
              Let&apos;s talk
            </a>
          </div>

          <p className="mt-6 text-sm text-muted">
            <a className="transition-colors hover:text-ink" href="#proof">
              Trusted by Old Spice, GameSir, and 10+ partners
            </a>
          </p>
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
