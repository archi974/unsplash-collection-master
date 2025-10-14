"use client";

import React, { useState } from "react";
import { UnsplashPhoto } from "@/types/unsplash";
import Image from "next/image";

export default function SearchHome() {
    const [query, setQuery] = useState("");
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

    let content;
    if (loading) {
        content = <p className="mt-4 text-gray-500">Loading...</p>;
    } else if (error) {
        content = <p className="mt-4 text-red-500">{error}</p>;
    } else if (photos.length > 0) {
        content = (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                {photos.map((photo) => (
                    <div key={photo.id} className="cursor-pointer">
                        <img
                            src={photo.urls.small}
                            alt={photo.alt_description ?? ""}
                            className="rounded-lg object-cover w-full h-48 hover:opacity-80 transition"
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        content = null;
    }


    return (
        <>
            <form onSubmit={handleSearch} className="flex items-center justify-between gap-3 border border-[var(--block)] shadow-sm rounded-sm px-3 py-2 w-full max-w-lg mx-5">
                <input
                    type="search"
                    className="w-full outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your keywords..." />
                <button type="submit" className="border-none bg-transparent p-0 m-0">
                    <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
                </button>
            </form>

            {content}

        </>
    )
}