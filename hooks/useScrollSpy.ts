"use client";

import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 120) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    function onScroll() {
      const scrollY = window.scrollY + offset;
      let current = "";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (scrollY >= el.offsetTop) {
          current = id;
        }
      }

      setActiveId(current || ids[0] || "");
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return activeId;
}
