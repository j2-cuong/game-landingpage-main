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
            <h1 className="text-3xl font-extrabold text-slate-900 uppercase tracking-wide">Tải Game Kiếm Hiệp</h1>
          </div>
          <div className="text-sm text-slate-400 font-sans font-medium uppercase tracking-widest">
            Sovereign Edition
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-10 flex flex-col gap-12">

            {/* Main Client Section */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <span className="text-red-600">◆</span> Tải xuống ứng dụng khách
              </h2>

              <div className="grid grid-cols-2 gap-8">
                {downloadInfo.clients.map((client) => (
                  <div key={client.id} className="flex flex-col gap-6 p-6 rounded-lg bg-slate-50 border border-slate-100 group transition-all hover:bg-white hover:shadow-xl hover:-translate-y-1">
                    <button
                      className={`w-full h-24 bg-gradient-to-br ${client.id === "full" ? "from-red-600 via-red-700 to-red-800 shadow-red-200" : "from-blue-600 via-blue-700 to-blue-800 shadow-blue-200"} text-white font-bold rounded-lg transition-all shadow-lg flex items-center justify-center gap-3 group-hover:scale-[1.02] active:scale-95`}
                    >
                      <Download size={28} className="animate-bounce" />
                      <span className="text-2xl uppercase tracking-wider">Tải xuống {client.type}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-y-3 gap-x-6 text-sm">
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-sans text-[10px] uppercase font-bold tracking-tighter">Phiên bản</span>
                        <span className="text-slate-700 font-bold">{client.version}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-sans text-[10px] uppercase font-bold tracking-tighter">Kích thước</span>
                        <span className="text-slate-700 font-bold">{client.size}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400 font-sans text-[10px] uppercase font-bold tracking-tighter">Ngày cập nhật</span>
                        <span className="text-slate-700 font-bold">{client.updateDate}</span>
                      </div>
                      <div className="flex flex-col col-span-2">
                        <span className="text-slate-400 font-sans text-[10px] uppercase font-bold tracking-tighter">Mã MD5 (Bảo mật)</span>
                        <span className="text-slate-500 break-all font-mono text-[11px] leading-tight mt-1">{client.md5}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Software */}
            <div className="pt-10 border-t border-slate-50">
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
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
