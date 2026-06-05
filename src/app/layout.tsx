import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const siteUrl = "https://hamzapehlivan.github.io";
const ogImage = "/hamza-pehlivan.jpg";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hamza Pehlivan | Doctoral Researcher",
    template: "%s | Hamza Pehlivan",
  },
  description:
    "Research homepage of Hamza Pehlivan, Ph.D. student at the Max Planck Institute for Informatics working on 3D scene representations, generative image editing, and inpainting.",
  keywords: [
    "Hamza Pehlivan",
    "Max Planck Institute for Informatics",
    "Visual Computing",
    "Gaussian Splatting",
    "StyleGAN",
    "Image Editing",
    "Image Inpainting",
    "GAN Inversion",
  ],
  authors: [{ name: "Hamza Pehlivan" }],
  openGraph: {
    title: "Hamza Pehlivan | Doctoral Researcher",
    description:
      "Publications in visual computing: 3D Gaussian splatting, generative image editing, inpainting, and GAN inversion.",
    url: siteUrl,
    siteName: "Hamza Pehlivan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: "Hamza Pehlivan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Pehlivan | Doctoral Researcher",
    description:
      "Publications in visual computing: 3D Gaussian splatting, generative image editing, inpainting, and GAN inversion.",
    images: [ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
