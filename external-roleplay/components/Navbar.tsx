'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">ER</span>
            </div>
            <span className="text-white font-bold text-xl">EXTERNAL RP</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-sky-400 transition-colors">
              Home
            </Link>
            <Link href="/leaderboard" className="text-white hover:text-sky-400 transition-colors">
              Leaderboard
            </Link>
            <Link href="/players" className="text-white hover:text-sky-400 transition-colors">
              Players
            </Link>
            <Link href="/shop" className="text-white hover:text-sky-400 transition-colors">
              Shop
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-white hover:bg-gray-100 text-black rounded-lg transition-colors"
            >
              Register
            </Link>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="/"
              className="block px-3 py-2 text-white hover:bg-sky-500/20 rounded-md"
            >
              Home
            </Link>
            <Link
              href="/leaderboard"
              className="block px-3 py-2 text-white hover:bg-sky-500/20 rounded-md"
            >
              Leaderboard
            </Link>
            <Link
              href="/players"
              className="block px-3 py-2 text-white hover:bg-sky-500/20 rounded-md"
            >
              Players
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-2 text-white hover:bg-sky-500/20 rounded-md"
            >
              Shop
            </Link>
            <Link
              href="/login"
              className="block px-3 py-2 text-white hover:bg-sky-500/20 rounded-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="block px-3 py-2 text-white hover:bg-sky-500/20 rounded-md"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
