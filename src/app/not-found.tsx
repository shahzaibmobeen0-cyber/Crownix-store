import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-onyx-radial px-6 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="font-display text-5xl text-ivory">This page ran out of time.</h1>
      <p className="max-w-md text-ivory/60">
        The piece you&apos;re looking for may have sold out or moved. Let&apos;s get you back
        to the collection.
      </p>
      <Link href="/" className="btn-gold mt-4">
        Back to Home
      </Link>
    </div>
  );
}
