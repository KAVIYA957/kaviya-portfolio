import { useEffect, useRef, useState } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";

const certifications = [
  {
    title: "Python Full Stack Development",
    issuer: "Professional Certification",
    year: "2025",
    type: "certification",
  },
  {
    title: "IoT Fundamentals",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "certification",
  },
  {
    title: "Industry 4.0",
    issuer: "Cisco Networking Academy",
    year: "2025",
    type: "certification",
  },
  {
    title: "Core Java",
    issuer: "Infosys Certified",
    year: "2025",
    type: "certification",
  },
  {
    title: "Heal Hub - International Conference",
    issuer: "Research Presentation",
    year: "2025",
    type: "achievement",
  },
  {
    title: "YUVA AI THON",
    issuer: "Climate Change Domain",
    year: "2025",
    type: "hackathon",
  },
  {
    title: "NETVENTURE",
    issuer: "Coding Platform",
    year: "2024",
    type: "hackathon",
  },
  {
    title: "Tech Workshops & Quizzes",
    issuer: "SIMATS Engineering",
    year: "2025",
    type: "achievement",
  },
];

const CertificationsSection = () => {
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

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "certification":
        return "from-primary to-secondary";
      case "hackathon":
        return "from-accent to-primary";
      case "achievement":
        return "from-secondary to-accent";
      default:
        return "from-primary to-secondary";
    }
  };

  return (
    <section id="certifications" ref={sectionRef} className="py-24 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Header */}
        <div className={`text-center max-w-2xl mx-auto mb-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Award className="w-4 h-4" />
            Recognition
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Certifications & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="text-muted-foreground">
            Continuous learning and active participation in the tech community
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {certifications.map((cert, index) => (
            <div
              key={cert.title}
              className={`group relative ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Card */}
              <div className="relative h-full glass-card p-5 rounded-2xl border border-border/50 group-hover:border-primary/30 transition-all duration-300 group-hover:scale-[1.02]">
                {/* Top accent line */}
                <div className={`absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r ${getTypeStyles(cert.type)} rounded-full`} />
                
                {/* Year badge */}
                <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                  <Calendar className="w-3 h-3" />
                  {cert.year}
                </div>

                {/* Title */}
                <h3 className="font-display font-semibold text-sm leading-tight mb-2 group-hover:text-primary transition-colors">
                  {cert.title}
                </h3>

                {/* Issuer */}
                <p className="text-xs text-muted-foreground">
                  {cert.issuer}
                </p>

                {/* Hover icon */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-primary" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Experience Highlights */}
        <div className={`mt-16 ${isVisible ? 'fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          <div className="glass-card-strong rounded-3xl p-8 md:p-10">
            <h3 className="font-display text-2xl font-bold mb-6 text-center">
              Hackathon <span className="gradient-text">Experience</span>
            </h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: "⚡", title: "24-Hour Sprints", desc: "Intensive hackathon veteran" },
                { icon: "🤝", title: "Team Collaboration", desc: "Cross-functional teamwork" },
                { icon: "🚀", title: "Real-World Impact", desc: "Solution-driven development" },
              ].map((item, index) => (
                <div key={index} className="text-center p-4">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h4 className="font-display font-semibold mb-1">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
