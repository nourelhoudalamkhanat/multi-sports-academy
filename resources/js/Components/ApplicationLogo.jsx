export default function ApplicationLogo({ className }) {
    return (
        <div className={className}>
            <svg viewBox="0 0 220 60" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <text
                    x="10"
                    y="40"
                    fill="#FBBF24"
                    fontSize="34"
                    fontWeight="bold"
                    fontFamily="Arial"
                >
                    MSA
                </text>

                <text
                    x="95"
                    y="26"
                    fill="#FFFFFF"
                    fontSize="12"
                    fontFamily="Arial"
                >
                    Académie
                </text>

                <text
                    x="95"
                    y="44"
                    fill="#1D4ED8"
                    fontSize="12"
                    fontFamily="Arial"
                >
                    Multisports
                </text>
            </svg>
        </div>
    );
}