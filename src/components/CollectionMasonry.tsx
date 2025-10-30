"use client";

import Masonry from "react-masonry-css";
import Link from "next/link";

interface CollectionMasonryProps {
    photos: {
        src: string;
        alt: string;
        unsplashId: string;
        width?: number;
        height?: number;
    }[];
}

export default function CollectionMasonry({ photos }: CollectionMasonryProps) {
    const breakpointColumns = {
        default: 4,
        1024: 3,
        768: 2,
        500: 1,
    };

    return (
        <Masonry
        breakpointCols={breakpointColumns}
        className="flex gap-4 w-full px-8"
        columnClassName="space-y-4"
    >
        {photos.map((photo: any, i: number) => {
            const ratio = photo.width / photo.height;

            let heightClass = "h-[300px] sm:h-[350px]";
            if (ratio > 1.3) heightClass = "h-[150px] sm:h-[180px] md:h-[200px]";
            else if (ratio < 0.75) heightClass = "h-[300px] sm:h-[400px] md:h-[500px]";

            return (

                <Link
                    key={i}
                    className="block rounded-lg overflow-hidden shadow hover:opacity-90 transition"
                    href={`/photo/${photo.unsplashId}`}
                >
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        className={`object-cover w-full ${heightClass}`}
                    />
                </Link>
            )
        })}
    </Masonry>
    );
}