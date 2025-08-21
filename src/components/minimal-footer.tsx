import Link from 'next/link'

export default function MinimalFooter() {
  const links = [
    { name: 'home', href: '/' },
    { name: 'notes', href: '/notes' },
    { name: 'projects', href: '/projects' },
    { name: 'guestbook', href: '/guestbook' },
    { name: 'contact', href: '/contact' },
    { name: 'RN', href: '/RN' },
  ]

  return (
    <footer className="w-full border-t border-[#D1D5DB] bg-white py-8 bottom-0">
      <div className="container mx-auto px-8">
        <nav className="grid grid-cols-2 md:grid-cols-6 items-center justify-center gap-8 sm:gap-12">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[#1E293B] hover:text-[#6B7280] transition-colors duration-200 font-medium text-lg tracking-wide"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}