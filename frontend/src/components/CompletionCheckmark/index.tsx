import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { useRef, useEffect } from "react";

export default function ConfettiEffect() {
    const divRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!divRef.current) return;
        const { top, left, width, height } = divRef.current.getBoundingClientRect();
        confetti({
            particleCount: 100,
            spread: 70,
            origin: {
                x: (left + width / 2) / window.innerWidth,
                y: (top + height / 2) / window.innerHeight,
            },
        });
    }, []);

    return (
        <div className="completion-checkmark">
            <motion.div
                ref={divRef}
                className="w-40 h-40 bg-blue-500 flex items-center justify-center rounded-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
            >
            </motion.div>
        </div>
    );
}