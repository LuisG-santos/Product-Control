import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./_components/sidebar";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./_components/ui/theme-provider";
import Header from "./_components/ui/header";

const inter = Inter({
  subsets: ["latin"],
  display: "auto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="pt-BR">
      <body suppressHydrationWarning className={`${inter.className} antialiased dark:bg-zinc-900`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex h-full">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-auto p-6">{children}</main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
