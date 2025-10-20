"use client";

import { useState } from "react";
import AddToCollectionModal from "./AddToCollectionModal";
import { UnsplashPhoto } from "@/types/unsplash";

export default function AddToCollectionButton({ photo }: { photo: UnsplashPhoto }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex gap-4 [&>button]:bg-[var(--block)] [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md [&>button]:hover:opacity-80 [&>button]:transition [&>button]:cursor-pointer">

            <div className="flex gap-4 [&>button]:bg-[var(--block)] [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md [&>button]:hover:opacity-80 [&>button]:transition [&>button]:cursor-pointer">
                <button onClick={() => setIsModalOpen(true)}>Add to Collection</button>
                {/* <button onClick={() => window.open(photo.links.download, "_blank")}>
                    Download
                </button> */}
            </div>

            {isModalOpen && (
                <AddToCollectionModal
                    photo={photo}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
