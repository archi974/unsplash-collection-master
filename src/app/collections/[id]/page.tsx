import { connectMongo } from "@/data/db/connectMongo";
import Collection from "@/data/models/Collection";
import CollectionMasonry from "@/components/CollectionMasonry";

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

    const safePhotos = collection.photos.map((p: any) => ({
        src: p.src,
        alt: p.alt,
        unsplashId: p.unsplashId,
        width: p.width,
        height: p.height,
    }));

    return (
        <main className="flex flex-col items-center flex-1 px-4 py-10">
            <h1 className="title-gradient text-4xl font-bold mb-2 text-center">
                {collection.title}
            </h1>
            <p className="text-gray-500 mb-8">
                {safePhotos.length || 0} {safePhotos.length === 1 ? "photo" : "photos"}
            </p>

            {/* <section className="columns-2 md:columns-4 gap-4 px-4 mt-6 mb-20"> */}
                {safePhotos.length > 0 ? (
                    <CollectionMasonry photos={safePhotos} />
                ) : (
                    <p className="text-gray-400 text-center col-span-full">
                        No photos in this collection yet.
                    </p>
                )}
            {/* </section> */}
        </main>
    );
}