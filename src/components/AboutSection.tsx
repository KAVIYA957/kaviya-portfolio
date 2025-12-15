import { MapPin, GraduationCap, Target, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column - Text */}
          <div className={`space-y-8 ${isVisible ? 'slide-in-left' : 'opacity-0'}`}>
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary" />
              About Me
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Crafting the{" "}
              <span className="gradient-text">Future</span>{" "}
              with Code
            </h2>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a dedicated Computer Science Engineering student with a passion 
                for building intelligent, user-centric solutions. My journey spans 
                from participating in intense 24-hour hackathons to developing 
                real-world AI applications.
              </p>
              <p>
                My expertise lies at the intersection of AI, automation, and 
                full-stack development. I thrive in collaborative environments 
                where innovative thinking meets practical implementation.
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                Chennai, India
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm">
                <Target className="w-4 h-4 text-secondary" />
                Open to Opportunities
              </div>
            </div>
          </div>

          {/* Right Column - Cards */}
          <div className={`space-y-6 ${isVisible ? 'slide-in-right' : 'opacity-0'}`}>
            {/* Education Card */}
            <div className="glass-card-strong p-6 rounded-2xl space-y-4 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-secondary">
                  <GraduationCap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-lg">Education</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    B.E Computer Science Engineering
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <p className="font-medium">Easwari Engineering College</p>
                <div className="flex items-center justify-between mt-2 text-sm text-muted-foreground">
                  <span>Currently Pursuing</span>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                    CGPA: 8.0
                  </span>
                </div>
              </div>
            </div>

            {/* Highlights Card */}
            <div className="glass-card p-6 rounded-2xl space-y-4 hover:scale-[1.02] transition-transform duration-300">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-accent to-primary">
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">Highlights</h3>
                  <p className="text-muted-foreground text-sm mt-1">
                    Key achievements & focus areas
                  </p>
                </div>
              </div>
              
              <ul className="space-y-3 pt-2">
                {[
                  "24-hour hackathon veteran",
                  "AI & ML project development",
                  "Full-stack web applications",
                  "International conference presenter",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
