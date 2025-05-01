import "@/styles/globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { metadata } from "@/app/metadata";
import Navbar from "@/components/ui/home/navbar";
import { Providers } from "@/app/providers";

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}