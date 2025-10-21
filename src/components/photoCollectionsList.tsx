"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { UnsplashPhoto } from "@/types/unsplash";

interface PhotoCollectionsListProps {
  photo: UnsplashPhoto;
}

export default function PhotoCollectionsList({ photo }: PhotoCollectionsListProps) {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/collection")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((col: any) =>
          col.photos?.some((p: { unsplashId: string }) => p.unsplashId === photo.id)
        );
        setCollections(filtered);
      });
  }, [photo.id]);

  async function handleRemove(collectionId: string) {
    setLoading(true);
    try {
      const res = await fetch(`/api/collection/${collectionId}/remove`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ unsplashId: photo.id }),
      });

      if (res.ok) {
        setCollections((prev) => prev.filter((col) => col._id !== collectionId));
      } else {
        const err = await res.json();
        alert("❌ Erreur : " + err.error);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Erreur lors de la suppression de la photo");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {collections.length === 0 && (
        <p className="text-gray-400 text-sm">This photo is not part of any collection.</p>
      )}

      {collections.map((col) => (
        <div
          key={col._id}
          onClick={() => handleRemove(col._id)}
          className="
            group flex justify-between items-center p-3 rounded-md border border-transparent
            hover:border-gray-300 transition-all cursor-pointer relative
          "
        >
          <div className="flex items-center gap-4">
            <div className="relative w-[75px] h-[75px] rounded-md overflow-hidden">
              {col.photos[0] ? (
                <Image
                  src={col.photos[0].src}
                  alt={col.photos[0].alt || col.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="bg-[var(--block)] w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  Empty
                </div>
              )}
            </div>

            <div>
              <h3 className="font-semibold">{col.title}</h3>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                {col.photos.length} {col.photos.length === 1 ? "photo" : "photos"}
              </p>
            </div>
          </div>

          <p
            className="
              text-[var(--foreground)] font-semibold text-sm
              opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-300 ease-out
            "
          >
            - Remove
          </p>
        </div>
      ))}

      {loading && <p className="text-xs text-gray-400 mt-2">Updating collections...</p>}
    </div>
  );
}