import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassButton } from '@/components/ui/glass-button';
import { ArrowUpRight, Database, Brain, ChartLine, Car, CurrencyDollar, House, Leaf } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const container = containerRef.current;

    if (!section || !title || !container) return;

    // Initial states
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set('.project-card', { opacity: 0, y: 80, scale: 0.9 });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .to('.project-card', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Hover animations for cards
    const cards = document.querySelectorAll('.project-card');
    
    cards.forEach(card => {
      const handleMouseEnter = () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.project-glow'), {
          opacity: 0.6,
          duration: 0.3
        });
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
        
        gsap.to(card.querySelector('.project-glow'), {
          opacity: 0,
          duration: 0.3
        });
      };

      card.addEventListener('mouseenter', handleMouseEnter);
      card.addEventListener('mouseleave', handleMouseLeave);
    });

  }, []);

  const projects = [
    {
      id: 1,
      title: "Healthcare Analytics Platform",
      description: "ML-powered platform for predictive healthcare analytics and patient outcome modeling.",
      image: "/lovable-uploads/0cbe40f1-dfb8-4a53-a991-4bfabad85262.png",
      icon: Database,
      tech: ["Python", "TensorFlow", "React", "PostgreSQL"],
      color: "neon-blue"
    },
    {
      id: 2,
      title: "Smart Agriculture AI",
      description: "Computer vision system for crop health monitoring and yield prediction using satellite imagery.",
      image: "/lovable-uploads/7da09754-9422-4f6e-9f2f-a5ad75ff2264.png",
      icon: Leaf,
      tech: ["PyTorch", "OpenCV", "FastAPI", "AWS"],
      color: "neon-cyan"
    },
    {
      id: 3,
      title: "Financial Risk Assessment",
      description: "Advanced ML models for credit risk analysis and fraud detection in financial transactions.",
      image: "/lovable-uploads/0cbe40f1-dfb8-4a53-a991-4bfabad85262.png",
      icon: CurrencyDollar,
      tech: ["Scikit-learn", "XGBoost", "Flask", "MongoDB"],
      color: "neon-purple"
    },
    {
      id: 4,
      title: "Real Estate Price Predictor",
      description: "Comprehensive price prediction model using market trends and property features.",
      image: "/lovable-uploads/5c7c0862-91c7-46ed-8b8d-7bb88fe17b4a.png",
      icon: House,
      tech: ["Pandas", "Plotly", "Streamlit", "Redis"],
      color: "neon-blue"
    },
    {
      id: 5,
      title: "Electric Vehicle Analytics",
      description: "Data analysis platform for EV charging patterns and energy optimization.",
      image: "/lovable-uploads/57bb596f-3ecc-47f1-8484-505432aa9502.png",
      icon: Car,
      tech: ["Apache Spark", "Kafka", "D3.js", "Elasticsearch"],
      color: "neon-cyan"
    },
    {
      id: 6,
      title: "Business Intelligence Dashboard",
      description: "Interactive dashboard for real-time business metrics and KPI tracking.",
      image: "/lovable-uploads/3172ad90-ac5c-451e-9491-5e96499a5219.png",
      icon: ChartLine,
      tech: ["Tableau", "Power BI", "SQL", "Azure"],
      color: "neon-purple"
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 relative"
      id="projects"
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-4xl lg:text-5xl font-light text-center mb-16"
        >
          Featured{' '}
          <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
            Projects
          </span>
        </h2>

        {/* Projects Grid */}
        <div 
          ref={containerRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <div 
              key={project.id}
              className="project-card glass-card p-6 relative overflow-hidden cursor-pointer group"
            >
              {/* Glow effect */}
              <div className={`project-glow absolute inset-0 bg-${project.color} opacity-0 blur-xl`} />
              
              {/* Content */}
              <div className="relative z-10">
                {/* Project Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-${project.color}/10 border border-${project.color}/20`}>
                    <project.icon size={24} className={`text-${project.color}`} />
                  </div>
                  <ArrowUpRight 
                    size={20} 
                    className="text-muted-foreground group-hover:text-primary transition-colors" 
                  />
                </div>

                {/* Project Image */}
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Project Info */}
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span 
                      key={tech}
                      className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <GlassButton 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  View Project
                </GlassButton>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <GlassButton variant="hero" size="lg">
            View All Projects
          </GlassButton>
        </div>
      </div>
    </section>
  );
};