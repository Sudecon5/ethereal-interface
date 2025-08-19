import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const progress = progressRef.current;
    const title = titleRef.current;

    if (!container || !progress || !title) return;

    // Initial states
    gsap.set(title, { opacity: 0, y: 30, filter: 'blur(10px)' });
    gsap.set(progress, { width: '0%' });

    // Animation timeline
    const tl = gsap.timeline();

    // Title fade in with blur
    tl.to(title, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    })
    
    // Progress bar animation
    .to(progress, {
      width: '100%',
      duration: 2.5,
      ease: 'power2.out'
    }, '-=0.5')
    
    // Loading complete sequence
    .to(title, {
      opacity: 0,
      y: -20,
      scale: 0.9,
      duration: 0.6,
      ease: 'power2.in'
    })
    .to(progress, {
      opacity: 0,
      duration: 0.4
    }, '-=0.4')
    .to(container, {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    }, '-=0.2');

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="preloader fixed inset-0 z-[10000] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Animated logo/title */}
        <div ref={titleRef} className="text-center">
          <h1 className="text-6xl md:text-8xl font-light tracking-wider text-foreground mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Sudipta
            </span>
          </h1>
          <p className="text-muted-foreground text-lg font-light tracking-wide">
            Data Scientist & Developer
          </p>
        </div>

        {/* Progress bar */}
        <div className="progress-container w-80 h-1 bg-muted rounded-full overflow-hidden">
          <div 
            ref={progressRef}
            className="progress-bar h-full bg-gradient-primary rounded-full relative"
          >
            <div className="absolute inset-0 bg-gradient-primary animate-shimmer" 
                 style={{
                   background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                   backgroundSize: '200% 100%'
                 }}
            />
          </div>
        </div>

        {/* Floating orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-neon-blue rounded-full opacity-30 animate-float" />
          <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-neon-purple rounded-full opacity-20 animate-float" style={{ animationDelay: '-2s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-neon-cyan rounded-full opacity-40 animate-float" style={{ animationDelay: '-4s' }} />
        </div>
      </div>
    </div>
  );
};