import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export default function Card({
  children,
  className = "",
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={`
        bg-white rounded-lg border border-slate-100 shadow-sm overflow-hidden
        ${hover ? "hover:border-red-100 hover:shadow-md transition-all" : ""}
        ${paddingStyles[padding]}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

// Card Header sub-component
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
  withAccent?: boolean;
}

export function CardHeader({ children, className = "", withAccent = false }: CardHeaderProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {withAccent && <div className="w-2 h-8 bg-red-600 rounded-full" />}
      {children}
    </div>
  );
}

// Card with gradient top border
export function CardWithGradient({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden ${className}`}>
      <div className="h-2 bg-gradient-to-r from-red-500 via-amber-500 to-red-500" />
      {children}
    </div>
  );
}
