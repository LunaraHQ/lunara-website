import Link from 'next/link'

export default function Footer({ onContactOpen }) {
  return (
    <footer className="relative bg-gradient-to-r from-[#1a103e] via-[#221446] to-[#27134e] text-white py-14 border-t border-[#352a5c] mt-24">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:grid md:grid-cols-3 gap-8 text-sm">
        {/* Brand */}
        <div className="mb-8 md:mb-0">
          <Link href="/" className="text-2xl font-extrabold text-white tracking-wide hover:text-[#B299FF] transition">
            Lunara
          </Link>
          <p className="mt-2 text-[#b2a1e3]">
            © {new Date().getFullYear()} LunaraHQ. All rights reserved.
          </p>
        </div>
        {/* Company Links */}
        <nav aria-label="Company" className="mb-8 md:mb-0">
          <h4 className="text-white font-semibold mb-2">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-[#8C64FF] transition">
                About Us
              </Link>
            </li>
            <li>
              {/* Button triggers contact modal */}
              <button
                type="button"
                onClick={onContactOpen}
                className="hover:text-[#8C64FF] transition bg-transparent border-none outline-none cursor-pointer p-0 m-0"
                aria-label="Contact Lunara"
                tabIndex={0}
              >
                Contact
              </button>
            </li>
            <li>
              <Link href="/terms" className="hover:text-[#8C64FF] transition">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/cookie-policy" className="hover:text-[#8C64FF] transition">
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-[#8C64FF] transition">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
        {/* Social */}
        <nav aria-label="Social">
          <h4 className="text-white font-semibold mb-2">Follow</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://twitter.com/LunaraHQ"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8C64FF] transition"
              >
                Twitter/X
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/company/lunarahq"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#8C64FF] transition"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* Subtle star/nebula overlay */}
      <div
        className="pointer-events-none absolute left-0 right-0 bottom-0 h-28 opacity-20"
        style={{
          background:
            "radial-gradient(circle at 80% 40%, #8C64FF66 0%, transparent 70%), radial-gradient(circle at 15% 60%, #fff2 1.5px, transparent 60%)",
        }}
      />
    </footer>
  )
}
