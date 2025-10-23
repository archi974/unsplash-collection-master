// "use client";

// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { UnsplashPhoto } from "@/types/unsplash";
// import Image from "next/image";
// import Link from "next/link";

// export default function SearchHome() {
//     const [query, setQuery] = useState("");
//     const [photos, setPhotos] = useState<UnsplashPhoto[]>([]);
//     const [page, setPage] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState<string | null>(null);
//     const [hasMore, setHasMore] = useState(true);

//     const observerRef = useRef<HTMLDivElement | null>(null);

//     const fetchPhotos = useCallback(async (newQuery: string, currentPage: number) => {
//         try {
//             setLoading(true);
//             setError(null);

//             const res = await fetch(
//                 `/api/unsplashData/get?query=${encodeURIComponent(newQuery)}&page=${currentPage}`
//             );

//             if (!res.ok) throw new Error(`Erreur de récupération (${res.status})`);

//             const data: UnsplashPhoto[] = await res.json();

//             if (data.length < 12) setHasMore(false);

//             setPhotos((prev) => (currentPage === 1 ? data : [...prev, ...data]));
//         } catch (err) {
//             setError(err instanceof Error ? err.message : "Erreur inconnue");
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     // async function handleSearch(e: React.FormEvent) {
//     //     e.preventDefault();
//     //     if (!query.trim()) return;

//     //     try {
//     //         setLoading(true);
//     //         setError(null);

//     //         const res = await fetch(`/api/unsplashData/get?query=${encodeURIComponent(query)}`);
//     //         if (!res.ok) {
//     //             throw new Error(`Erreur lors de la récupération des photos (${res.status})`);
//     //         }

//     //         const data = await res.json();
//     //         setPhotos(data);
//     //     } catch (err) {
//     //         setError(err instanceof Error ? err.message : "Erreur inconnue");
//     //     } finally {
//     //         setLoading(false);
//     //     }
//     // }

//     async function handleSearch(e: React.FormEvent) {
//         e.preventDefault();
//         if (!query.trim()) return;

//         setPhotos([]);
//         setPage(1);
//         setHasMore(true);
//         await fetchPhotos(query, 1);
//     }

//     // 🔹 Observer pour scroll infini
//     useEffect(() => {
//         if (!hasMore || loading) return;

//         const observer = new IntersectionObserver(
//             (entries) => {
//                 if (entries[0].isIntersecting) {
//                     setPage((prevPage) => prevPage + 1);
//                 }
//             },
//             { threshold: 1.0 }
//         );

//         if (observerRef.current) observer.observe(observerRef.current);
//         return () => observer.disconnect();
//     }, [hasMore, loading])

//     useEffect(() => {
//         if (page > 1) fetchPhotos(query, page);
//     }, [page, query, fetchPhotos]);

//     // let content;
//     // if (loading) {
//     //     content = <p className="mt-4 text-gray-500">Loading...</p>;
//     // } else if (error) {
//     //     content = <p className="mt-4 text-red-500">{error}</p>;
//     // } else if (photos.length > 0) {
//     //     content = (
//     //         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-20">
//     //             {photos.map((photo) => (
//     //                 <Link
//     //                     key={photo.id}
//     //                     className="cursor-pointer"
//     //                     href={`/photo/${photo.id}`}
//     //                 >
//     //                     <img
//     //                         src={photo.urls.small}
//     //                         alt={photo.alt_description ?? ""}
//     //                         className="rounded-lg object-cover w-full h-48 hover:opacity-80 transition"
//     //                     />
//     //                 </Link>
//     //             ))}
//     //         </div>
//     //     );
//     // } else {
//     //     content = null;
//     // }


//     return (
//         <>
//             <form onSubmit={handleSearch} className="flex items-center justify-between gap-3 border border-[var(--block)] shadow-sm rounded-sm px-3 py-2 w-full max-w-lg mx-5">
//                 <input
//                     type="search"
//                     className="w-full outline-none"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Enter your keywords..." />
//                 <button type="submit" className="border-none bg-transparent p-0 m-0">
//                     <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
//                 </button>
//             </form>

//             {/* {content} */}

//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-20 px-4">
//                 {photos.map((photo) => (
//                     <Link
//                         key={photo.id}
//                         href={`/photo/${photo.id}`}
//                         className="cursor-pointer"
//                     >
//                         <img
//                             src={photo.urls.small}
//                             alt={photo.alt_description ?? ""}
//                             className="rounded-lg object-cover w-full h-48 hover:opacity-80 transition"
//                         />
//                     </Link>
//                 ))}
//             </div>

//             {loading && <p className="text-center text-gray-500 mt-4">Loading more...</p>}
//             {error && <p className="text-center text-red-500 mt-4">{error}</p>}
//             {!hasMore && photos.length > 0 && (
//                 <p className="text-center text-gray-400 mt-4">No more results.</p>
//             )}

//             <div ref={observerRef} className="h-10 w-full"></div>

//         </>
//     )
// }






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

            if(!data || data.length === 0) {
                if(currentPage === 1) {
                    setPhotos([]);
                    setError("Aucun résultat trouvé.");
                }
                setHasMore(false);
                return;
            }

            setPhotos((prev) => (currentPage === 1 ? data : [...prev, ...data]));

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
        if (page > 1) fetchPhotos(query, page);
    }, [page, query, fetchPhotos]);

    return (
        <>
            <form
                onSubmit={handleSearch}
                className="flex items-center justify-between gap-3 border border-[var(--block)] shadow-sm rounded-sm px-3 py-2 w-full max-w-lg mx-5"
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

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 mb-20 px-4">
                {photos.map((photo) => (
                    <Link
                        key={photo.id}
                        href={`/photo/${photo.id}`}
                        className="cursor-pointer"
                    >
                        <img
                            src={photo.urls.small}
                            alt={photo.alt_description ?? ""}
                            className="rounded-lg object-cover w-full h-48 hover:opacity-80 transition duration-500 ease-in-out opacity-0 animate-fadeIn"
                        />
                    </Link>
                ))}
            </div>

            {loading && <p className="text-center text-gray-500 mt-4">Loading more...</p>}
            {error && <p className="text-center text-red-500 mt-4">{error}</p>}
            {!hasMore && !loading && photos.length > 0 && (
                <p className="text-center text-gray-400 mt-4">No more results.</p>
            )}

            <div ref={observerRef} className="h-10 w-full"></div>
        </>
    );
}
