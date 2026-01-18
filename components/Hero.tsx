import type { ReactNode } from "react";

interface HeroProps {
  children: ReactNode;
}

// Hero renders the landing hero wrapper and passes layout slots via children.
export default function Hero({ children }: HeroProps) {
  return (
    <section className="relative ">
      {/* Background Image */}
      <div className="absolute inset-0 bg-contain bg-top -z-1 bg-no-repeat bg-[#ecede9]"
        style={{ backgroundImage: "url('/hero-bg.jpeg')" }}></div>

      {/* Content Container - positioned at bottom of hero section */}
      <div className="pt-[500px] z-10 pb-8">
        <div className="max-w-7xl mx-auto px-4">{children}</div>
      </div>
    </section>
  );
}