import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Sun, Moon, Menu } from 'lucide-react'

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed w-full z-20 top-0 transition-colors backdrop-blur-md ${
        scrolled ? 'bg-black/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/"><a className="text-2xl font-bold">Lunara</a></Link>
        <div className="hidden md:flex space-x-6">
          {['Features','How It Works','Pricing','Contact'].map((s) => (
            <a key={s} href={`#${s.replace(/\s+/g,'').toLowerCase()}`} className="hover:text-blue-400">{s}</a>
          ))}
        </div>
        <Menu className="md:hidden" />
      </div>
    </nav>
  )
}
