import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const Logo = ({ className, size = "md", animated = true }: LogoProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-14 h-14",
  };

  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses[size],
        animated && "scale-in",
        className
      )}
    >
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-xl bg-primary/30 blur-xl",
        animated && "pulse-glow"
      )} />
      
      {/* Main logo container */}
      <div className="relative w-full h-full rounded-xl bg-gradient-to-br from-primary via-secondary to-accent p-[2px]">
        <div className="w-full h-full rounded-xl bg-background flex items-center justify-center">
          {/* KK Letters */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/4 h-3/4"
          >
            {/* First K */}
            <path
              d="M6 8V32M6 20L14 8M6 20L14 32"
              stroke="url(#gradient1)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Second K */}
            <path
              d="M22 8V32M22 20L30 8M22 20L30 32"
              stroke="url(#gradient2)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Connecting element */}
            <circle cx="20" cy="20" r="2" fill="url(#gradient3)" />
            
            <defs>
              <linearGradient id="gradient1" x1="6" y1="8" x2="14" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(221, 83%, 53%)" />
                <stop offset="1" stopColor="hsl(270, 70%, 60%)" />
              </linearGradient>
              <linearGradient id="gradient2" x1="22" y1="8" x2="30" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(270, 70%, 60%)" />
                <stop offset="1" stopColor="hsl(180, 70%, 50%)" />
              </linearGradient>
              <linearGradient id="gradient3" x1="18" y1="18" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(180, 70%, 50%)" />
                <stop offset="1" stopColor="hsl(221, 83%, 53%)" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Logo;
