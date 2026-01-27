"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import navigation from "../data/navigation.json";

const NAV_ITEMS = navigation.header.navItems;

// Reusable class names for navigation links
const navLinkClass =
  "text-white hover:text-yellow-300 px-4 py-2 text-base font-bold transition-all flex items-center h-5 font-kiem-hiep tracking-wide lg:text-xl";

// Header renders the main navigation bar with branding.
export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="absolute w-full z-50 transition-all duration-300">
      <div className="relative max-w-screen-xl mx-auto px-4">
        <div
          className="flex justify-between items-center h-[100px] md:h-[120px] relative z-50 bg-no-repeat bg-contain bg-center md:bg-[url('/topNav-bg.png')]"
        >
          {/* Mobile Menu Toggle - Left (placeholder to balance) */}
          <div className="lg:hidden w-10"></div>

          {/* Logo - Centered on Mobile, Left on Desktop */}
          <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 lg:relative lg:left-0 lg:translate-x-0 transition-all duration-300">
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Kiếm Hiệp Thế Giới"
                width={280}
                height={100}
                className="h-24 md:h-28 w-auto" // Increased logo size significantly
                priority
              />
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-0 cursor-pointer">
            {NAV_ITEMS.map(({ label, href, isExternal }) =>
              href === "/" || href.startsWith("/") ? (
                <Link
                  key={label}
                  href={href}
                  className={navLinkClass}
                  scroll={false}
                >
                  {label}
                </Link>
              ) : (
                <a
                  key={label}
                  href={href}
                  className={navLinkClass}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  target={isExternal ? "_blank" : undefined}
                >
                  {label}
                </a>
              ),
            )}
          </nav>

          {/* Mobile Menu Toggle - Right */}
          <button
            className="lg:hidden p-2 text-white hover:text-yellow-400 transition-colors z-[9999]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu size={32} />
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div
          className={`lg:hidden fixed inset-0 bg-black/95 z-40 transition-all duration-300 ease-in-out ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            }`}
        >
          <div className="flex flex-col items-center justify-center h-full space-y-8 pt-20">
            {NAV_ITEMS.map(({ label, href, isExternal }) => (
              <div key={label} onClick={() => setIsMenuOpen(false)}>
                {href === "/" || href.startsWith("/") ? (
                  <Link
                    href={href}
                    className="text-white text-2xl font-bold font-kiem-hiep hover:text-yellow-300 transition-colors"
                    scroll={false}
                  >
                    {label}
                  </Link>
                ) : (
                  <a
                    href={href}
                    className="text-white text-2xl font-bold font-kiem-hiep hover:text-yellow-300 transition-colors"
                    rel={isExternal ? "noopener noreferrer" : undefined}
                    target={isExternal ? "_blank" : undefined}
                  >
                    {label}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
