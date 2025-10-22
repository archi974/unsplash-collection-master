"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function CollectionsPage() {
    const [collections, setCollections] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch('/api/collection')
            .then((res) => res.json())
            .then((data) => {
                const sorted = [...data].sort((a, b) =>
                    a.title.localeCompare(b.title, "en", { sensitivity: "base" })
                );
                setCollections(sorted);
            });
    }, []);

    async function handleCreateCollection() {
        if (!title.trim()) return;

        const res = await fetch("/api/collection", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title }),
        })

        if (res.ok) {
            const newCollection = await res.json();
            setCollections((prev) => [newCollection, ...prev]);
            setTitle("");
            setIsModalOpen(false);
        }
    }
    return (
        <main className="flex flex-col items-center gap-5 flex-1">
            <section className="text-center">
                <h1 className="title-gradient text-5xl font-semibold">Collection</h1>
                <p>Explore the world through collections of beautiful</p>
                <p>photos free to use under the <a href="https://unsplash.com/fr/licence">Unsplash License</a>.</p>
            </section>
            <div className="flex flex-wrap w-full  gap-4 p-4 mx-auto justify-center">
                {collections.map((col) => (
                    <Link
                        key={col._id}
                        href={`/collections/${col._id}`}
                        className="group relative flex flex-col gap-2 aspect-square w-full max-w-[350px] max-h-[350px] overflow-hidden cursor-pointer"
                    >
                        <div className="flex flex-2 gap-1 rounded-xl items-center justify-center h-full bg-[var(--block)] transition group-hover:bg-[var(--block)]/50">
                            {col.photos?.length === 0 && (
                                <div className="bg-[var(--block)] flex flex-2"></div>
                            )}
                            {col.photos?.length === 1 && (
                                <img
                                    src={col.photos[0].src}
                                    alt={col.photos[0].alt || "Collection image"}
                                    className="object-cover w-full h-full rounded-lg"
                                />
                            )}

                            {col.photos?.length === 2 && (
                                <div className="grid grid-cols-2 gap-1 w-full h-full">
                                    <img
                                        src={col.photos[0].src}
                                        alt={col.photos[0].alt}
                                        className="object-cover w-full h-full rounded-l-lg"
                                    />
                                    <img
                                        src={col.photos[1].src}
                                        alt={col.photos[1].alt}
                                        className="object-cover w-full h-full rounded-r-lg"
                                    />
                                </div>
                            )}

                            {col.photos?.length >= 3 && (
                                <div className="grid grid-cols-[2fr_1fr] grid-rows-2 gap-1 w-full h-full aspect-[3/2] overflow-hidden">
                                    {/* Image principale (grande à gauche sur 2 lignes) */}
                                    <img
                                        src={col.photos[0].src}
                                        alt={col.photos[0].alt}
                                        className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg row-span-2"
                                    />
                                    <img
                                        src={col.photos[1].src}
                                        alt={col.photos[1].alt}
                                        className="object-cover w-full h-full rounded-tr-lg"
                                    />
                                    <img
                                        src={col.photos[2].src}
                                        alt={col.photos[2].alt}
                                        className="object-cover w-full h-full rounded-br-lg"
                                    />
                                </div>
                            )}

                        </div>
                        <div>
                            <h2 className="font-bold">{col.title}</h2>
                            <p className="text-[var(--foreground)]/35 text-sm">
                                {col.photos?.length || 0}
                                {col.photos?.length === 1 ? " photo" : " photos"}
                            </p>
                        </div>
                    </Link>
                ))}

                <div
                    className="bg-[var(--block)] flex flex-col justify-center items-center rounded-xl hover:bg-[var(--block)]/50 transition
                    aspect-square w-full max-w-[350px] max-h-[350px] overflow-hidden cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Image
                        src="/icons/plus.svg"
                        alt="Icône ajout"
                        width={24}
                        height={24}
                    />
                    <h2>Add new collection</h2>
                </div>

            </div>
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
                        <h2 className="text-lg font-semibold mb-3">Nouvelle collection</h2>
                        <input
                            type="text"
                            placeholder="Titre de la collection"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border w-full rounded-md p-2 mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={handleCreateCollection}
                                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Créer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}