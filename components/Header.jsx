'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about/', label: 'About' },
  { href: '/services/', label: 'Services' },
  { href: '/solutions/', label: 'Solutions' },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const active = (href) => {
    if (href === '/') {
      return pathname === '/';
    }

    return pathname.startsWith(href.replace(/\/$/, ''));
  };

  const closeMenu = () => {
    setOpen(false);
  };

  return (
    <header className={`site-header ${open ? 'menu-open' : ''}`}>
      <div className="container nav-wrap">

        {/* Logo */}
        <Link
          className="brand"
          href="/"
          onClick={closeMenu}
          aria-label="VLSSY Technologies home"
        >
          <img
            src="/images/logo-tech-crop.png"
            alt="VLSSY Technologies"
            width="220"
            height="61"
          />
        </Link>

        {/* Navigation */}
        <nav
          className="primary-nav"
          id="primary-nav"
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={active(link.href) ? 'is-active' : ''}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Let's Talk */}
        <Link
          className="button button-small nav-cta"
          href="/contact/"
          onClick={closeMenu}
        >
          Let’s talk <span>↗</span>
        </Link>

        {/* Mobile Menu */}
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />

          <span className="sr-only">
            Toggle navigation
          </span>
        </button>

      </div>
    </header>
  );
}