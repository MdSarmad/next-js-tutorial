import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth Layout",
  description: "Auth Layout",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header style={{ backgroundColor: "lightblue", padding: "1rem" }}>
          <p>Authenticate/Authorize</p>
        </header>
        {children}
      </body>
    </html>
  );
}
