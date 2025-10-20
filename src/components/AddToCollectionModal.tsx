"use client";

import { useEffect, useState, useMemo } from "react";
import CollectionCard from "./CollectionCard";
import { UnsplashPhoto } from "@/types/unsplash";

interface AddToCollectionModalProps {
    photo: UnsplashPhoto;
    onClose: () => void;
}

export default function AddToCollectionModal({ photo, onClose }: AddToCollectionModalProps) {
    const [collections, setCollections] = useState<any[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/collection")
            .then((res) => res.json())
            .then((data) => {
                const sorted = [...data].sort((a, b) => a.title.localeCompare(b.title));
                setCollections(sorted);
            })
    }, []);

    async function handleSelect(collectionId: string) {
        setLoading(true);
        try {
            const selectedCollection = collections.find(c => c._id === collectionId);

            const alreadyExists = selectedCollection?.photos?.some(
                (p: { src: string }) => p.src === photo.urls.small
            );

            if (alreadyExists) {
                alert("⚠️ Cette photo est déjà dans cette collection !");
                setLoading(false);
                return;
            }

            const res = await fetch(`/api/collection/${collectionId}/add`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    src: photo.urls.small,
                    alt: photo.alt_description || "Unsplash photo",
                }),
            });

            if (res.ok) {
                alert("✅ Photo ajoutée à la collection !");
                onClose();
            } else {
                const err = await res.json();
                alert("❌ Erreur : " + err.error);
            }
        } catch (error) {
            console.error(error);
            alert("❌ Erreur lors de l'ajout à la collection");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 px-4">
            <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-gray-500 hover:text-black text-lg"
                >
                    ✕
                </button>

                <h2 className="text-xl font-semibold mb-4">Add to Collection</h2>

                {loading && <p className="text-sm text-gray-500 mb-2">Ajout en cours...</p>}


                {collections.map((col) => (
                    <CollectionCard
                        key={col._id}
                        id={col._id}
                        title={col.title}
                        photos={col.photos || []}
                        onSelect={handleSelect}
                    />
                ))}
            </div>
        </div>
    );
}
