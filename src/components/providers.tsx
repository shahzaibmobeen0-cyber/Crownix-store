"use client";

import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "@/components/loading-screen";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("crownix-intro-seen");
    if (seen) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => {
      setLoading(false);
      sessionStorage.setItem("crownix-intro-seen", "1");
    }, 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>{children}</div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            background: "#121214",
            color: "#F6F4EF",
            border: "1px solid rgba(198,166,100,0.35)",
            fontFamily: "var(--font-manrope)",
            fontSize: "14px",
          },
        }}
      />
    </>
  );
}
