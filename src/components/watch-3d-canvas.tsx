"use client";

import dynamic from "next/dynamic";

const Watch3D = dynamic(() => import("@/components/watch-3d"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-56 w-56 animate-pulse rounded-full border border-champagne/30 bg-gradient-to-br from-champagne/10 to-transparent md:h-72 md:w-72" />
    </div>
  ),
});

export default Watch3D;
