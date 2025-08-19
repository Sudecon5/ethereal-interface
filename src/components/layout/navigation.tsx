import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { GlassButton } from '@/components/ui/glass-button';
import { List, X } from '@phosphor-icons/react';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    const logo = logoRef.current;
    const menu = menuRef.current;

    if (!nav || !logo || !menu) return;

    // Initial animation
    gsap.set([logo, '.nav-item'], { opacity: 0, y: -20 });
    
    gsap.to([logo, '.nav-item'], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 3.5 // After loading screen
    });

    // Scroll-based navbar background
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      
      gsap.to(nav, {
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        backgroundColor: scrolled ? 'hsl(var(--background) / 0.8)' : 'transparent',
        borderBottom: scrolled ? '1px solid hsl(var(--border) / 0.3)' : 'none',
        duration: 0.3
      });
    };

    window.addEventListener('scroll', handleScroll);

    // Active section detection
    const sections = ['hero', 'about', 'projects', 'contact'];
    const observerOptions = {
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const mobileMenu = mobileMenuRef.current;
    if (!mobileMenu) return;

    if (isMenuOpen) {
      gsap.set(mobileMenu, { display: 'flex' });
      gsap.fromTo(mobileMenu, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
      gsap.fromTo('.mobile-nav-item',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, delay: 0.1 }
      );
    } else {
      gsap.to(mobileMenu, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(mobileMenu, { display: 'none' });
        }
      });
    }
  }, [isMenuOpen]);

  const navItems = [
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
    
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div 
              ref={logoRef}
              className="cursor-pointer"
              onClick={scrollToTop}
            >
              <span className="text-2xl font-light tracking-wide">
                <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
                  Sudipta
                </span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div ref={menuRef} className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`nav-item text-sm font-medium transition-colors duration-300 hover:text-primary ${
                    activeSection === item.href.replace('#', '') 
                      ? 'text-primary' 
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              
              <GlassButton 
                variant="outline" 
                size="sm"
                className="nav-item"
                onClick={() => scrollToSection('#contact')}
              >
                Hire Me
              </GlassButton>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 md:hidden bg-background/95 backdrop-blur-lg"
        style={{ display: 'none' }}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="mobile-nav-item text-2xl font-light text-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </button>
          ))}
          
          <GlassButton 
            variant="hero" 
            size="lg"
            className="mobile-nav-item"
            onClick={() => scrollToSection('#contact')}
          >
            Hire Me
          </GlassButton>
        </div>
      </div>
    </>
  );
};