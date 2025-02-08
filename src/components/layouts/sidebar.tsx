import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import BookSVG from 'public/book.svg'
import OpeningSVG from 'public/opening.svg'
import TrophySVG from 'public/trophy.svg'

// Définir le type pour les éléments de navigation
type NavItem = {
  title: string
  href: string
  icon: string
}

const navItems: NavItem[] = [
  {
    title: 'Play',
    href: '/play',
    icon: OpeningSVG
  },
  {
    title: 'Opening',
    href: '/opening',
    icon: OpeningSVG
  },
  {
    title: 'Trophies',
    href: '/trophy',
    icon: TrophySVG
  },
  {
    title: 'Library',
    href: '/library',
    icon: BookSVG
  }
]

export function Sidebar() {
  return (
    <div className="w-56 h-screen bg-grey-900">
      <p className="text-2xl font-bold text-white text-center py-4">OpenChess</p>
      <nav className="p-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 p-2 hover:bg-grey-700 rounded-lg group"
          >
            <Image
              src={item.icon}
              aria-hidden="true"
              alt="navIcon"
              width={32}
              height={32}
            />
            <span className="text-lg text-grey-100 font-bold group-hover:text-white">
              {item.title}
            </span>
          </Link>
        ))}
      </nav>
    </div>
  )
}