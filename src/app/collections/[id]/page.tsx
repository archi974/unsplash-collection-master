import { connectMongo } from "@/data/db/connectMongo";
import Collection from "@/data/models/Collection";
import Link from "next/link";

interface CollectionPageProps {
    params: { id: string };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
    const { id } = await params;
    await connectMongo();

    const collection = await Collection.findById(id).lean();

    if (!collection) {
        return (
            <main className="flex justify-center items-center h-screen">
                <p className="text-gray-500">Collection not found 😢</p>
            </main>
        );
    }

    return (
        <main className="flex flex-col items-center flex-1 px-4 py-10">
            <h1 className="title-gradient text-4xl font-bold mb-2 text-center">
                {collection.title}
            </h1>
            <p className="text-gray-500 mb-8">
                {collection.photos?.length || 0}{" "}
                {collection.photos?.length === 1 ? "photo" : "photos"}
            </p>

            <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full max-w-6xl">
                {collection.photos?.length > 0 ? (
                    collection.photos.map((photo: any, i: number) => (
                        <Link
                            key={i}
                            className="relative aspect-square rounded-lg overflow-hidden shadow"
                            href={`/photo/${photo.unsplashId}`}
                        >
                            <img
                                src={photo.src}
                                alt={photo.alt}
                                className="object-cover w-full h-full hover:opacity-80 transition"
                            />
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-400 text-center col-span-full">
                        No photos in this collection yet.
                    </p>
                )}
            </section>
        </main>
    );
}