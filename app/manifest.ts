import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "XYLENS Journal of Medicine & Wellness",
    short_name: "XYLENS",
    description:
      "Independent evidence, education, and journalism from the Southern California coast.",
    start_url: "/",
    display: "browser",
    background_color: "#eef2ed",
    theme_color: "#1f3532",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
