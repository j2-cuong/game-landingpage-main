import React from "react";
import navigation from "../data/navigation.json";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white min-w-[1890px] max-w-[1890px] mx-auto">
      {/* Main Footer Content */}
      <div className="mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <span className="text-xl font-bold">
                Kiếm thế PC phiên bản 2009
              </span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ trợ & thông tin</h4>
            <ul className="space-y-2">
              {navigation.footer.supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* QR Code */}
          <div className="text-left">
            <h4 className="text-lg font-semibold mb-4">Trợ lý Kiếm Hiệp</h4>
            <div className="mb-4">
              <img
                src="/qr-code.png"
                alt="QR Trợ lý Kiếm Hiệp"
                className="w-24 h-24 mx-0"
              />
            </div>
            <p className="text-sm text-gray-400 mb-2">
              Quét mã để đồng hành trong game
            </p>

            {/* Status Indicators */}
            <div className="flex justify-start space-x-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              <div className="w-4 h-2 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-0">
              {/* Certifications */}
              <img
                src="/certification-1.png"
                alt="Chứng nhận 1"
                className="h-8 w-auto"
              />
              <img
                src="/certification-2.png"
                alt="Chứng nhận 2"
                className="h-8 w-auto"
              />
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Bảo trì: Thứ Ba hàng tuần 7:30 - 10:30</span>
              <span>|</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
