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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a103e]/95 via-[#6E41FF]/90 to-[#130b24]/95 backdrop-blur-[2px]">
      <div className="relative w-full max-w-md rounded-2xl shadow-[0_6px_32px_rgba(110,65,255,0.23)] bg-gradient-to-br from-[#23194b] via-[#27134e] to-[#130b24] border border-[#352a5c] p-8">
        <button
          className="absolute top-3 right-3 text-[#b7a6e5] hover:text-white text-2xl"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-2xl font-extrabold text-white mb-2 text-center drop-shadow-glow">Contact Lunara</h2>
        <p className="mb-5 text-[#b2a1e3] text-center">
          We’d love to hear from you! Reach us directly at:
        </p>
        <div className="flex flex-col gap-3 mb-2 items-center">
          <a href="mailto:nathan@lunarahq.com" className="block rounded-xl bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] px-5 py-3 text-white font-bold shadow hover:scale-105 transition text-center ring-1 ring-[#8C64FF33]">
            nathan@lunarahq.com
          </a>
          <a href="tel:+353831514017" className="block rounded-xl bg-[#27134e] px-5 py-3 text-[#b2a1e3] font-semibold shadow hover:bg-[#322769] hover:text-white transition text-center ring-1 ring-[#6E41FF22]">
            +353 83 151 4017
          </a>
        </div>
        <p className="mt-4 text-xs text-[#756299] text-center">
          We usually respond within 1 business day.
        </p>
        {/* Space/star overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 animate-pulse"
          style={{
            background: "radial-gradient(circle at 60% 80%, #fff3 1.5px, transparent 40%), radial-gradient(circle at 30% 30%, #fff1 1.5px, transparent 40%), radial-gradient(circle at 80% 40%, #8C64FF22 0%, transparent 60%)"
          }}
        />
      </div>
    </div>
  );
}
