export const MEDIA_ASSETS = {
  homepage: {
    heroVideo: "/media/videos/home-hero-loop.mp4",
    heroFallbackImage: "/media/images/Homepage-Hero-Background.avif",
  },
  services: {
    heroImage: "/media/images/Services-Index-Banner.avif",
  },
  academy: {
    heroImage: "/media/images/Academy-Overview-Banner.avif",
  },
  about: {
    heroImage: "/media/images/About-Page-Story-Visual.avif",
  },
  locations: {
    heroImage: "/media/images/Locations-Index-Visual.avif",
  },
  contact: {
    heroImage: "/media/images/Contact-Page-Visual.avif",
  },
} as const;

export const MEDIA_PROMPTS = {
  images: {
    "home-hero-fallback.jpg":
      "Futuristic Indian city-night business district, subtle digital data streams, premium cinematic lighting, deep charcoal and warm orange accents, volumetric haze, ultra-detailed, high contrast, no logos, no text, 16:9",
    "services-hero.jpg":
      "Abstract growth visualization with arrows, charts, conversion funnel motifs, dark matte background, glowing orange and red light streaks, minimal premium style, no text, 21:9",
    "academy-hero.jpg":
      "Career transformation concept art, young professionals, modern India office-tech setting, hopeful cinematic atmosphere, orange key light, no text, 21:9",
    "about-hero.jpg":
      "Founder-led growth agency narrative, team collaboration in premium workspace, authentic Indian context, cinematic documentary look, no text, 16:9",
    "locations-hero.jpg":
      "South India regional growth map abstraction, connected city nodes, subtle topographic lines, dark background with orange route highlights, no text labels, 16:9",
    "contact-hero.jpg":
      "Modern business consultation setup, desk with laptop and phone, elegant office mood, warm directional light, premium and welcoming, no text, 16:9",
  },
  videos: {
    "home-hero-loop.mp4":
      "Slow cinematic fly-through over futuristic business skyline at dusk, subtle data particles drifting, dark premium color grade with orange-red highlights, smooth camera motion, 4K, loopable, 16:9",
    "network-loop.mp4":
      "Floating node network with softly pulsing connections, depth-of-field, dark background, orange and red glows, elegant slow movement, seamless loop, 16:9",
    "trust-metrics-loop.mp4":
      "Minimal animated metric lines and rising graph light trails, abstract finance-tech style, restrained and premium, dark palette, seamless loop, 21:9",
    "locations-map-loop.mp4":
      "Abstract city map with illuminated paths connecting major South India hubs, dark textured background, orange motion trails, slow elegant animation, seamless loop, 16:9",
  },
} as const;
