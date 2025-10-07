"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavButton({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-sm cursor-pointer active:scale-95 transition-transform duration-150 ${
        isActive
          ? "bg-[var(--block)] text-[var(--foreground)]"
          : "bg-transparent hover:bg-[var(--block-hover)]"
      }`}
    >
      {label}
    </Link>
  );
}