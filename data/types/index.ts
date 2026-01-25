// =====================
// Quick Actions Types
// =====================
export interface QuickAction {
  id: string;
  label: string;
  sub: string;
  iconName: "download" | "mobile" | "register" | "topup";
  gradient: string;
  background: string;
  href: string;
  bgImage?: string;
  extraInfo?: {
    left: { value: string; label: string };
    right: { value: string; label: string };
  };
}

// =====================
// Banner Types
// =====================
export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

// =====================
// News & Article Types
// =====================
export interface NewsItem {
  id: string;
  category: string;
  title: string;
  date: string;
  author?: string;
  isHot?: boolean;
  isNew?: boolean;
}

export interface ArticleItem extends NewsItem {
  slug?: string;
  showOnHomepage?: boolean;
  cover?: string;
  summary?: string;
  createdAt?: string;
  body?: string;
}

// =====================
// Activity Types
// =====================
export interface ActivityItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor: string;
  imageColor: string;
  dateRange: string;
  image?: string;
  type: "ongoing" | "longterm";
  showOnHomepage?: boolean;
}

// =====================
// Server Types
// =====================
export interface ServerInfo {
  name: string;
  openTime: string;
  description: string;
  perks: string[];
  bannerImage?: string;
  mainTitle?: string;
  topSubtitle?: string;
  bottomSubtitle?: string;
  detailedPerks?: string[];
}
