"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * ChatContact component
 * Cung cấp các nút liên hệ nhanh qua Zalo và Facebook Messenger
 * Được đặt cố định ở góc dưới bên phải màn hình
 */
export default function ChatContact() {
    const contacts = [
        {
            id: "zalo",
            name: "Zalo",
            image: "/zalo-icon.webp",
            color: "bg-[#0068ff]",
            href: "https://zalo.me/your_id",
        },
        {
            id: "messenger",
            name: "Messenger",
            image: "/messenger-icon.jpg",
            color: "bg-white", // Messenger gradient is in the image itself
            href: "https://m.me/your_page",
        },
    ];

    return (
        <div className="fixed bottom-20 md:bottom-24 right-4 md:right-6 flex flex-col gap-3 md:gap-4 z-[9999]">
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
                    className={`relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl cursor-pointer group bg-white`}
                    title={`Liên hệ qua ${contact.name}`}
                >
                    {/* Sóng tỏa ra cho Zalo nếu muốn, hoặc chỉ bóng đổ */}
                    <div className="absolute inset-0 rounded-full bg-black/5 group-hover:bg-transparent transition-colors" />

                    <img
                        src={contact.image}
                        alt={contact.name}
                        className="w-full h-full object-cover rounded-full"
                    />

                    {/* Label hiện ra khi hover */}
                    <span className="absolute right-full mr-3 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
                        {contact.name}
                    </span>
                </motion.a>
            ))}
        </div>
    );
}
