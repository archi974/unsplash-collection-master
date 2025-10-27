"use client";

import Image from "next/image";
import NavButton from "@/components/NavButton";
import { useEffect, useState } from "react";

export default function Header() {
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        function handleStartSearch() {
            setIsSearching(true);
        }
        function handleReset() {
            setIsSearching(false);
        }

        window.addEventListener("start-search", handleStartSearch);
        window.addEventListener("reset-search", handleReset);

        return () => {
            window.removeEventListener("start-search", handleStartSearch);
            window.removeEventListener("reset-search", handleReset);
        };
    }, [])

    return (
        <header className={`header-border-gradient flex shrink-0 items-center justify-between p-5 mb-20 transition-all duration-700 ease-in-out ${isSearching
                ? "active"
                : ""
            }`}>
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