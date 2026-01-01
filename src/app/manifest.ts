import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Prime Rent A Car",
    short_name: "Prime Rent",
    description: "Prime Rent A Car offers modern rentals in Baku with transparent pricing.",
    start_url: "/",
    display: "standalone",
    background_color: "#F4F6FB",
    theme_color: "#F5A524",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
