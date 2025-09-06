"use client"
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const Toggle = () => {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex h-9 w-16 items-center rounded-full transition-all duration-500 
        ${isDark ? "bg-gray-800" : "bg-yellow-400"}
        ${isDark ? "shadow-inner" : "shadow-lg"}
      `}
    >
      <span
        className={`flex items-center justify-center h-7 w-7 transform rounded-full transition-all duration-500 
          ${isDark ? "translate-x-8 bg-gray-700" : "translate-x-1 bg-white"} 
          ${isDark ? "shadow-md" : "shadow-md"}
        `}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-blue-300 transition-transform duration-500" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-600 transition-transform duration-500 scale-110" />
        )}
      </span>

      {!isDark && (
        <span className="absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-yellow-300 opacity-40 blur-md animate-pulse pointer-events-none" />
      )}
    </button>
  );
};

export default Toggle;
