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
      className="flex justify-between items-center p-2 shadow-md cursor-pointer group hover:bg-[var(--block)] transition-colors"
    >
      <div className="flex gap-4 items-center">
        <div className="relative aspect-square w-[75px] h-[75px] flex items-center justify-center overflow-hidden">
          {count > 0 ? (
            <Image
              src={photos[0].src}
              alt={photos[0].alt || title}
              fill
              className="object-cover rounded-md"
            />
          ) : (
            <p>Empty</p>
          )}
        </div>
        <section>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs opacity-80 whitespace-nowrap">{count} {count === 1 ? "photo" : "photos"}</p>
        </section>
      </div>
      <p className="font-semibold text-sm opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">+ Add to collection</p>

    </div>
  );
}
