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
      title: "Healthcare Cost Predictor",
      description: "ML model predicting healthcare costs and optimizing insurance pricing strategies.",
      image: "/lovable-uploads/70a9715d-9986-4cbf-8e11-f8acfb3f0dd7.png",
      icon: Brain,
      tech: ["R", "TensorFlow", "XGBoost", "Regression"],
      color: "neon-cyan",
      link: "https://medical-insurance-1-61os.onrender.com"
    },
    {
      id: 2,
      title: "Smart Communication System",
      description: "AI-powered email automation and sentiment analysis for business communications.",
      image: "/lovable-uploads/c1351e0f-17df-4e96-9ecd-4e96b778d5f1.png",
      icon: CurrencyDollar,
      tech: ["Python", "BERT", "FastAPI", "React"],
      color: "neon-purple",
      link: "https://sudecon5.github.io/Cover_Letter_Generator/"
    },
    {
      id: 3,
      title: "Real Estate Market Intelligence",
      description: "Predictive analytics platform for property valuation and market trend analysis.",
      image: "/lovable-uploads/8e7f323b-ae7a-4b57-88f6-5472a96e85a8.png",
      icon: House,
      tech: ["Python", "Statistical ML", "Jupyter Notebook","SQL", "Tableau"],
      color: "neon-blue",
      link: "https://house-prediction-p7qa.onrender.com"
    },
    {
      id: 4,
      title: "Bell Pepper Disease Identification",
      description: "Computer vision system and neural network framework for identification of diseases in plants.",
      image: "/lovable-uploads/9ba9f96e-17ac-4d6a-a1b8-83d9ed492b49.png",
      icon: Leaf,
      tech: ["Python", "Pytorch", "Neural Network", "Streamlit", "FastAPI"],
      color: "neon-cyan",
      link: "https://github.com/Sudecon5/Bell_Pepper_Disease?tab=readme-ov-file"
    },
    {
      id: 5,
      title: "Washington State Electronic Vehicle",
      description: "Smart grid optimization and charging pattern analysis for electric vehicle infrastructure.",
      image: "/lovable-uploads/bae0c678-8653-4811-8ae4-dd451e3e6090.png",
      icon: Car,
      tech: ["Python", "Matplolib", "Scikit-Learn","Seaborn"],
      color: "neon-purple",
      link: "https://github.com/Sudecon5/Washington-State-Electronic-Vehicle"
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
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full block" // block makes the link take up full width
                >
                {/* CTA Button */}
                <GlassButton 
                  variant="outline" 
                  size="sm"
                  className="w-full"
                >
                  View Project
                </GlassButton>
                </a>
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