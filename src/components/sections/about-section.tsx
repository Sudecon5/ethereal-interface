import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Database, 
  ChartLine, 
  Brain,
  Circle,
  FileJs
} from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const skills = skillsRef.current;

    if (!section || !image || !content || !skills) return;

    // Initial states
    gsap.set(image, { opacity: 0, x: -100, scale: 0.9 });
    gsap.set(content, { opacity: 0, y: 50 });
    gsap.set('.skill-icon', { opacity: 0, y: 30, scale: 0.8 });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to(image, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.2,
      ease: 'power2.out'
    })
    .to(content, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .to('.skill-icon', {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Hover animations for profile image
    const handleMouseEnter = () => {
      gsap.to(image, {
        scale: 1.05,
        rotation: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        scale: 1,
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    image.addEventListener('mouseenter', handleMouseEnter);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      image.removeEventListener('mouseenter', handleMouseEnter);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const skills = [
    { icon: Circle, name: 'Python', color: 'text-yellow-400' },
    { icon: Database, name: 'SQL', color: 'text-blue-400' },
    { icon: ChartLine, name: 'Analytics', color: 'text-green-400' },
    { icon: Brain, name: 'ML/AI', color: 'text-purple-400' },
    { icon: FileJs, name: 'JavaScript', color: 'text-orange-400' },
    { icon: Code, name: 'React', color: 'text-cyan-400' }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 relative"
      id="about"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative">
              <div className="w-80 h-80 rounded-full glass-card p-2 neon-glow">
                <img 
                  src="/lovable-uploads/dd49a6b3-9eb0-40be-b739-20d079742ee4.png"
                  alt="Sudipta Priyam - Data Scientist"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-neon-blue rounded-full opacity-60 animate-float" />
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-neon-purple rounded-full opacity-40 animate-float" style={{ animationDelay: '-2s' }} />
              <div className="absolute top-1/2 -right-8 w-6 h-6 bg-neon-cyan rounded-full opacity-70 animate-float" style={{ animationDelay: '-4s' }} />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-normal mb-6">
                About{' '}
                <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
                  Me
                </span>
              </h2>
              
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  I'm a passionate Data Scientist with expertise in machine learning, 
                  statistical analysis, and data visualization. I transform complex datasets 
                  into actionable insights that drive business decisions.
                </p>
                
                <p>
                  With a strong background in Python, R, and advanced analytics, I specialize 
                  in predictive modeling, deep learning, and creating data-driven solutions 
                  for real-world problems.
                </p>
                
                <p>
                  When I'm not diving deep into data, I enjoy building modern web applications 
                  and exploring the latest technologies in AI and machine learning.
                </p>
              </div>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef}>
              <h3 className="text-xl font-medium mb-6 text-foreground">
                Technical Skills
              </h3>
              
              <div className="grid grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <div 
                    key={skill.name}
                    className="skill-icon glass-card p-4 flex flex-col items-center space-y-2 hover:scale-110 transition-transform duration-300 cursor-pointer group"
                  >
                    <skill.icon 
                      size={32} 
                      className={`${skill.color} group-hover:animate-pulse-glow`}
                    />
                    <span className="text-sm text-foreground font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};