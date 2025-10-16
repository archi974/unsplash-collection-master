"use client";

import { useState, useEffect } from "react";

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
        <>
            <h2>Collection</h2>
            <p>Explore the world through collections of beautiful</p>
            <p>photos free to use under the <a href="/">Unsplash License</a>.</p>
            <div className="p-6">
                <div
                    className="border-2 border-dashed border-gray-400 rounded-xl p-6 cursor-pointer text-center hover:bg-gray-100 transition"
                    onClick={() => setIsModalOpen(true)}
                >
                    + Ajouter une collection
                </div>

                <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {collections.map((col) => (
                        <div
                            key={col._id}
                            className="relative rounded-xl overflow-hidden shadow-md group"
                        >
                            <div className="aspect-square bg-gray-200 flex items-center justify-center">
                                {col.src?.length > 0 ? (
                                    <img
                                        src={col.src[0]}
                                        alt={col.alt[0] || "Collection image"}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <span className="text-gray-500">Aucune image</span>
                                )}
                            </div>
                            <div className="p-2 text-center font-medium">{col.title}</div>
                        </div>
                    ))}
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
            </div>
        </>
    )
}