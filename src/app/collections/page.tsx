"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CollectionsPage() {
    const [collections, setCollections] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState("");

    useEffect(() => {
        fetch('/api/collection')
            .then((res) => res.json())
            .then(setCollections);
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
            <div className="grid grid-cols-2 w-full sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                <div className="gap-4">
                    {collections.map((col) => (
                        <div
                            key={col._id}
                            className="group relative flex flex-col gap-2 aspect-square w-full max-w-[500px] max-h-[500px] overflow-hidden cursor-pointer"
                        >
                            <div className="flex rounded-xl items-center justify-center h-full bg-[var(--block)] transition group-hover:bg-[var(--block)]/50">
                                {col.src?.length > 0 ? (
                                    <img
                                        src={col.src[0]}
                                        alt={col.alt[0] || "Collection image"}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div>
                                        <div className="bg-[var(--block)] flex flex-2"></div>
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
                        </div>
                    ))}
                </div>

                <div
                    className="bg-[var(--block)] flex flex-col justify-center items-center rounded-xl cursor-pointer hover:bg-[var(--block)]/50 transition
                    aspect-square"
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