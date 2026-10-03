"use client";

import { useEffect, useRef, useState } from "react";
import ScrollTop from "@/components/layout/ScrollTop";
import WhatsAppButton from "@/components/layout/WhatsAppButton";

export default function FloatingActions() {
  const actionsRef = useRef<HTMLDivElement>(null);
  const [obstructsGallery, setObstructsGallery] = useState(false);

  useEffect(() => {
    const gallery = document.getElementById("certificate-gallery");
    const shortcut = actionsRef.current?.querySelector("a");
    if (!gallery || !shortcut) return;
    let galleryVisible = false;

    const update = () => {
      const content = gallery.getBoundingClientRect();
      const action = shortcut.getBoundingClientRect();
      setObstructsGallery(galleryVisible && content.right > action.left && content.left < action.right);
    };
    const visibility = new IntersectionObserver(([entry]) => {
      galleryVisible = entry.isIntersecting;
      update();
    });
    const size = new ResizeObserver(update);
    visibility.observe(gallery);
    size.observe(gallery);
    window.addEventListener("resize", update);
    return () => {
      visibility.disconnect();
      size.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  // Preserve the shortcuts wherever there is room beside the gallery. On
  // narrow screens, restore them once the gallery has left the viewport.
  return (
    <div ref={actionsRef} className={`hidden lg:block ${obstructsGallery ? "invisible" : ""}`}>
      <ScrollTop />
      <WhatsAppButton />
    </div>
  );
}
