import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/shared/LenisProvider";
import ClientShell from "@/components/shared/ClientShell";
import { BUSINESS_DATA } from "@/lib/constants";

// ── Fonts ──────────────────────────────────────────────────────────────────
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
  preload: true,
});

// ── Viewport (must be separate from metadata in Next.js 14+) ──────────────
export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// ── Root Metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS_DATA.url),
  title: {
    default: "Mavericks Technovations | Dominate the Algorithm",
    template: "%s | Mavericks Technovations",
  },
  description:
    "South India's premier digital marketing agency and tech academy. Rank #1, drive revenue, and train the next generation of digital professionals — based in Kadapa, Andhra Pradesh.",
  keywords: [
    "digital marketing agency kadapa",
    "seo services andhra pradesh",
    "social media marketing kadapa",
    "google ads agency south india",
    "digital marketing course kadapa",
    "medical coding training kadapa",
    "website design kadapa",
    "mavericks technovations",
  ],
  authors: [{ name: "Mavericks Technovations", url: BUSINESS_DATA.url }],
  creator: "Mavericks Technovations",
  publisher: "Mavericks Technovations",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BUSINESS_DATA.url,
    siteName: BUSINESS_DATA.name,
    title: "Mavericks Technovations | Dominate the Algorithm",
    description:
      "South India's premier digital marketing agency and tech academy based in Kadapa, Andhra Pradesh.",
    images: [
      {
        url: "/og?title=Dominate+the+Algorithm&type=home",
        width: 1200,
        height: 630,
        alt: "Mavericks Technovations — Dominate the Algorithm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mavericks Technovations | Dominate the Algorithm",
    description:
      "South India's premier digital marketing agency and tech academy based in Kadapa, Andhra Pradesh.",
    images: ["/og?title=Dominate+the+Algorithm&type=home"],
  },
  icons: {
    icon: [{ url: "/media/images/maverick-favicon.avif", type: "image/avif" }],
    apple: "/media/images/maverick-favicon.avif",
  },
  alternates: {
    canonical: BUSINESS_DATA.url,
  },
};

// ── JSON-LD Schemas ────────────────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${BUSINESS_DATA.url}/#organization`,
  name: BUSINESS_DATA.name,
  url: BUSINESS_DATA.url,
  telephone: `+91${BUSINESS_DATA.phone}`,
  email: BUSINESS_DATA.email,
  description:
    "South India's premier digital marketing agency and tech academy, serving clients across Andhra Pradesh, Karnataka, Tamil Nadu, and Telangana.",
  image: `${BUSINESS_DATA.url}/og?title=Mavericks+Technovations&type=home`,
  logo: `${BUSINESS_DATA.url}/assets/home/images/logo.webp`,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_DATA.address.street,
    addressLocality: BUSINESS_DATA.address.city,
    addressRegion: BUSINESS_DATA.address.state,
    postalCode: BUSINESS_DATA.address.postalCode,
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS_DATA.geo.latitude,
    longitude: BUSINESS_DATA.geo.longitude,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    BUSINESS_DATA.socialLinks.instagram,
    BUSINESS_DATA.socialLinks.facebook,
    BUSINESS_DATA.socialLinks.youtube,
    BUSINESS_DATA.socialLinks.linkedin,
  ],
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Bank Transfer",
  areaServed: {
    "@type": "State",
    name: "Andhra Pradesh",
    containedIn: { "@type": "Country", name: "India" },
  },
};

const educationalOrgSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${BUSINESS_DATA.url}/academy#org`,
  name: `${BUSINESS_DATA.name} Academy`,
  url: `${BUSINESS_DATA.url}/academy`,
  telephone: `+91${BUSINESS_DATA.phone}`,
  email: BUSINESS_DATA.email,
  description:
    "Premier tech academy in Kadapa offering certified Medical Coding and Digital Marketing training programs with guaranteed placement support.",
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS_DATA.address.street,
    addressLocality: BUSINESS_DATA.address.city,
    addressRegion: BUSINESS_DATA.address.state,
    postalCode: BUSINESS_DATA.address.postalCode,
    addressCountry: "IN",
  },
  hasCredential: [
    {
      "@type": "EducationalOccupationalCredential",
      name: "Medical Coding Certification",
    },
    {
      "@type": "EducationalOccupationalCredential",
      name: "Digital Marketing Certification",
    },
  ],
};

// ── Root Layout ────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(educationalOrgSchema),
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <LenisProvider>
          <ClientShell>{children}</ClientShell>
        </LenisProvider>
      </body>
    </html>
  );
}
