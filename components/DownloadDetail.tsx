"use client";
import Link from "next/link";
import { useState } from "react";
import downloadInfo from "../data/downloadInfo.json";

/**
 * DownloadDetail component renders the download page based on JSON data.
 */
export default function DownloadDetail() {
  const [activeTab, setActiveTab] = useState("client");

  return (
    <section className="w-full flex justify-center bg-white py-10 font-kiem-hiep">
      <div className="w-[1200px] bg-white">
        {/* Header with Tabs */}
        <div className="border-b border-[#ebeff0] pb-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex gap-0">
              <button
                onClick={() => setActiveTab("client")}
                className={`px-[52px] py-3 text-xl transition-colors ${activeTab === "client"
                  ? "bg-white text-[#dd201e] border-b-2 border-[#de1d1e]"
                  : "text-[#707477] hover:text-[#dd201e]"
                  }`}
              >
                Tải xuống máy khách
              </button>
              <button
                onClick={() => setActiveTab("version")}
                className={`px-[47px] py-3 text-xl transition-colors ${activeTab === "version"
                  ? "bg-white text-[#dd201e] border-b-2 border-[#de1d1e]"
                  : "text-[#707477] hover:text-[#dd201e]"
                  }`}
              >
                Tải xuống phiên bản
              </button>
            </div>

            {/* Breadcrumb */}
            <div className="flex items-center text-sm text-[#ababab] gap-1">
              <span>Vị trí của bạn：</span>
              <Link href="/" className="hover:text-[#dd201e]">
                Trang chủ
              </Link>
              <span>&gt;</span>
              <Link href="/download" className="hover:text-[#dd201e]">
                Khu vực tải xuống
              </Link>
              <span>&gt;</span>
              <span className="text-[#666666]">Máy khách</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-0">
          {/* PC Client Download Section */}
          <div className="border-b border-[#ebeff0] pb-10 mb-10">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">{downloadInfo.pcApp.title}</h2>

              <div className="flex gap-6 mb-6">
                <button className="w-[252px] h-[105px] bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded transition-all shadow-sm flex items-center justify-center">
                  <span className="text-lg">Tải xuống trình khởi chạy</span>
                </button>
                <button className="w-[252px] h-[105px] bg-gradient-to-b from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium rounded transition-all shadow-sm flex items-center justify-center">
                  <span className="text-lg">Tải xuống game đám mây</span>
                </button>
              </div>

              <div className="flex gap-6">
                <div className="w-[252px]">
                  <div className="text-sm text-[#ababab] leading-[30px]">
                    <p>Phiên bản：{downloadInfo.pcApp.version}</p>
                    <p>Kích thước：{downloadInfo.pcApp.size}</p>
                    <p>Ngày cập nhật：{downloadInfo.pcApp.updateDate}</p>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-start gap-6">
                    <div className="w-[146px]">
                      <div className="bg-white p-2 rounded border border-gray-200 mb-2">
                        <div className="w-full aspect-square bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs text-gray-400">QR Code</span>
                        </div>
                      </div>
                      <p className="text-sm text-[#ababab] text-center leading-[30px]">{downloadInfo.pcApp.qrNote}</p>
                    </div>

                    <div className="flex-1">
                      <div className="text-sm text-[#ababab] leading-[30px] mb-2">
                        <span>Phiên bản web：</span>
                        <Link href={downloadInfo.pcApp.webVersionUrl} className="text-[#3c6c9e] hover:underline">
                          Nhấp vào đây
                        </Link>
                        <span className="ml-2">Chi tiết chức năng：</span>
                        <Link href={downloadInfo.pcApp.functionDetailUrl} className="text-[#3c6c9e] hover:underline">
                          Nhấp vào đây
                        </Link>
                      </div>
                      <p className="text-sm text-[#ababab] leading-5 whitespace-pre-line">
                        {downloadInfo.pcApp.androidNote}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Kiếm Hiệp Tiểu Thanh Section */}
          <div className="border-b border-[#ebeff0] pb-10 mb-10">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">{downloadInfo.miniApp.title}</h2>

              <div className="flex gap-6">
                <div className="w-[146px]">
                  <div className="bg-white p-2 rounded border border-gray-200 mb-2">
                    <div className="w-full aspect-square bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">QR Code</span>
                    </div>
                  </div>
                  <p className="text-sm text-[#8f8f8f] text-center leading-[17px]">Tải xuống Android</p>
                </div>

                <div className="flex-1">
                  <div className="text-sm text-[#8f8f8f] leading-[30px] space-y-2">
                    {downloadInfo.miniApp.description.split('\n').map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                    <p className="font-bold">Phiên bản：{downloadInfo.miniApp.version}</p>
                    <p className="font-bold">Kích thước APP：{downloadInfo.miniApp.size}</p>
                    <p className="font-bold">Ngày cập nhật：{downloadInfo.miniApp.updateDate}</p>
                  </div>
                  <p className="text-sm text-[#8f8f8f] leading-[17px] mt-2 italic">
                    {downloadInfo.miniApp.androidNote}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quản lý game Tây Sơn Cư Section */}
          <div className="border-b border-[#ebeff0] pb-10 mb-10">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">{downloadInfo.managerApp.title}</h2>

              <div className="flex gap-6 mb-6">
                <div className="w-[146px]">
                  <div className="bg-white p-2 rounded border border-gray-200 mb-2">
                    <div className="w-full aspect-square bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-400">QR Code</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex gap-6 mb-6">
                    <button className="w-[218px] h-[62px] bg-gradient-to-b from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded transition-all shadow-sm flex items-center justify-center">
                      <span>Tải xuống iOS</span>
                    </button>
                    <button className="w-[218px] h-[62px] bg-gradient-to-b from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium rounded transition-all shadow-sm flex items-center justify-center">
                      <span>Tải xuống Android</span>
                    </button>
                  </div>

                  <div className="text-sm text-[#8f8f8f] leading-[30px] space-y-2">
                    {downloadInfo.managerApp.features.map((feature, i) => (
                      <p key={i}>{feature}</p>
                    ))}
                    <p className="font-bold">Các game được hỗ trợ hiện tại</p>
                    <p className="whitespace-pre-line">{downloadInfo.managerApp.supportedGames}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tải xuống ứng dụng khách Section */}
          <div className="border-b border-[#ebeff0] pb-10 mb-10">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Tải xuống ứng dụng khách</h2>

              <div className="flex gap-6 mb-6">
                {downloadInfo.clients.map((client) => (
                  <button key={client.id} className={`w-[252px] h-[105px] bg-gradient-to-b ${client.id === 'full' ? 'from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white font-medium rounded transition-all shadow-sm flex items-center justify-center`}>
                    <span className="text-lg">Tải xuống {client.type}</span>
                  </button>
                ))}
              </div>

              <div className="flex gap-6">
                {downloadInfo.clients.map((client) => (
                  <div key={client.id} className="w-[252px]">
                    <div className="text-sm text-[#ababab] leading-[30px]">
                      <p>Phiên bản：{client.version}</p>
                      <p>Kích thước：{client.size}</p>
                      <p>Ngày cập nhật：{client.updateDate}</p>
                      <p>Mã MD5：</p>
                      <p className="break-all">{client.md5}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Phần mềm đề xuất Section */}
          <div className="border-b border-[#ebeff0] pb-6 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Phần mềm đề xuất</h2>

              <div className="text-sm text-[#8f8f8f] leading-[30px] space-y-2">
                {downloadInfo.recommendedSoftware.map((software, i) => (
                  <p key={software.id}>
                    <span className="font-semibold">{i + 1}. {software.name}：</span>
                    {software.description}
                    <Link href={software.url} className="text-[#c93f28] hover:underline ml-2">
                      Tải xuống tại đây
                    </Link>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="pb-10">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Câu hỏi thường gặp</h2>

              <div className="text-sm text-[#8f8f8f] leading-[30px] space-y-2">
                {downloadInfo.faq.map((item, i) => (
                  <div key={item.id}>
                    <p>
                      <span className="font-semibold">{i + 1}. {item.question}：</span>
                      {item.answer && <><br />{item.answer}</>}
                      {item.url && (
                        <Link href={item.url} className="text-[#c93f28] hover:underline ml-2">
                          Tải xuống tại đây
                        </Link>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

