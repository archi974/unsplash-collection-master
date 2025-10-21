import { fetchPhotoById } from "@/app/api/services/unsplashService";
import { UnsplashPhoto } from "@/types/unsplash";
import AddToCollectionButton from "@/components/AddToCollectionButton";
import PhotoCollectionsList from "@/components/photoCollectionsList";

interface PhotoPageProps {
    params: { id: string };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
    const { id } = await params;
    const photo: UnsplashPhoto = await fetchPhotoById(id);

    return (
        <main className="flex flex-col lg:flex-row flex-1 gap-5 mx-auto mb-15 px-4">
            <div className="flex-1 flex justify-center">
                <img
                    src={photo.urls.regular}
                    alt={photo.alt_description ?? ""}
                    width={photo.width}
                    height={photo.height}
                    className="w-full max-w-[750px] h-auto object-cover rounded-sm"
                />
            </div>
            <div className="flex flex-col flex-1 gap-5">
                <div className="flex items-center gap-4">
                    <img src={photo.user.profile_image.medium} className="rounded-full" alt="user profile" />
                    <p>{photo.user.name}</p>
                </div>
                <p>Published on{" "}
                    {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }).format(new Date(photo.created_at))}
                </p>

                <AddToCollectionButton photo={photo} />

                <h2>Collections</h2>
                <PhotoCollectionsList photo={photo} />

            </div>
        </main>
    )
}