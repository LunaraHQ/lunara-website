// components/NavBar.js
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import useScrollSpy from '../hooks/useScrollSpy'

const sections = ['features','howitworks','pricing','contact'];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(sections, 100);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 transition-colors backdrop-blur-md ${
        scrolled ? 'bg-black/60' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link href="/"><a className="text-2xl font-bold">Lunara</a></Link>
        <div className="hidden md:flex space-x-6">
          {sections.map(id => (
            <a
              key={id}
              href={`#${id}`}
              className={`relative pb-1 ${
                active === id
                  ? 'text-blue-400 after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-blue-400'
                  : 'hover:text-blue-300'
              }`}
            >
              {id.replace(/([A-Z])/g, ' $1').replace(/^./, s=>s.toUpperCase())}
            </a>
          ))}
        </div>
        <Menu className="md:hidden" />
      </div>
    </nav>
  )
}
