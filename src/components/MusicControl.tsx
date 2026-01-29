import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

interface MusicControlProps {
    isPlaying: boolean;
    onToggle: () => void;
}

const MusicControl = ({ isPlaying, onToggle }: MusicControlProps) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={onToggle}
            className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-elegant hover:scale-110 transition-transform duration-300 group"
            aria-label={isPlaying ? "Pause music" : "Play music"}
        >
            {isPlaying ? (
                <Volume2 className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            ) : (
                <VolumeX className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            )}
        </motion.button>
    );
};

export default MusicControl;
