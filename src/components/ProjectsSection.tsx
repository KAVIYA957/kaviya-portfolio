import { useEffect, useRef, useState } from "react";
import { ExternalLink, Github, Leaf, Users, Sparkles } from "lucide-react";

const projects = [
  {
    title: "AI-Driven Plant Disease Detection",
    subtitle: "Climate-Smart Advisory App",
    description: "A comprehensive hackathon-built full-stack AI solution for agricultural intelligence with real-time climate integration.",
    features: [
      "Image classification for disease detection",
      "Climate-based treatment timing",
      "Smart irrigation reminders",
      "Weather hotspot alerts",
    ],
    techStack: ["React.js", "Node.js", "Prisma", "Supabase", "Weather API", "AI Models"],
    icon: Leaf,
    gradient: "from-green-500 to-emerald-600",
    accentColor: "text-green-500",
  },
  {
    title: "AI-Based Facial Recognition",
    subtitle: "Customer Loyalty System",
    description: "Innovative cardless customer recognition system powered by advanced facial recognition technology.",
    features: [
      "Automated loyalty rewards",
      "Personalized offers engine",
      "Staff alert system",
      "AI-driven recommendations",
    ],
    techStack: ["Python", "OpenCV", "Flask", "Supabase", "React.js", "Face Recognition API"],
    icon: Users,
    gradient: "from-violet-500 to-purple-600",
    accentColor: "text-violet-500",
  },
];

const ProjectsSection = () => {
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
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute left-0 top-1/4 w-1/3 h-1/2 bg-gradient-to-r from-secondary/10 to-transparent blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Featured Work
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Projects & <span className="gradient-text">Innovations</span>
          </h2>
          <p className="text-muted-foreground">
            Real-world AI solutions built during hackathons and internships
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group relative ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-all duration-500`} />
              
              {/* Card */}
              <div className="relative h-full glass-card-strong rounded-3xl overflow-hidden border border-border/50 group-hover:border-primary/30 transition-all duration-500 group-hover:scale-[1.01]">
                {/* Header with gradient */}
                <div className={`relative h-48 bg-gradient-to-br ${project.gradient} p-6 flex flex-col justify-between`}>
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]" />
                  
                  {/* Icon */}
                  <div className="relative w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <project.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Title */}
                  <div className="relative">
                    <p className="text-white/80 text-sm font-medium">{project.subtitle}</p>
                    <h3 className="font-display font-bold text-xl text-white mt-1">{project.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-sm">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient}`} />
                        <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-muted/50 text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-2">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium hover:border-primary/50 transition-colors">
                      <Github className="w-4 h-4" />
                      Code
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium hover:shadow-lg transition-all">
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
