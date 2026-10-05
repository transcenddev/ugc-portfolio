import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { FeaturedWork } from "@/components/featured-work";
import { Hero } from "@/components/hero";
import { MobileActionBar } from "@/components/mobile-action-bar";
import { Navbar } from "@/components/navbar";
import { SocialProof } from "@/components/social-proof";
import { WhatIMake } from "@/components/what-i-make";
import { WorkLibrary } from "@/components/work-library";

export default function Home() {
  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        href="#work"
      >
        Skip to the work
      </a>

      <Navbar />

      {/* Light shell = the person. Dark stage = the work. */}
      <main className="pb-20 md:pb-0">
        <Hero />

        <FeaturedWork />
        <WorkLibrary />

        <SocialProof />
        <About />
        <WhatIMake />

        <Contact />
      </main>

      <MobileActionBar />
    </>
  );
}
