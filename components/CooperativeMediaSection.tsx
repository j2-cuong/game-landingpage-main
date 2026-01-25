"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Headphones, Phone } from "lucide-react";
import Link from "next/link";
import mediaPartners from "../data/mediaPartners.json";
import navigation from "../data/navigation.json";
import newsConfig from "../data/newsConfig.json";

interface MediaPartner {
  id: number;
  name: string;
  logo: string | null;
  url: string;
}

/**
 * CooperativeMediaSection renders the cooperative media partners and customer service contact section.
 * Layout: Two-column layout with media partners on left and customer service on right.
 */
export default function CooperativeMediaSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const partners = mediaPartners as MediaPartner[];
  const totalPages = Math.ceil(partners.length / itemsPerPage);
  const currentPartners = partners.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section
      className="w-full bg-[#f5f5f5] py-8 font-kiem-hiep "
      style={{ minWidth: "1890px" }}
    >
      <div className="w-full max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-2 gap-8">
          {/* Left Panel: Đối tác truyền thông */}
          <div className="bg-white p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Đối tác truyền thông
            </h3>

            <div className="relative px-8">
              {/* Navigation Arrow Left */}
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                aria-label="Trang trước"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>

              {/* Logo Grid - 2 rows x 4 columns */}
              <div className="grid grid-cols-4 grid-rows-2 gap-3">
                {currentPartners.map((partner) => (
                  <Link
                    key={partner.id}
                    href={partner.url}
                    className="bg-white border border-gray-200 rounded p-3 h-20 flex items-center justify-center hover:shadow-md transition-shadow group"
                  >
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center">
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center mb-1 group-hover:bg-gray-300 transition-colors">
                          <span className="text-xs text-gray-500 font-bold">
                            {partner.name.charAt(0)}
                          </span>
                        </div>
                        <span className="text-[10px] text-gray-600 text-center leading-tight line-clamp-2">
                          {partner.name}
                        </span>
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Navigation Arrow Right */}
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white border border-gray-300 rounded-full hover:bg-gray-50 transition-colors shadow-sm"
                aria-label="Trang sau"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Right Panel: Liên hệ CSKH */}
          <div className="bg-white p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">
              Liên hệ CSKH
            </h3>

            <div className="space-y-5 mb-6">
              {/* Maintenance Time */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Headphones className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Thời gian bảo trì
                  </p>
                  <p className="text-sm text-gray-600">
                    {newsConfig.sidebar.contact.maintenance}
                  </p>
                </div>
              </div>

              {/* Customer Service Phone */}
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <Phone className="w-5 h-5 text-gray-700" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800 mb-1">
                    Số điện thoại CSKH
                  </p>
                  <p className="text-sm text-gray-600">
                    {newsConfig.sidebar.contact.hotline}
                  </p>
                </div>
              </div>
            </div>

            {/* Links */}
            
          </div>
        </div>
      </div>
    </section>
  );
}
