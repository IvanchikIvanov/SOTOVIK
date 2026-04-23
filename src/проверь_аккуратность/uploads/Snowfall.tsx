import { useEffect, useState } from 'react';

export default function Snowfall() {
    const [flakes, setFlakes] = useState<{ id: number; left: number; duration: number; delay: number; size: number }[]>([]);

    useEffect(() => {
        // Generate 100 particles for better coverage
        const newFlakes = Array.from({ length: 100 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100, // Random horizontal position %
            duration: Math.random() * 5 + 5, // Random fall duration between 5-10s
            delay: Math.random() * 5, // Random start delay
            size: Math.random() * 3 + 1, // Random size 1-4px
        }));
        setFlakes(newFlakes);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]" aria-hidden="true">
            {flakes.map((flake) => (
                <div
                    key={flake.id}
                    className="absolute bg-white rounded-full opacity-80"
                    style={{
                        left: `${flake.left}%`,
                        top: '-10px',
                        width: `${flake.size}px`,
                        height: `${flake.size}px`,
                        animation: `fall ${flake.duration}s linear infinite`,
                        animationDelay: `-${flake.delay}s`,
                    }}
                />
            ))}
            <style>
                {`
          @keyframes fall {
            0% {
              transform: translateY(-10vh);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            100% {
              transform: translateY(110vh);
              opacity: 0.3;
            }
          }
        `}
            </style>
        </div>
    );
}
