import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  minDuration?: number;
}

const LoadingScreen = ({ onLoadingComplete, minDuration = 2000 }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / minDuration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(onLoadingComplete, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [minDuration, onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-hero-gradient transition-opacity duration-500 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Logo avec animation pulse */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse-slow scale-150" />
        <img
          src={logo}
          alt="DJEUTCH ACADEMY"
          className="relative h-28 md:h-36 w-auto animate-float drop-shadow-2xl"
        />
      </div>

      {/* Nom du centre */}
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight animate-fade-in">
        DJEUTCH ACADEMY
      </h1>
      <p className="text-white/80 text-lg mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        Centre de Formation IT
      </p>

      {/* Barre de progression */}
      <div className="w-64 md:w-80 h-1.5 bg-white/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-white rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Indicateur de chargement */}
      <div className="mt-6 flex items-center gap-2">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <span className="text-white/70 text-sm ml-2">Chargement...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
