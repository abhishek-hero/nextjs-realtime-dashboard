import React, { useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Markets", href: "#" },
  { label: "Fees", href: "#" },
  { label: "Trade", href: "#" },
  { label: "List Your Crypto", href: "#" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex items-center justify-between mb-8 py-4 px-2 sm:px-6 bg-white shadow-sm rounded-lg relative">
      <div className="flex items-center gap-4 sm:gap-8">
        <Image src="/koinbxlogo.svg" alt="KoinBX Logo" width={120} height={32} priority />
        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#59e1ff] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex gap-4 items-center">
        <button className="bg-[#59e1ff] hover:bg-[#3fc6e0] text-white px-5 py-2 rounded-full font-semibold shadow transition-colors duration-150">Deposit</button>
        <div className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-bold text-lg border border-gray-300">
          <span>A</span>
        </div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 focus:outline-none"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              // X icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              // Hamburger icon
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile nav dropdown */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-lg rounded-b-lg flex flex-col items-start gap-2 px-6 py-4 md:hidden z-50">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block w-full py-2 text-gray-700 font-medium hover:text-green-600 transition-colors duration-150"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
} 