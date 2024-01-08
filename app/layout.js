import "./globals.css";

export const metadata = {
  title: "Home - Image Pulse",
  description: "Next.js app router project template",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
