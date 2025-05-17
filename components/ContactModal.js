import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function ContactModal({ open, onClose }) {
  const dialogRef = useRef(null);

  // Prevent background scroll
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      // Focus modal for accessibility
      setTimeout(() => dialogRef.current?.focus(), 120);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#1a103e]/95 via-[#6E41FF]/90 to-[#130b24]/95 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.13 } }}
        >
          {/* Card */}
          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.92, y: 32 }}
            animate={{ opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } }}
            exit={{ opacity: 0, scale: 0.97, y: 20, transition: { duration: 0.16 } }}
            className="relative w-full max-w-md rounded-2xl shadow-[0_6px_32px_rgba(110,65,255,0.23)] bg-gradient-to-br from-[#23194b] via-[#27134e] to-[#130b24] border border-[#352a5c] p-8 outline-none"
            aria-modal="true"
            role="dialog"
          >
            {/* Close icon */}
            <button
              className="absolute top-4 right-4 text-[#b7a6e5] hover:text-white transition p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8C64FF]/70"
              onClick={onClose}
              aria-label="Close modal"
              tabIndex={0}
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-extrabold text-white mb-2 text-center drop-shadow-glow">
              Contact Lunara
            </h2>
            <p className="mb-4 text-[#b2a1e3] text-center">
              We’d love to hear from you! Reach us directly at:
            </p>
            <div className="flex flex-col gap-3 mb-4 items-center">
              <a
                href="mailto:nathan@lunarahq.com"
                className="block rounded-xl bg-gradient-to-r from-[#6E41FF] to-[#8C64FF] px-5 py-3 text-white font-bold shadow hover:scale-105 hover:shadow-[0_8px_24px_#8C64FF44] transition text-center ring-1 ring-[#8C64FF33] focus:outline-none focus:ring-2 focus:ring-[#6E41FF]/70"
                tabIndex={0}
              >
                nathan@lunarahq.com
              </a>
              <span className="w-14 h-[1.5px] bg-gradient-to-r from-transparent via-[#8C64FF55] to-transparent my-1 rounded-full" />
              <a
                href="tel:+353831514017"
                className="block rounded-xl bg-[#27134e] px-5 py-3 text-[#b2a1e3] font-semibold shadow hover:bg-[#322769] hover:text-white hover:shadow-[0_8px_24px_#8C64FF22] transition text-center ring-1 ring-[#6E41FF22] focus:outline-none focus:ring-2 focus:ring-[#8C64FF]/70"
                tabIndex={0}
              >
                +353 83 151 4017
              </a>
            </div>
            <p className="mt-4 text-xs text-[#756299] text-center">
              We usually respond within 1 business day.
            </p>
            {/* Star overlay for extra polish */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25 animate-pulse"
              style={{
                background:
                  "radial-gradient(circle at 60% 80%, #fff3 1.5px, transparent 40%), radial-gradient(circle at 30% 30%, #fff1 1.5px, transparent 40%), radial-gradient(circle at 80% 40%, #8C64FF22 0%, transparent 60%)"
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
