import type { Metadata } from "next";
import { BUSINESS_DATA } from "@/lib/constants";
import HomepageClient from "@/components/home/HomepageClient";

export const metadata: Metadata = {
  title: "Dominate the Algorithm",
  description:
    "South India's most aggressive digital growth engine. Digital Marketing Agency & Tech Academy based in Kadapa, Andhra Pradesh.",
  alternates: {
    canonical: BUSINESS_DATA.url,
  },
};

export default function HomePage() {
  return (
    <div style={{ marginTop: "44px" }}>
      <HomepageClient />
    </div>
  );
}
