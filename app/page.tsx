import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { MobileActionBar } from "@/components/layout/mobile-action-bar";
import { Navbar } from "@/components/layout/navbar";
import { SocialProof } from "@/components/sections/social-proof";
import { WhatIMake } from "@/components/sections/what-i-make";
import { WorkLibrary } from "@/components/sections/work-library";

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
