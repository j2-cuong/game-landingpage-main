import React from 'react';
import navigation from "../data/navigation.json";

// Footer cung cấp thông tin bản quyền, liên kết hỗ trợ và mã QR trợ lý.
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white min-w-[1920px] max-w-[1920px] mx-auto">
      {/* Main Footer Content */}
      <div className="mx-auto px-8 py-12">
        <div className="grid grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <img
                src="/logo-white.png"
                alt="Kiếm Hiệp Thế Giới"
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold">Kiếm Hiệp Thế Giới</span>
            </div>

            <p className="text-gray-400 mb-6 max-w-md">
              Bản quyền thuộc Công ty Công nghệ Giải trí Tây Sơn Cư. Copyright © 1999-2025
            </p>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <span>Cam kết tự quản game online chống nghiện</span>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Hỗ trợ & thông tin</h4>
            <ul className="space-y-2">
              {navigation.footer.supportLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
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
            <p className="text-sm text-gray-400 mb-2">Quét mã để đồng hành trong game</p>

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
              {navigation.footer.bottomLinks.map((link, idx) => (
                <React.Fragment key={idx}>
                  <a href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </a>
                  {idx < navigation.footer.bottomLinks.length - 1 && <span>|</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}



