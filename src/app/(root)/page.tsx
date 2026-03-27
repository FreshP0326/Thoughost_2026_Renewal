import Link from "next/link";

export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <Link href="/en" className="text-sm font-medium text-neutral-700 underline-offset-4 hover:text-neutral-900 hover:underline">
        Continue to Thoughost
      </Link>
    </main>
  );
}
