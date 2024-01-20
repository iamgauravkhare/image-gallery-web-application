import "./globals.css";
import Navbar from "@/components/Navbar";
import CentralisedData from "./context";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";

export const metadata = {
  title:
    "Image Pulse - An expansive collection of high-quality, royalty-free images that cater to your every visual need | Imagepulse.com",
  description:
    "Welcome to 'Image Pulse', your go-to destination for a visually stunning and endlessly inspiring image experience. This web application harnesses the power of the Unsplash API to curate an expansive collection of high-quality, royalty-free images that cater to your every visual need.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <CentralisedData>
          <div className="min-h-screen w-full text-black font-mono flex flex-col items-center gap-10">
            <Navbar />
            {children}
            <Footer />
          </div>
          <Toaster />
        </CentralisedData>
      </body>
    </html>
  );
}
