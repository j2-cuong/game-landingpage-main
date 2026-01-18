'use client';

import { FC, useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * BackgroundMusic component
 * Triển khai từ mẫu của dự án @bavuong
 * Được tinh chỉnh UI để phù hợp với @landingpage-game
 */
export const BackgroundMusic: FC = () => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Tạo audio element
        const audio = new Audio('/bg-music.mp3');
        audio.volume = 0.5; // Giảm nhẹ âm lượng xuống 50% cho dễ chịu
        audio.loop = true;
        audio.preload = 'auto';

        audioRef.current = audio;

        // Event listeners
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);

        //Cleanup
        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.pause();
            audioRef.current = null;
        };
    }, []);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        if (!hasInteracted) setHasInteracted(true);

        try {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                await audioRef.current.play();
            }
        } catch (error) {
            console.error('Lỗi khi phát nhạc:', error);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            <motion.button
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 ${isPlaying
                    ? 'bg-red-600 text-white'
                    : 'bg-white text-gray-800'
                    }`}
                aria-label={isPlaying ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
            >
                {/* Sóng nhạc khi đang phát */}
                {isPlaying && (
                    <div className="absolute inset-0 rounded-full">
                        <motion.div
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [0.3, 0.1, 0.3],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="absolute inset-0 bg-red-400 rounded-full"
                        />
                    </div>
                )}

                <div className="relative z-10">
                    {isPlaying ? (
                        <Volume2 className="w-6 h-6 animate-pulse" />
                    ) : (
                        <VolumeX className="w-6 h-6" />
                    )}
                </div>
            </motion.button>
        </div>
    );
};
