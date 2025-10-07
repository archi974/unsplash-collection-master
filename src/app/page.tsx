import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between p-5">
        <Image src="/icons/Logo.svg" alt="Logo" width={150} height={150} />
        <nav className="mx-5">
          <ul className="flex gap-5 [&>li]:bg-[var(--block)] [&>li]:px-4 [&>li]:py-2 [&>li]:rounded-sm [&>li]:cursor-pointer [&>li:hover]:bg-[var(--block-hover)]">
            <li>Home</li>
            <li>Collections</li>
          </ul>
        </nav>
      </header>
      <hr className="flex text-[var(--block)] mb-20" />
      <main className="home-hero flex flex-col items-center justify-center gap-5 text-center px-5 h-full">
        <h1>Search</h1>
        <p>Search high-resolution images from Unsplash</p>
        <div className="flex items-center justify-between gap-3 border border-[var(--block)] shadow-sm rounded-sm px-3 py-2 w-full max-w-lg mx-5">
          <input type="search" className="w-full outline-none" name="" id="" placeholder="Enter your keywords..." />
          <Image src="/icons/Search.svg" alt="search" width={24} height={24} />
        </div>
      </main>
    </>
  );
}
