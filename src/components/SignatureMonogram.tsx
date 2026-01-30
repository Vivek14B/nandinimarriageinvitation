import { motion } from "framer-motion";

const SignatureMonogram = () => {
    return (
        <div className="flex justify-center items-center py-6 relative">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Gold Foil Logo */}
                <img
                    src="/nk-gold-monogram-v2.png"
                    alt="N K Gold Signature Monogram"
                    className="w-28 h-auto object-contain mix-blend-multiply opacity-90"
                />
            </motion.div>
        </div>
    );
};

export default SignatureMonogram;
