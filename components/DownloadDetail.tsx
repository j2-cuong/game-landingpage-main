"use client";
import Link from "next/link";
import { Download } from "lucide-react";
import downloadInfo from "../data/downloadInfo.json";

/**
 * DownloadDetail component renders the download page based on JSON data with premium styling.
 */
export default function DownloadDetail() {
  return (
    <section className="w-full flex justify-center bg-[#f8fafc] py-12 font-kiem-hiep">
      <div className="w-[1200px] flex flex-col gap-8">
        {/* Title Card */}
        <div className="flex items-center justify-between bg-white p-6 rounded-lg shadow-sm border border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-red-600 rounded-full"></div>
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-wide">Tải Game</h1>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-10 flex flex-col gap-12">

            {/* Main Client Table Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-red-600">◆</span> Thông Tin Tải Game
              </h2>

              <div className="overflow-hidden border border-slate-100 rounded-lg shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-sans text-sm uppercase tracking-wider">
                      <th className="px-8 py-5 font-bold">Phiên bản</th>
                      <th className="px-8 py-5 font-bold text-center">Dung lượng & Cập nhật</th>
                      <th className="px-8 py-5 font-bold text-right">Tải Xuống</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {downloadInfo.clients.map((client) => (
                      <tr key={client.id} className="group hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-slate-800">{client.version}</span>
                            <span className="text-slate-400 text-sm font-sans uppercase tracking-tighter">({client.type})</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-center">
                          <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-sans text-sm font-medium">
                            <span>{client.size}</span>
                            <span className="text-slate-300">|</span>
                            <span>{client.updateDate}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-bold text-white transition-all shadow-md hover:shadow-lg active:scale-95 ${client.id === "full"
                              ? "bg-red-600 hover:bg-red-700 shadow-red-100"
                              : "bg-slate-700 hover:bg-slate-800 shadow-slate-200"
                              }`}
                          >
                            <Download size={18} className="animate-bounce" />
                            <span className="uppercase tracking-wide text-sm">Tải Xuống Ngay</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-slate-400 text-sm italic font-sans px-2">
                * Lưu ý: Vui lòng kiểm tra dung lượng trống của thiết bị trước khi tiến hành tải và cài đặt bản cập nhật mới nhất.
              </p>
            </div>

            {/* Recommended Software */}
            {/* <div className="pt-10 border-t border-slate-50">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2 mb-8">
                <span className="text-red-600">◆</span> Phần mềm đề xuất
              </h2>

              <div className="grid grid-cols-1 gap-4">
                {downloadInfo.recommendedSoftware.map((software, i) => (
                  <div key={software.id} className="flex items-center justify-between p-5 rounded-lg border border-slate-50 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-lg">{software.name}</p>
                        <p className="text-slate-400 text-sm font-sans">{software.description}</p>
                      </div>
                    </div>
                    <Link
                      href={software.url}
                      className="flex items-center gap-2 bg-white border border-red-200 text-red-600 px-6 py-2.5 rounded-lg font-bold hover:bg-red-600 hover:text-white transition-all shadow-sm"
                    >
                      <Download size={18} />
                      Tải xuống
                    </Link>
                  </div>
                ))}
              </div>
            </div> */}

          </div>
        </div>
      </div>
    </section>
  );
}
