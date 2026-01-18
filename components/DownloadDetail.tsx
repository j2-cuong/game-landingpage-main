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
        <div className="flex flex-col gap-0">
          <div className="border-b border-[#ebeff0] pb-10 mb-10">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Tải xuống ứng dụng khách
              </h2>

              <div className="flex gap-6 mb-6">
                {downloadInfo.clients.map((client) => (
                  <button
                    key={client.id}
                    className={`w-[252px] h-[105px] bg-gradient-to-b ${client.id === "full" ? "from-red-600 to-red-700 hover:from-red-700 hover:to-red-800" : "from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"} text-white font-medium rounded transition-all shadow-sm flex items-center justify-center`}
                  >
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

          <div className="border-b border-[#ebeff0] pb-6 mb-6">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Phần mềm đề xuất
              </h2>

              <div className="text-sm text-[#8f8f8f] leading-[30px] space-y-2">
                {downloadInfo.recommendedSoftware.map((software, i) => (
                  <p key={software.id}>
                    <span className="font-semibold">
                      {i + 1}. {software.name}：
                    </span>
                    {software.description}
                    <Link
                      href={software.url}
                      className="text-[#c93f28] hover:underline ml-2"
                    >
                      Tải xuống tại đây
                    </Link>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
