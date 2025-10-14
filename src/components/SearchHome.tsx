"use client";

import React, { useState } from "react";
import { UnsplashPhoto } from "@/types/unsplash";
import Image from "next/image";

export default function SearchHome() {
    const [query, setQuery] = useState("nature");
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;

        try {
            setLoading(true);
            setError(null);

            const res = await fetch(`/api/collections/get?query=${encodeURIComponent(query)}`);
            if (!res.ok) {
                throw new Error(`Erreur lors de la récupération des photos (${res.status})`);
            }

            const data = await res.json();
            setPhotos(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSearch} className="flex items-center justify-between gap-3 border border-[var(--block)] shadow-sm rounded-sm px-3 py-2 w-full max-w-lg mx-5">
            <input type="search" className="w-full outline-none" name="" id="" placeholder="Enter your keywords..." />
            <button type="submit" className="border-none bg-transparent p-0 m-0">
                <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
            </button>
        </form>
    )
}