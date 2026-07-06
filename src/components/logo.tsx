import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Crownix Store home">
      <svg
        width="26"
        height="26"
        viewBox="0 0 40 40"
        fill="none"
        className="transition-transform duration-500 group-hover:rotate-[8deg]"
      >
        <path
          d="M4 28L10 12L20 22L30 12L36 28"
          stroke="#C6A664"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="12" r="2" fill="#C6A664" />
        <circle cx="20" cy="22" r="2" fill="#F6F4EF" />
        <circle cx="30" cy="12" r="2" fill="#C6A664" />
        <line x1="4" y1="32" x2="36" y2="32" stroke="#C6A664" strokeWidth="1.5" />
      </svg>
      <span className="font-display text-xl tracking-wide text-ivory">
        CROWNIX
        <span className="ml-1.5 font-mono text-[10px] font-normal tracking-widest2 text-champagne align-middle">
          STORE
        </span>
      </span>
    </Link>
  );
}
