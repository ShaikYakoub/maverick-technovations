"use client";

import { useOpenDrawer } from "@/context/drawer";
import HeroSection from "@/components/home/HeroSection";
import SplitEcosystem from "@/components/home/SplitEcosystem";
import SpotlightGrid from "@/components/home/SpotlightGrid";
import TrustBar from "@/components/home/TrustBar";
import PricingSection from "@/components/home/PricingSection";
import ClientLogoMarquee from "@/components/home/ClientLogoMarquee";

export default function HomepageClient() {
  const openDrawer = useOpenDrawer();

  return (
    <>
      <HeroSection onOpenDrawer={openDrawer} />
      <TrustBar />
      <ClientLogoMarquee />
      <SplitEcosystem onOpenDrawer={openDrawer} />
      <SpotlightGrid />
      <PricingSection onOpenDrawer={openDrawer} />
    </>
  );
}
