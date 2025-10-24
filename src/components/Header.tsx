"use client";

import Image from "next/image";
import NavButton from "@/components/NavButton";

export default function Header() {
  return (
    <header className="flex shrink-0 items-center justify-between p-5 border-b border-[var(--block)] mb-20">
      <Image
        src="/icons/Logo.svg"
        alt="Logo"
        width={150}
        height={150}
        className="cursor-pointer"
        onClick={() => window.dispatchEvent(new Event("reset-search"))}
      />
      <nav className="flex gap-5 mx-5">
        <NavButton href="/" label="Home" />
        <NavButton href="/collections" label="Collections" />
      </nav>
    </header>
  );
}