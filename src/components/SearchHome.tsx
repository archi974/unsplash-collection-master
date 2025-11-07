"use client";
import { useSearchPhotos } from "@/viewmodels/useSearchPhotos";
import Image from "next/image";
import Link from "next/link";

export default function SearchHome() {
    const {
        query, setQuery, photos, loading, error,
        hasMore, showIntro, observerRef, handleSearch
    } = useSearchPhotos();

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

            <div className="columns-2 md:columns-4 gap-4 px-4 mt-6 mb-20">
                {photos.map((photo) => {
                    const ratio = photo.width / photo.height;

                    let heightClass = "h-[300px] sm:h-[350px]";
                    if (ratio > 1.3) heightClass = "h-[150px] sm:h-[180px] md:h-[200px]";
                    else if (ratio < 0.75) heightClass = "h-[300px] sm:h-[400px] md:h-[500px]";

                    return (
                        <Link
                            key={`${photo.id}-${photo.urls.small}`}
                            href={`/photo/${photo.id}`}
                            className="cursor-pointer transition-opacity duration-300 ease-in-out block mb-4 break-inside-avoid"
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

            <div ref={observerRef} className="h-10 w-full" />
        </main>
    );
}
