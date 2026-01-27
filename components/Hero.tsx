import type { ReactNode } from "react";

interface HeroProps {
  children: ReactNode;
}

// Hero renders the landing hero wrapper and passes layout slots via children.
export default function Hero({ children }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image - Hidden on mobile */}
      <div
        className="absolute inset-0 bg-contain bg-top -z-1 bg-no-repeat bg-[#ecede9] hidden md:block"
        style={{ backgroundImage: "url('/hero-bg.webp')" }}
      ></div>

      {/* Background Image - Mobile */}
      <div
        className="absolute inset-0 bg-contain bg-top -z-1 bg-no-repeat bg-[#ecede9] md:hidden block"
        style={{ backgroundImage: "url('/hero-bg-mb.png')" }}
      ></div>

      {/* Content Container - positioned at bottom of hero section */}
      <div className="pt-[450px] md:pt-[620px] z-10 pb-8">
        <div className="max-w-7xl mx-auto px-4 mt-8 md:mt-14">{children}</div>
      </div>
    </section>
  );
}
