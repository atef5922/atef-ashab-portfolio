"use client";

import { WhatsappIcon } from "@/components/icons/social-icons";

const WHATSAPP_NUMBER = "8801774333604";

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex size-11 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-110"
    >
      <WhatsappIcon className="size-5" />
    </a>
  );
}
