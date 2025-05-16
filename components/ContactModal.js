import { useEffect } from "react";

export default function ContactModal({ open, onClose }) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-[#6E41FF] mb-2">Contact Lunara</h2>
        <p className="mb-5 text-gray-700">We'd love to hear from you! Reach us at:</p>
        <div className="flex flex-col gap-3 mb-2">
          <a href="mailto:info@lunarahq.com" className="block rounded bg-[#F3F0FF] px-4 py-2 text-[#6E41FF] font-semibold hover:bg-[#E7E1FF] transition">info@lunarahq.com</a>
          <a href="tel:+353831514017" className="block rounded bg-[#F3F0FF] px-4 py-2 text-[#6E41FF] font-semibold hover:bg-[#E7E1FF] transition">+353 83 151 4017</a>
        </div>
        <p className="mt-4 text-xs text-gray-500">We usually respond within 1 business day.</p>
      </div>
    </div>
  );
}
