import "@/app/globals.css";
import React from "react";
import { IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const IBMPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-purple-100 font-IBMPlex antialiased flex flex-col",
        IBMPlex.variable
      )}
    >
      {/* Top navigation */}
      <header className="flex justify-between items-center p-4 shadow-sm bg-white/80 backdrop-blur-sm">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/assets/images/logo.png"
            alt="Pixa"
            width={100}
            height={40}
          />
        </Link>
        <Link
          href="/sign-in"
          className="px-4 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:opacity-90"
        >
          Login
        </Link>
      </header>

      {/* Hero section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-12 px-4 shadow-lg">
        <h1 className="text-4xl font-bold mb-2">
          Unleash Your Creative Vision with Pixa
        </h1>
        <p className="text-lg opacity-90">
          AI-powered tools to bring your imagination to life.
        </p>
      </section>

      {/* Page content */}
      <main className="flex justify-center items-center flex-1 p-6">
        {children}
      </main>
    </div>
  );
}
