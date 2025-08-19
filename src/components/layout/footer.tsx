import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, Heart } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    const content = contentRef.current;

    if (!footer || !content) return;

    // Initial states
    gsap.set('.footer-item', { opacity: 0, y: 30 });
    gsap.set('.floating-particle', { opacity: 0, scale: 0.5 });

    // Animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footer,
        start: 'top 85%',
        end: 'bottom bottom',
        toggleActions: 'play none none reverse'
      }
    });

    tl.to('.footer-item', {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    })
    .to('.floating-particle', {
      opacity: 1,
      scale: 1,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    }, '-=0.5');

    // Continuous floating animation for particles
    gsap.to('.floating-particle', {
      y: (i) => -20 + (i * 5),
      duration: 3 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: (i) => i * 0.5
    });

  }, []);

  const socialLinks = [
    {
      icon: GithubLogo,
      label: 'GitHub',
      href: 'https://github.com/sudiptapriyam',
      color: 'hover:text-white'
    },
    {
      icon: LinkedinLogo,
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/sudiptapriyam',
      color: 'hover:text-blue-400'
    },
    {
      icon: EnvelopeSimple,
      label: 'Email',
      href: 'mailto:sudipta@example.com',
      color: 'hover:text-red-400'
    }
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 bg-gradient-to-t from-background to-background/50 border-t border-border/30"
    >
      {/* Floating Particles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-particle absolute top-1/4 left-1/4 w-2 h-2 bg-neon-blue rounded-full opacity-60" />
        <div className="floating-particle absolute top-1/2 left-1/2 w-3 h-3 bg-neon-purple rounded-full opacity-40" />
        <div className="floating-particle absolute top-1/3 right-1/4 w-2 h-2 bg-neon-cyan rounded-full opacity-70" />
        <div className="floating-particle absolute bottom-1/3 left-1/3 w-4 h-4 bg-neon-blue rounded-full opacity-30" />
        <div className="floating-particle absolute bottom-1/4 right-1/3 w-2 h-2 bg-neon-purple rounded-full opacity-50" />
      </div>

      <div ref={contentRef} className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="footer-item space-y-4">
            <div 
              className="cursor-pointer"
              onClick={scrollToTop}
            >
              <h3 className="text-2xl font-light tracking-wide">
                <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
                  Sudipta Priyam
                </span>
              </h3>
              <p className="text-muted-foreground text-sm">
                Data Scientist & Developer
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Transforming data into actionable insights through advanced analytics 
              and machine learning solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-item space-y-4">
            <h4 className="text-lg font-medium text-foreground">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-muted-foreground hover:text-primary transition-colors text-left w-fit"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="footer-item space-y-4">
            <h4 className="text-lg font-medium text-foreground">Connect</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 glass-card text-muted-foreground transition-all duration-300 hover:scale-110 ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            <p className="text-muted-foreground text-sm">
              Available for freelance projects and collaborations
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-item pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm flex items-center">
              © 2024 Sudipta Priyam. Made with{' '}
              <Heart size={16} className="mx-1 text-red-400" />
              and lots of coffee.
            </p>
            
            <p className="text-muted-foreground text-sm">
              Powered by React, GSAP & Creative Coding
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};