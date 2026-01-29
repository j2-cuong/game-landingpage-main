"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

/**
 * ChatContact component
 * - Desktop: Hiển thị danh sách các nút liên hệ ở góc phải.
 * - Mobile: Hiển thị 1 nút Action Button, click vào mở Modal chọn Zalo/Messenger.
 */
export default function ChatContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      id: "zalo",
      name: "Chat Zalo",
      image: "/zalo-icon.webp",
      color: "bg-[#0068ff]",
      href: "https://zalo.me/your_id",
    },
    {
      id: "messenger",
      name: "Chat Messenger",
      image: "/messenger-icon.jpg",
      color: "bg-white",
      href: "https://m.me/your_page",
    },
  ];

  return (
    <>
      {/* --- DESKTOP VIEW --- */}
      <div className="hidden md:flex fixed bottom-24 right-6 flex-col gap-4 z-[9999]">
        {contacts.map((contact) => (
          <motion.a
            key={contact.id}
            href={contact.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer group bg-white overflow-hidden"
            title={contact.name}
          >
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />

            <img
              src={contact.image}
              alt={contact.name}
              className="w-full h-full object-cover"
            />

            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
              {contact.name}
            </span>
          </motion.a>
        ))}
      </div>

      {/* --- MOBILE VIEW --- */}
      {/* Floating Action Button */}
      {!isOpen && (
        <motion.div
          className="md:hidden fixed bottom-20 right-4 z-[9990]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <button
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl text-white animate-pulse hover:animate-none active:scale-95 transition-transform border-2 border-white"
          >
            <MessageCircle size={28} />
          </button>
        </motion.div>
      )}

      {/* Mobile Modal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 md:hidden"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              className="relative w-full max-w-sm flex flex-col gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md active:scale-90 transition-transform"
              >
                <X size={24} />
              </button>

              <div className="text-center text-white font-bold text-lg mb-2">
                Chọn kênh hỗ trợ
              </div>

              {contacts.map((contact) => (
                <a
                  key={contact.id}
                  href={contact.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-lg active:scale-98 transition-transform"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden shrink-0">
                    <img
                      src={contact.image}
                      alt={contact.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-gray-900 text-lg">
                      {contact.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Hỗ trợ trực tuyến 24/7
                    </span>
                  </div>
                </a>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
