import { useEffect, useRef, useState } from "react";
import { Code, Globe, Brain, Users } from "lucide-react";

const skillCategories = [
  {
    title: "Programming",
    icon: Code,
    color: "from-primary to-secondary",
    skills: ["Python", "Core Java", "C"],
  },
  {
    title: "Web & Full Stack",
    icon: Globe,
    color: "from-secondary to-accent",
    skills: ["React.js", "Node.js", "Flask"],
  },
  {
    title: "AI & Automation",
    icon: Brain,
    color: "from-accent to-primary",
    skills: ["AI Concepts", "Image Classification", "Facial Recognition"],
  },
  {
    title: "Soft Skills",
    icon: Users,
    color: "from-primary via-secondary to-accent",
    skills: ["Communication", "Teamwork", "Time Management", "Willingness to Learn"],
  },
];

const SkillsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary" />
            Technical Expertise
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-muted-foreground">
            A comprehensive toolkit for building modern, intelligent applications
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`group relative ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500`} />
              
              {/* Card */}
              <div className="relative h-full glass-card-strong p-6 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-[1.02]">
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.color} mb-4`}>
                  <category.icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-lg mb-4">
                  {category.title}
                </h3>

                {/* Skills */}
                <div className="space-y-2">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-3 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${category.color}`} />
                      {skill}
                    </div>
                  ))}
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${category.color} opacity-5 rounded-bl-full`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Badges */}
        <div className={`mt-16 text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <p className="text-sm text-muted-foreground mb-6">Also experienced with</p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Supabase", "Prisma", "OpenCV", "Weather API", "Git", "VS Code"].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full glass-card text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
