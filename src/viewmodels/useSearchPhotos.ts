"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UnsplashPhoto } from "@/types/unsplash";

export function useSearchPhotos() {
    const [query, setQuery] = useState("");
    const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [showIntro, setShowIntro] = useState(true);
    const observerRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const restoredFromSession = useRef(false);

    // -- FETCH PHOTOS ------------------------------------------------
    const fetchPhotos = useCallback(async (searchQuery: string, currentPage: number) => {
        if (!searchQuery) return;
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/unsplashData/get?query=${encodeURIComponent(searchQuery)}&page=${currentPage}`);
            if (!res.ok) throw new Error(`Erreur API ${res.status}`);
            const data: UnsplashPhoto[] = await res.json();

            if (!data.length) {
                if (currentPage === 1) setError("Aucun résultat trouvé.");
                setHasMore(false);
                return;
            }

            setPhotos(prev => {
                const merged = currentPage === 1 ? data : [...prev, ...data];
                return Array.from(new Map(merged.map(p => [`${p.id}-${p.urls.small}`, p])).values());
            });
            setHasMore(data.length >= 12);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    }, []);

    // -- SEARCH ACTION -----------------------------------------------
    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        if (!query.trim()) return;
        window.dispatchEvent(new Event("start-search"));
        setShowIntro(false);
        setPhotos([]);
        setPage(1);
        setHasMore(true);
        router.push(`/?query=${encodeURIComponent(query)}`, { scroll: false });
        await fetchPhotos(query, 1);
    }

    // -- SCROLL OBSERVER ---------------------------------------------
    useEffect(() => {
        if (!hasMore || loading || error) return;
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) setPage(p => p + 1);
        });
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [hasMore, loading, error]);

    // -- PAGINATION FETCH --------------------------------------------
    useEffect(() => {
        if (restoredFromSession.current) {
          restoredFromSession.current = false;
          return;
        }
      
        if (page > 1 && query.trim()) {
          fetchPhotos(query, page);
        }
      }, [page, fetchPhotos]);

    // -- RESTORE STATE -----------------------------------------------
    useEffect(() => {
        const saved = sessionStorage.getItem("lastSearchState");
        if (saved) {
            const state = JSON.parse(saved);
            setQuery(state.query);
            setPhotos(state.photos);
            setPage(state.page);
            setShowIntro(state.showIntro);
            restoredFromSession.current = true;
            return;
        }

        const q = searchParams.get("query");
        if (q) {
            setQuery(q);
            setShowIntro(false);
            fetchPhotos(q, 1);
        }
    }, []);

    // -- SAVE STATE --------------------------------------------------
    useEffect(() => {
        if (!query || photos.length === 0) return;
        sessionStorage.setItem("lastSearchState", JSON.stringify({ query, photos, page, showIntro }));
    }, [query, photos, page, showIntro]);

    // -- RESET -------------------------------------------------------
    useEffect(() => {
        function handleReset() {
            sessionStorage.removeItem("lastSearchState");
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

    return {
        query,
        setQuery,
        photos,
        loading,
        error,
        hasMore,
        showIntro,
        observerRef,
        handleSearch
    };
}
