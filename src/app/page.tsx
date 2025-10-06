import Image from "next/image";

export default function Home() {
  return (
    <div>
      <header className="flex items-center justify-between p-5">
        <Image src="/icons/Logo.svg" alt="Logo" width={150} height={150} />
        <nav className="mx-5">
          <ul className="flex gap-5 [&>li]:bg-[var(--block)] [&>li]:px-4 [&>li]:py-2 [&>li]:rounded-sm [&>li]:cursor-pointer [&>li:hover]:bg-[var(--block-hover)]">
            <li>Home</li>
            <li>Collections</li>
          </ul>
        </nav>
      </header>
    </div>
  );
}
