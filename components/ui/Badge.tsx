import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "hot" | "new" | "category" | "event" | "news" | "announcement";
  className?: string;
}

const variantStyles: Record<NonNullable<BadgeProps["variant"]>, string> = {
  hot: "bg-red-600 text-white",
  new: "bg-green-500 text-white",
  category: "bg-slate-100 text-slate-600",
  event: "text-amber-600 bg-amber-50",
  news: "text-green-600 bg-green-50",
  announcement: "text-blue-600 bg-blue-50",
};

export default function Badge({ children, variant = "category", className = "" }: BadgeProps) {
  return (
    <span
      className={`text-[10px] font-bold font-sans uppercase tracking-[0.05em] py-1 px-3 rounded-full ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

// Helper to get badge variant from category name
export function getCategoryVariant(category: string): BadgeProps["variant"] {
  switch (category.toLowerCase()) {
    case "sự kiện":
      return "event";
    case "thông báo":
      return "announcement";
    case "tin tức":
      return "news";
    default:
      return "category";
  }
}
