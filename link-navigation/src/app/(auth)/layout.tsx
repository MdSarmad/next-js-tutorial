"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles.css";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const navLinks = [
    { href: "/login", name: "Login" },
    { href: "/register", name: "Register" },
    { href: "/forgot-password", name: "Forgot Password" },
  ];

  return (
    <div>
      <nav>
        <ul className="flex gap-4">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (pathname.startsWith(link.href) && link.href !== "/");
            return (
              <li key={link.href}>
                <Link
                  className={isActive ? "font-bold mr-4" : "text-blue-500 mr-4"}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      {children}
    </div>
  );
}
