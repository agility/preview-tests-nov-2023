import React from "react";

import {
  HeroSection,
  FeaturedAttractions,
  CTASection,
} from "../components/sections/home";
import Navbar from "../components/common/Navbar";

export default function Home() {
  return (
    <div className="bg-blue-400">
      <main>
        <Navbar />
        <HeroSection />
        <FeaturedAttractions />
        <CTASection />
      </main>
    </div>
  );
}
