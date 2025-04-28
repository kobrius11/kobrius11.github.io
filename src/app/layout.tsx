import "@/styles/globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { metadata } from "@/app/metadata";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/ui/navbar";

export { metadata };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
