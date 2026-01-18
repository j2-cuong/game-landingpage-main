"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, UserPlus, CreditCard, Star } from "lucide-react";
import {
  QUICK_ACTIONS,
  BANNERS,
  NEWS_TABS,
  NEWS_DATA,
  ACTIVITIES_ONGOING,
  ACTIVITIES_LONGTERM,
  type QuickAction,
} from "../data/newsActivity";
import newsConfig from "../data/newsConfig.json";
import { useRouter } from "next/navigation";

/** Helper function to get icon component by name. */
function getQuickActionIcon(
  iconName: QuickAction["iconName"],
  size: number = 28,
) {
  const icons = {
    download: <Download size={size} />,
    mobile: <Smartphone size={size} />,
    register: <UserPlus size={size} />,
    topup: <CreditCard size={size} />,
  };
  return icons[iconName];
}

/** Renders a single quick action button with icon and gradient styling. */
function ActionButton({ item }: { item: QuickAction }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(item.href);
  };
  return (
    <motion.button
      whileHover={{ scale: 1.02, x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={`w-full h-18 mb-3 rounded flex items-center cursor-pointer px-2 relative overflow-hidden group border-l-4 ${item.gradient} ${item.background} `}
      style={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.2)" }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <div className="text-white mr-4 drop-shadow-md">
        {getQuickActionIcon(item.iconName)}
      </div>
      <div className="flex flex-col items-start font-kiem-hiep text-white">
        {item.label}
      </div>
    </motion.button>
  );
}

/** Renders a tab item for the news section with active indicator. */
function TabItem({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative px-4 py-2 font-bold transition-colors font-kiem-hiep text-sm ${
        active ? "text-[#b92b27]" : "text-gray-500 hover:text-gray-700"
      }`}
    >
      {active && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#b92b27]">
          ◆
        </span>
      )}
      {label}
      {active && (
        <motion.div
          layoutId="newsTabUnderline"
          className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#b92b27]"
        />
      )}
    </button>
  );
}

/** Main news and activity section for landing page content. */
export default function NewsActivitySection() {
  const [activeNewsTab, setActiveNewsTab] = useState(0);
  const [activeActivityTab, setActiveActivityTab] = useState<
    "ongoing" | "longterm"
  >("ongoing");
  const [activeBanner, setActiveBanner] = useState(0);

  // Tự động chuyển banner mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentBanner = BANNERS[activeBanner];

  return (
    <section className="w-full  flex justify-center font-sans text-[#2c3e50]">
      <div className="w-full max-w-[1200px] grid grid-cols-12 gap-1">
        <div className="col-span-2 flex flex-col z-10">
          {QUICK_ACTIONS.map((action) => (
            <ActionButton key={action.id} item={action} />
          ))}
        </div>

        <div className="col-span-6 relative group overflow-hidden rounded shadow-lg h-[340px] border border-gray-200">
          <div
            className="w-full h-full bg-gray-800 relative"
            style={{
              backgroundImage: `url(${currentBanner.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="absolute bottom-4 left-6 flex space-x-2 z-20">
              {BANNERS.map((banner, idx) => (
                <button
                  key={banner.id}
                  onClick={() => setActiveBanner(idx)}
                  aria-label={`Chọn banner ${idx + 1}`}
                  className={`transition-all ${idx === activeBanner ? "w-6 bg-[#b92b27]" : "w-2 bg-white/60"} h-1.5 rounded-full`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 bg-white border border-gray-200 rounded shadow-sm h-[340px] flex flex-col">
          <div className="flex items-center justify-between px-2 pt-2 border-b border-gray-100 bg-gray-50/50">
            <div className="flex space-x-0">
              {NEWS_TABS.map((tab, idx) => (
                <TabItem
                  key={tab}
                  label={tab}
                  active={idx === activeNewsTab}
                  onClick={() => setActiveNewsTab(idx)}
                />
              ))}
            </div>
            <button className="text-xl text-gray-400 hover:text-[#b92b27] mr-2">
              +
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto">
            <div className="mb-3 pb-3 border-b border-dashed border-gray-200">
              <h3 className="font-bold text-xl text-[#b92b27] truncate hover:underline cursor-pointer">
                {newsConfig.hotNewsTitle}
              </h3>
            </div>

            <ul className="space-y-3">
              {NEWS_DATA.map((news) => (
                <li
                  key={news.id}
                  className="flex items-center justify-between text-sm group cursor-pointer"
                >
                  <div className="flex items-center flex-1 min-w-0">
                    <span
                      className={`text-xs mr-2 font-bold font-kiem-hiep ${news.category === "Thông báo" ? "text-blue-600" : "text-gray-500"}`}
                    >
                      [{news.category}]
                    </span>
                    <span className="truncate group-hover:text-[#b92b27] transition-colors text-gray-700 font-medium">
                      {news.title}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 ml-2 font-sans">
                    {news.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="col-span-12 bg-white p-4">
          <div className="flex items-center mb-4 border-l-4 border-[#b92b27] pl-3">
            <h2 className="text-2xl font-bold font-kiem-hiep text-gray-800 mr-6">
              Hoạt động hàng ngày
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-2">
            {(activeActivityTab === "ongoing"
              ? ACTIVITIES_ONGOING
              : ACTIVITIES_LONGTERM
            )
              .filter((act) => act.showOnHomepage !== false)
              .slice(0, 8)
              .map((act) => (
                <motion.div
                  key={act.id}
                  whileHover={{ y: -2 }}
                  className="bg-white rounded border border-gray-200 shadow-sm overflow-hidden group cursor-pointer"
                >
                  <div
                    className={`h-42 ${act.imageColor} relative overflow-hidden`}
                  >
                    {act.image ? (
                      <>
                        <img
                          src={act.image}
                          alt={act.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      </>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                        <div className="w-full h-full flex items-center justify-center opacity-50">
                          <Star className="text-white w-12 h-12" />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-bold font-kiem-hiep text-lg leading-tight mb-1 truncate group-hover:text-[#b92b27]">
                      {act.title}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2 truncate">
                      {act.subtitle}
                    </p>
                    <div
                      className={`text-xs font-bold border border-current px-2 py-0.5 inline-block rounded-sm ${act.statusColor}`}
                    >
                      {act.dateRange}
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
