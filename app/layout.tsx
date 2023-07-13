import { NavigationMenuDemo } from "@/components/shared/main-nav";
import "../styles/global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppContext } from "@/providers/app-context";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Insomnia Frontend Task",
  description: "Frontend",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AppContext>
          <NavigationMenuDemo />
          {children}
        </AppContext>
      </body>
    </html>
  );
}
