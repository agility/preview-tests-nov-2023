import "../styles/globals.css"; // Ensure Tailwind is imported here

export const metadata = {
  title: "L-Safari",
  description: "A coastal tourist app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
