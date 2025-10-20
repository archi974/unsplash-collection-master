import Image from "next/image";

interface CollectionCardProps {
  id: string;
  title: string;
  photos: { src: string; alt: string }[];
  onSelect: (id: string) => void;
}

export default function CollectionCard({ id, title, photos, onSelect }: CollectionCardProps) {
  const count = photos.length;

  return (
    <div
      onClick={() => onSelect(id)}
      className="flex shadow-md justify-between"
    >
      <div className="flex gap-4">
        <div className="bg-[var(--block)] aspect-square w-full rounded-md flex items-center justify-center">
          {count > 0 ? (
            <Image
              src={photos[0].src}
              alt={photos[0].alt || title}
              fill
              className="object-cover"
            />
          ) : (
            <p>Empty</p>
          )}
        </div>
        <section>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs opacity-80">{count} {count === 1 ? "photo" : "photos"}</p>
        </section>
      </div>
      <p className="text-white font-semibold text-sm">+ Add to collection</p>

    </div>
  );
}
