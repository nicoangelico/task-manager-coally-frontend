import Image from "next/image";

export function PageTitle({ title }) {
  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
          className="dark:invert"
          src="/logo.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <p className="mb-2">
            {title}
          </p>
        </div>
    </div>
  );
}
