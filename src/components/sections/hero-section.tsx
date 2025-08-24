import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassButton } from '@/components/ui/glass-button';
import { CaretDown } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;
    const spline = splineRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!hero || !title || !subtitle || !cta || !spline || !scrollIndicator) return;

    // Initial states
    gsap.set([title, subtitle, cta], { 
      opacity: 0, 
      y: 50, 
      filter: 'blur(10px)'
    });
    gsap.set(spline, { 
      opacity: 0, 
      x: 100, 
      scale: 0.9 
    });
    gsap.set(scrollIndicator, {
      opacity: 0,
      y: 20
    });

    // Animation timeline
    const tl = gsap.timeline({ delay: 0.5 });

    tl.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    .to(subtitle, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .to(cta, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')
    .to(spline, {
      opacity: 1,
      x: 0,
      scale: 1,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1')
    .to(scrollIndicator, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out'
    }, '-=0.5');

    // Scroll indicator animation
    gsap.to(scrollIndicator, {
      y: 10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    // Parallax effect for background elements
    gsap.to('.hero-bg-element', {
      y: (i, el) => -ScrollTrigger.maxScroll(window) * (i + 1) * 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

  }, []);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      id="hero"
    >
      {/* Background Spline 3D Model */}
      <div 
        ref={splineRef}
        className="absolute inset-0 z-0"
      >
        <iframe 
          src='https://my.spline.design/orb-XpZ9UBCVC4Xmof5gjx0kCWq5/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          className="w-full h-full"
        />
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="hero-bg-element absolute top-1/4 left-1/4 w-64 h-64 bg-neon-blue rounded-full opacity-5 blur-3xl animate-float" />
        <div className="hero-bg-element absolute top-1/3 right-1/4 w-96 h-96 bg-neon-purple rounded-full opacity-3 blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
        <div className="hero-bg-element absolute bottom-1/4 left-1/3 w-48 h-48 bg-neon-cyan rounded-full opacity-7 blur-3xl animate-float" style={{ animationDelay: '-1.5s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6"
          >
            Hi, I'm{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
              Sudipta Priyam
            </span>
            <br />
            <span className="text-2xl md:text-4xl lg:text-5xl text-gray-300 font-medium">
              Data Scientist
            </span>
          </h1>

          <p 
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Transforming complex data into meaningful insights through 
            cutting-edge machine learning and advanced analytics.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <GlassButton 
              variant="hero" 
              size="xl"
              className="min-w-48"
            >
              Hire Me
            </GlassButton>
            <GlassButton 
              variant="outline" 
              size="xl"
              className="min-w-48"
            >
              View Projects
            </GlassButton>
            
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer z-20"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
          <span className="text-sm mb-2">Scroll</span>
          <CaretDown size={24} />
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
    </section>
  );
};