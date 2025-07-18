import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "@/app/globals.css"; // ✅ Correct location
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";


const IBMPlex = IBM_Plex_Sans({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight:['400','500','600','700']
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Pixa",
  description: "AI-driven image manipulator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{
      variables:{colorPrimary: '#624cf5'}
    }}>
    <html lang="en">
      <body
        className={cn("font-IBMPlex antialiased", IBMPlex.variable)}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
