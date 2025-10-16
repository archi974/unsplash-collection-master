import { fetchPhotoById } from "@/app/api/services/unsplashService";
import { UnsplashPhoto } from "@/types/unsplash";

interface PhotoPageProps {
    params: {
        id: string;
    };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
    const { id } = params;
    const photo: UnsplashPhoto = await fetchPhotoById(id);

    return (
        <main className="flex flex-1 gap-5 mx-auto my-5">
            <div className="flex-shrink-0">
                <img
                    src={photo.urls.regular}
                    alt={photo.alt_description ?? ""}
                    width={photo.width}
                    height={photo.height}
                    className="w-full h-full object-cover rounded-sm"
                />
            </div>
            <div className="flex flex-col flex-2 gap-5">
                <div className="flex items-center gap-4">
                    <img src={photo.user.profile_image.medium} className="rounded-full" alt="user profile" />
                    <p>{photo.user.name}</p>
                </div>
                <p>Published on {new Intl.DateTimeFormat("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                }).format(new Date(photo.created_at))}</p>
                <div className="flex gap-4 [&>button]:bg-[var(--block)] [&>button]:px-4 [&>button]:py-2 [&>button]:rounded-md [&>button]:hover:opacity-80 [&>button]:transition [&>button]:cursor-pointer">
                    <button>
                        Add to Collection
                    </button>
                    <button>
                        Download
                    </button>
                </div>

                <h2>Collections</h2>
            </div>
        </main>
    )
}