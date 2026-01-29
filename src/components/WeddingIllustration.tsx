import { motion, Variants, Easing } from "framer-motion";

const WeddingIllustration = () => {
  const easeInOut: Easing = [0.42, 0, 0.58, 1];

  const drawPath: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 2.5, ease: easeInOut },
        opacity: { duration: 0.3 }
      }
    }
  };

  const floatAnimation = {
    y: [0, -8, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: easeInOut
    }
  };
  return (
    <div className="relative w-full max-w-xs mx-auto">
      <motion.svg
        viewBox="0 0 200 280"
        className="w-full h-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* Wedding Cake Base */}
        <motion.path
          d="M40 250 Q40 260 50 260 L150 260 Q160 260 160 250 L160 230 Q160 220 150 220 L50 220 Q40 220 40 230 Z"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1.5"
          variants={drawPath}
        />

        {/* Cake Base Decorations */}
        <motion.path
          d="M50 240 Q60 235 70 240 Q80 245 90 240 Q100 235 110 240 Q120 245 130 240 Q140 235 150 240"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1"
          variants={drawPath}
        />

        {/* Middle Tier */}
        <motion.path
          d="M55 220 L55 180 Q55 170 65 170 L135 170 Q145 170 145 180 L145 220"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1.5"
          variants={drawPath}
        />

        {/* Middle Tier Decorations - Swags */}
        <motion.path
          d="M65 190 Q75 200 85 190 Q95 180 105 190 Q115 200 125 190 Q135 180 145 190"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1"
          variants={drawPath}
        />

        <motion.path
          d="M55 205 Q70 215 85 205 Q100 195 115 205 Q130 215 145 205"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1"
          variants={drawPath}
        />

        {/* Top Tier */}
        <motion.path
          d="M70 170 L70 130 Q70 120 80 120 L120 120 Q130 120 130 130 L130 170"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1.5"
          variants={drawPath}
        />

        {/* Top Tier Decorations */}
        <motion.path
          d="M75 145 Q85 155 95 145 Q105 135 115 145 Q125 155 130 145"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1"
          variants={drawPath}
        />

        {/* Cake Topper Base */}
        <motion.ellipse
          cx="100"
          cy="120"
          rx="20"
          ry="5"
          fill="none"
          stroke="hsl(var(--dusty-rose))"
          strokeWidth="1"
          variants={drawPath}
        />

        {/* Bride Figure */}
        <motion.g animate={floatAnimation}>
          {/* Bride Head */}
          <motion.circle
            cx="90"
            cy="85"
            r="8"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1.5"
            variants={drawPath}
          />

          {/* Bride Veil */}
          <motion.path
            d="M85 80 Q80 75 82 70 Q90 65 98 70 Q100 75 95 80"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1"
            variants={drawPath}
          />

          <motion.path
            d="M82 85 Q75 90 78 100"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1"
            variants={drawPath}
          />

          {/* Bride Dress */}
          <motion.path
            d="M90 93 L90 100 Q85 105 80 118 L100 118 Q95 105 90 100"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1.5"
            variants={drawPath}
          />

          {/* Bride Arms */}
          <motion.path
            d="M88 98 Q95 100 100 95"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1"
            variants={drawPath}
          />
        </motion.g>

        {/* Groom Figure */}
        <motion.g animate={floatAnimation}>
          {/* Groom Head */}
          <motion.circle
            cx="110"
            cy="83"
            r="7"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1.5"
            variants={drawPath}
          />

          {/* Groom Hair/Hat */}
          <motion.path
            d="M105 78 Q110 72 115 78"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1"
            variants={drawPath}
          />

          {/* Groom Body/Suit */}
          <motion.path
            d="M110 90 L110 118"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1.5"
            variants={drawPath}
          />

          {/* Groom Shoulders */}
          <motion.path
            d="M103 95 L110 92 L117 95"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1"
            variants={drawPath}
          />

          {/* Groom Arm reaching to bride */}
          <motion.path
            d="M103 95 Q100 98 98 95"
            fill="none"
            stroke="hsl(var(--dusty-rose))"
            strokeWidth="1"
            variants={drawPath}
          />
        </motion.g>

        {/* Hearts floating */}
        <motion.path
          d="M65 100 Q65 95 70 95 Q75 95 75 100 Q75 105 70 110 Q65 105 65 100"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          variants={drawPath}
        />

        <motion.path
          d="M125 90 Q125 86 129 86 Q133 86 133 90 Q133 94 129 98 Q125 94 125 90"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1"
          variants={drawPath}
        />

        {/* Small Flowers */}
        <motion.circle cx="60" cy="175" r="3" fill="none" stroke="hsl(var(--sage))" strokeWidth="1" variants={drawPath} />
        <motion.circle cx="140" cy="175" r="3" fill="none" stroke="hsl(var(--sage))" strokeWidth="1" variants={drawPath} />
        <motion.circle cx="50" cy="225" r="3" fill="none" stroke="hsl(var(--sage))" strokeWidth="1" variants={drawPath} />
        <motion.circle cx="150" cy="225" r="3" fill="none" stroke="hsl(var(--sage))" strokeWidth="1" variants={drawPath} />

        {/* Decorative leaves */}
        <motion.path
          d="M55 175 Q50 170 45 175 Q50 180 55 175"
          fill="none"
          stroke="hsl(var(--sage))"
          strokeWidth="1"
          variants={drawPath}
        />
        <motion.path
          d="M145 175 Q150 170 155 175 Q150 180 145 175"
          fill="none"
          stroke="hsl(var(--sage))"
          strokeWidth="1"
          variants={drawPath}
        />
      </motion.svg>

      {/* Couple Names */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 2, duration: 0.8 }}
        className="text-center font-elegant text-xl text-foreground mt-4 italic"
      >
        Nandini & Kunal
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 2.3, duration: 0.8 }}
        className="text-center font-body text-xs text-muted-foreground tracking-widest uppercase mt-2"
      >
        Forever Begins
      </motion.p>
    </div>
  );
};

export default WeddingIllustration;
