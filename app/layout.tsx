import type { Metadata } from "next";
import "../styles/style.css";
export const metadata: Metadata = {
  title: "LinkedIn Posts",
  description: "Manage personal LinkedIn posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
