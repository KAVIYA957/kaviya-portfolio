import { ArrowDown, Download, FolderOpen, Sparkles, Code2, Brain, Cloud } from "lucide-react";
import { useEffect, useState } from "react";

const floatingIcons = [
  { Icon: Brain, delay: 0, x: "10%", y: "20%" },
  { Icon: Code2, delay: 1, x: "85%", y: "25%" },
  { Icon: Cloud, delay: 2, x: "75%", y: "70%" },
  { Icon: Sparkles, delay: 0.5, x: "15%", y: "65%" },
];

const HeroSection = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtitles = ["CSE Student", "AI & Full-Stack Developer", "Problem Solver"];
  const [currentSubtitle, setCurrentSubtitle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSubtitle((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-blob animation-delay-4000" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:60px_60px] opacity-30" />
        
        {/* Noise texture */}
        <div className="absolute inset-0 noise-bg" />
      </div>

      {/* Floating Icons */}
      {mounted && floatingIcons.map(({ Icon, delay, x, y }, index) => (
        <div
          key={index}
          className="absolute hidden md:flex items-center justify-center w-12 h-12 rounded-xl glass-card floating-animation opacity-60"
          style={{
            left: x,
            top: y,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon className="w-6 h-6 text-primary" />
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <div className={`space-y-8 ${mounted ? 'fade-in-up' : 'opacity-0'}`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for Internships & Projects
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="text-foreground">Kaviya</span>{" "}
            <span className="gradient-text">K</span>
          </h1>

          {/* Animated Subtitle */}
          <div className="h-8 overflow-hidden">
            <p 
              key={currentSubtitle}
              className="text-xl md:text-2xl font-medium text-muted-foreground fade-in-up"
            >
              {subtitles[currentSubtitle]}
            </p>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
            Passionate about building intelligent solutions through AI, automation, 
            and full-stack development. Experienced in hackathons and real-world 
            problem-solving with a focus on innovation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#projects"
              className="group flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 hover:scale-105"
            >
              <FolderOpen className="w-5 h-5" />
              View Projects
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
            <a
              href={`${import.meta.env.BASE_URL}Kaviya_Resume.pdf`}
              download="Kaviya_K_Resume.pdf"
              className="group flex items-center gap-2 px-8 py-4 rounded-full glass-card border border-border/50 font-semibold hover:border-primary/50 transition-all duration-300 hover:scale-105"
            >
              <Download className="w-5 h-5" />
              Download Resume
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm">Scroll to explore</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
