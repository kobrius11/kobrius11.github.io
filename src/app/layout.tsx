import "@/styles/globals.css";
import { geistSans, geistMono } from "@/lib/fonts";
import { metadata } from "@/app/metadata";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/ui/navbar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { SidebarTrigger, SidebarProvider } from "@/components/ui/sidebar";

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
          {/* <div className="h-full flex flex-col lg:flex-row lg:overflow-hidden">
            <AppSidebar />
          </div> */}
            {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
