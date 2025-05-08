import Link from 'next/link'
import { Twitter, Linkedin, Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="py-12 bg-gray-900 text-gray-400 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-6 md:mb-0">
          <Link href="/"><a className="text-2xl font-bold">Lunara</a></Link>
          <p className="mt-2 text-sm">&copy; {new Date().getFullYear()} Lunara, Inc.</p>
        </div>
        <div className="flex space-x-4 mb-6 md:mb-0">
          <Link href="/about"><a>About Us</a></Link>
          <Link href="/contact"><a>Contact</a></Link>
          <Link href="/privacy"><a>Privacy Policy</a></Link>
        </div>
        <div className="flex space-x-4">
          <a href="#"><Twitter /></a>
          <a href="#"><Linkedin /></a>
          <a href="#"><Github /></a>
        </div>
      </div>
    </footer>
  )
}
