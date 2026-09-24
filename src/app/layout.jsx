import { Oswald, Inter } from "next/font/google";
import { WorkoutProvider } from "../context/WorkoutContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "FitLog - Ultimate Workout Library",
  description: "Workout Library. Train hard, log honest.",
  icons:{
    icon: "/logo.png"
  }
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${oswald.variable} ${inter.variable}`}
    >
      <body
        suppressHydrationWarning
        className="bg-[#0e0f12] text-[#e1e7ec] font-sans min-h-screen flex flex-col antialiased"
      >
        <WorkoutProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}
