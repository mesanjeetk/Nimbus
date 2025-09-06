"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Toggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isRippling, setIsRippling] = useState(false);
  const [pop, setPop] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  const handleClick = () => {
    setIsRippling(true);
    setPop(true);
    setTimeout(() => setTheme(isDark ? "light" : "dark"), 350); // sync with ripple
    setTimeout(() => setIsRippling(false), 600);
    setTimeout(() => setPop(false), 600);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`relative inline-flex h-10 w-20 items-center rounded-full transition-all duration-500 overflow-hidden
          ${isDark ? "bg-gradient-to-r from-gray-800 to-gray-700" : "bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-300"}
          shadow-lg group focus:outline-none`}
        aria-label="Toggle theme"
      >
        {/* Ripple animation */}
        {isRippling && (
          <span
            className={`
              absolute left-1/2 top-1/2 w-24 h-24 bg-opacity-40 rounded-full pointer-events-none z-0
              animate-ripple
            `}
            style={{
              background: isDark
                ? "radial-gradient(circle, #60a5fa44 0%, #1e293b00 70%)"
                : "radial-gradient(circle, #fde68a77 0%, #f59e4200 70%)",
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/* Thumb */}
        <span
          className={`
            relative z-10 flex items-center justify-center h-8 w-8 rounded-full shadow-md transition-all duration-500
            ${isDark ? "translate-x-10 bg-gray-700" : "translate-x-2 bg-white"}
            ${pop ? "scale-125" : "scale-100"}
          `}
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-blue-300 drop-shadow-2xl animate-glow-moon" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-600 drop-shadow-lg animate-glow-sun" />
          )}
        </span>

        {/* Subtle animated gradient border */}
        <span
          className={`
            absolute inset-0 rounded-full border-2 pointer-events-none
            ${isDark
              ? "border-blue-400/30 animate-border-fade"
              : "border-yellow-400/40 animate-border-fade"}
          `}
        />

        {/* Pulse aura for light mode */}
        {!isDark && (
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-yellow-300 opacity-30 blur-md animate-pulse pointer-events-none z-0" />
        )}
      </button>

      <style jsx global>{`
        @keyframes ripple {
          0% {
            opacity: 0.3;
            transform: translate(-50%, -50%) scale(0);
          }
          70% {
            opacity: 0.18;
            transform: translate(-50%, -50%) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(1.8);
          }
        }
        .animate-ripple {
          animation: ripple 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes glowSun {
          0%, 100% { filter: drop-shadow(0 0 0px #fde047); }
          60% { filter: drop-shadow(0 0 12px #fde047); }
        }
        .animate-glow-sun {
          animation: glowSun 0.8s;
        }

        @keyframes glowMoon {
          0%, 100% { filter: drop-shadow(0 0 0px #38bdf8); }
          60% { filter: drop-shadow(0 0 10px #38bdf8); }
        }
        .animate-glow-moon {
          animation: glowMoon 0.8s;
        }

        @keyframes borderFade {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        .animate-border-fade {
          animation: borderFade 2.5s infinite;
        }
      `}</style>
    </>
  );
};

export default Toggle;