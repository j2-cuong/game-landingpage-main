import Image from "next/image";
import Link from "next/link";
import navigation from "../data/navigation.json";

const NAV_ITEMS = navigation.header.navItems;

// Reusable class names for navigation links
const navLinkClass =
  "text-white hover:text-yellow-300 px-4 py-2 text-sm font-medium transition-colors flex items-center h-5";

// Header renders the main navigation bar with branding.
export default function Header() {
  return (
    <header className="absolute min-w-[1920px] z-20" style={{ height: "82px" }}>
      <div className="relative max-w-screen-xl mx-auto px-4">
        <div
          className="flex justify-between items-center h-full"
          style={{
            height: "82px",
            backgroundImage: "url(/topNav-bg.png)",
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="Kiếm Hiệp Thế Giới"
              width={180}
              height={64}
              className="h-16 w-auto"
              priority
            />
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-0">
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
              )
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
