import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "./globals.css";
import Shell from "@/components/shell";
export const metadata: Metadata = {
  title: {
    default: "Vennlisk Academy | Master the Case",
    template: "%s | Vennlisk Academy",
  },
  description:
    "An interactive, source-referenced study companion for the CIMA Strategic Case Study, November 2026–February 2027.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Shell>
          <div id="main-content">{children}</div>
        </Shell>
      </body>
    </html>
  );
}
