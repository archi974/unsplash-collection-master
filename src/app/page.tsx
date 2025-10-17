import SearchHome from "@/components/SearchHome";

export default function Home() {
  return (
      <main className="home-hero flex flex-1 flex-col items-center justify-center gap-5 text-center px-5 h-full">
        <h1 className="bg-[var-(--foreground)]">Search</h1>
        <p>Search high-resolution images from Unsplash</p>
        <SearchHome />
      </main>
  );
}
