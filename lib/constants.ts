export const BUSINESS_DATA = {
  name: "Mavericks Technovations",
  url: "https://maverickstechnovations.com",
  phone: "7382440976",
  email: "contactus@maverickstechnovations.com",
  address: {
    street:
      "New Busstand Road, Beside South India Shopping, Above Bata Showroom",
    city: "Kadapa",
    state: "Andhra Pradesh",
    country: "India",
    postalCode: "516001",
  },
  geo: {
    // Kadapa city center coordinates
    latitude: 14.4673,
    longitude: 78.8242,
  },
  socialLinks: {
    instagram: "https://www.instagram.com/maverickstechnovations",
    facebook: "https://www.facebook.com/maverickstechnovations",
    youtube: "https://www.youtube.com/@maverickstechnovations",
    linkedin: "https://www.linkedin.com/company/maverickstechnovations",
  },
} as const;

export const CITIES = [
  "kadapa",
  "bangalore",
  "hyderabad",
  "chennai",
  "vizag",
  "tirupati",
  "nellore",
  "kurnool",
  "guntur",
  "vijayawada",
] as const;

export type City = (typeof CITIES)[number];

export const CITY_LABELS: Record<City, string> = {
  kadapa: "Kadapa",
  bangalore: "Bangalore",
  hyderabad: "Hyderabad",
  chennai: "Chennai",
  vizag: "Visakhapatnam",
  tirupati: "Tirupati",
  nellore: "Nellore",
  kurnool: "Kurnool",
  guntur: "Guntur",
  vijayawada: "Vijayawada",
};

export const SERVICES = [
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    icon: "TrendingUp",
    shortTitle: "Digital Marketing",
    description:
      "Data-driven campaigns that dominate your market and drive measurable, compounding ROI.",
  },
  {
    slug: "seo",
    title: "Search Engine Optimization",
    icon: "Search",
    shortTitle: "SEO",
    description:
      "Rank #1 on Google for high-intent keywords. Technical SEO, content strategy, and authority building.",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    icon: "Share2",
    shortTitle: "SMM",
    description:
      "Build an audience that converts. Hyper-targeted campaigns across Instagram, Facebook, and beyond.",
  },
  {
    slug: "google-ads",
    title: "Google & YouTube Ads",
    icon: "Zap",
    shortTitle: "Paid Ads",
    description:
      "Precision ad campaigns with surgical targeting and maximum return on ad spend.",
  },
  {
    slug: "website-design",
    title: "Website Design",
    icon: "Monitor",
    shortTitle: "Web Design",
    description:
      "High-converting, blazing-fast websites engineered to generate qualified leads 24/7.",
  },
  {
    slug: "ecommerce",
    title: "E-Commerce Solutions",
    icon: "ShoppingCart",
    shortTitle: "E-Commerce",
    description:
      "Full-stack e-commerce builds optimised for conversions and built to scale.",
  },
  {
    slug: "google-my-business",
    title: "Google My Business",
    icon: "MapPin",
    shortTitle: "GMB",
    description:
      "Own the local map pack. Complete GMB optimisation for maximum local search visibility.",
  },
  {
    slug: "email-marketing",
    title: "Email Marketing",
    icon: "Mail",
    shortTitle: "Email",
    description:
      "Automated email flows that nurture leads, re-engage customers, and drive repeat revenue.",
  },
  {
    slug: "graphic-designing",
    title: "Graphic Designing",
    icon: "Pen",
    shortTitle: "Design",
    description:
      "Brand identities and visual assets that command authority and demand attention.",
  },
  {
    slug: "whatsapp-marketing",
    title: "WhatsApp Marketing",
    icon: "MessageCircle",
    shortTitle: "WhatsApp",
    description:
      "Direct-to-customer automated campaigns with 98% open rates and instant engagement.",
  },
  {
    slug: "influencer-marketing",
    title: "Influencer Marketing",
    icon: "Users",
    shortTitle: "Influencers",
    description:
      "Strategic creator partnerships that build authentic trust and reach at scale.",
  },
  {
    slug: "video-shooting",
    title: "Professional Video Shooting",
    icon: "Video",
    shortTitle: "Video",
    description:
      "Cinema-grade production that tells your brand story with authority and converts viewers.",
  },
] as const;

export type ServiceSlug = (typeof SERVICES)[number]["slug"];

export const ACADEMY_COURSES = [
  {
    slug: "medical-coding",
    title: "Medical Coding",
    description:
      "Industry-certified medical coding program covering ICD-10, CPT, HCPCS with guaranteed placement support.",
    duration: "6 months",
    format: "Offline + Online",
    credential: "Medical Coding Certification",
  },
  {
    slug: "digital-marketing-training",
    title: "Digital Marketing Training",
    description:
      "Comprehensive, hands-on digital marketing course covering SEO, Google Ads, Social Media, Analytics, and Content Strategy.",
    duration: "3 months",
    format: "Offline + Online",
    credential: "Digital Marketing Certification",
  },
] as const;

export const PRICING_TIERS = [
  {
    name: "Silver",
    price: 15000,
    priceFormatted: "₹15,000/mo",
    tagline: "Perfect for growing businesses",
  },
  {
    name: "Gold",
    price: 35000,
    priceFormatted: "₹35,000/mo",
    tagline: "Most popular for scaling brands",
    featured: true,
  },
  {
    name: "Platinum",
    price: 50000,
    priceFormatted: "₹50,000/mo",
    tagline: "Enterprise-grade dominance",
  },
] as const;

export const TRUST_PILLARS = [
  { label: "Certified Experts", icon: "Award" },
  { label: "Transparent Process", icon: "Eye" },
  { label: "Proven Results", icon: "BarChart2" },
  { label: "Reliable & Trustworthy", icon: "Shield" },
] as const;
