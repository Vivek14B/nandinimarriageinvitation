import { motion } from "framer-motion";

const SignatureMonogram = () => {
    return (
        <div className="flex justify-center items-center py-6 relative">
            <motion.div
                className="relative overflow-hidden rounded-full p-2"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Gold Foil Logo */}
                <img
                    src="/nk-gold-monogram.png"
                    alt="N & K Gold Signature Monogram"
                    className="w-48 h-auto object-contain mix-blend-multiply"
                />

                {/* Metallic Shimmer Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent"
                    animate={{
                        x: ['-200%', '200%'],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: "linear",
                        repeatDelay: 2
                    }}
                    style={{ skewX: -20 }}
                />
            </motion.div>
        </div>
    );
};

export default SignatureMonogram;
