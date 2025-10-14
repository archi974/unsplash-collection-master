import SearchHome from "@/components/SearchHome";

export default function Home() {
  return (
    <>
      <main className="home-hero flex flex-col items-center justify-center gap-5 text-center px-5 h-full">
        <h1>Search</h1>
        <p>Search high-resolution images from Unsplash</p>
        <SearchHome />
      </main>
    </>
  );
}
