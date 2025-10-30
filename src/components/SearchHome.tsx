"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { UnsplashPhoto } from "@/types/unsplash";
import Image from "next/image";
import Link from "next/link";

export default function SearchHome() {
    const [query, setQuery] = useState("");
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);

    // 🔹 Fonction pour charger des photos
    const fetchPhotos = useCallback(async (searchQuery: string, currentPage: number) => {
        if (!searchQuery) return;

        try {
            setLoading(true);
            setError(null);

            const res = await fetch(
                `/api/unsplashData/get?query=${encodeURIComponent(searchQuery)}&page=${currentPage}`
            );

            if (!res.ok) {
                const status = res.status;
                if (status === 403) throw new Error("Rate limit atteint. Réessaie plus tard.");
                if (status === 404) throw new Error("Aucun résultat trouvé.");
                throw new Error(`Erreur de récupération (${status})`);
            }
            const data: UnsplashPhoto[] = await res.json();

            if (!data || data.length === 0) {
                if (currentPage === 1) {
                    setPhotos([]);
                    setError("Aucun résultat trouvé.");
                }
                setHasMore(false);
                return;
            }

            setPhotos((prev) => {
                const merged = currentPage === 1 ? data : [...prev, ...data];
                const uniquePhoto = merged.filter(
                    (photo, index, self) =>
                        index === self.findIndex((p) => p.id === photo.id && p.urls.small === photo.urls.small)
                );
                return uniquePhoto;
            });
            setHasMore(data.length >= 12);
        } catch (err) {
            console.error("Erreur Unsplash:", err);
            setError(err instanceof Error ? err.message : "Erreur inconnue");
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, []);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;

        window.dispatchEvent(new Event("start-search"));

        setShowIntro(false);

        setPhotos([]);
        setPage(1);
        setHasMore(true);
        await fetchPhotos(query, 1);
    }

    useEffect(() => {
        if (!hasMore || loading || error) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            },
            { threshold: 1 }
        );

        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, error]);

    useEffect(() => {
        if (page > 1 && query.trim()) {
            fetchPhotos(query, page);
        }
    }, [page, fetchPhotos]);

    useEffect(() => {
        function handleReset() {
            setQuery("");
            setPhotos([]);
            setPage(1);
            setHasMore(true);
            setError(null);
            setShowIntro(true);
        }

        window.addEventListener("reset-search", handleReset);
        return () => window.removeEventListener("reset-search", handleReset);
    }, []);

    return (
        <main
            className="home-hero flex flex-1 flex-col items-center justify-center gap-5 text-center px-5 h-full z-1">

            <div className={`flex flex-col items-center text-center transition-all duration-700 ease-in-out ${showIntro
                ? "opacity-100 translate-y-0 mb-10"
                : "opacity-0 -translate-y-10 mb-0 pointer-events-none"
                }`}>
                <h1 className="bg-[var-(--foreground)]">Search</h1>
                <p>Search high-resolution images from Unsplash</p>
            </div>
            <form
                onSubmit={handleSearch}
                className={`flex items-center justify-between gap-3 border border-[var(--block)] shadow-sm rounded-sm px-3 py-2 w-full max-w-lg mx-5 transition-all duration-700 ease-in-out ${showIntro ? "mt-0" : "-mt-20 bg-[var(--background)]"
                    }`}
            >
                <input
                    type="search"
                    className="w-full outline-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter your keywords..."
                />
                <button type="submit" className="border-none bg-transparent p-0 m-0">
                    <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
                </button>
            </form>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-20 mx-50 px-4">
                {photos.map((photo) => {
                    const ratio = photo.width / photo.height;

                    let heightClass = "h-[280px] sm:h-[300px]";
                    if (ratio > 1.3) heightClass = "h-[150px] sm:h-[180px] md:h-[200px]";
                    else if (ratio < 0.75) heightClass = "h-[300px] sm:h-[400px] md:h-[500px]";

                    return (
                        <Link
                            key={`${photo.id}-${photo.urls.small}`}
                            href={`/photo/${photo.id}`}
                            className="cursor-pointer transition-opacity duration-300 ease-in-out"
                        >
                            <img
                                src={photo.urls.small}
                                alt={photo.alt_description ?? ""}
                                className={`rounded-lg object-cover w-full ${heightClass} hover:opacity-80 transition duration-500 ease-in-out opacity-0 animate-fadeIn`}
                            />
                        </Link>
                    )
                })}
            </div>

            {loading && <p className="text-center text-gray-500 mt-4">Loading more...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            {!hasMore && !loading && photos.length > 0 && (
                <p className="text-center text-gray-400 mt-4">No more results.</p>
            )}

            <div ref={observerRef} className="h-10 w-full"></div>
        </main>
    );
}
