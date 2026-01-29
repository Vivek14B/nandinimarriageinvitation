// Custom Temple Icon Component
const TempleIcon = ({ className }: { className?: string }) => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        {/* Temple dome/top */}
        <path d="M12 2L4 8h16z" fill="currentColor" opacity="0.2" />
        {/* Temple pillars and structure */}
        <path d="M4 8v14h16V8" />
        <path d="M7 22V10" />
        <path d="M12 22V10" />
        <path d="M17 22V10" />
        {/* Temple entrance */}
        <path d="M9 22v-6h6v6" />
    </svg>
);

export default TempleIcon;
