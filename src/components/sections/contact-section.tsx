import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GlassButton } from '@/components/ui/glass-button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GithubLogo, LinkedinLogo, EnvelopeSimple, User, ChatCircle } from '@phosphor-icons/react';

gsap.registerPlugin(ScrollTrigger);

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const form = formRef.current;
    const social = socialRef.current;

    if (!section || !title || !form || !social) return;

    // Initial states
    gsap.set(title, { opacity: 0, y: 50 });
    gsap.set('.form-field', { opacity: 0, x: -50 });
    gsap.set('.social-icon', { opacity: 0, scale: 0.8 });

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
    .to('.form-field', {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.out'
    }, '-=0.5')
    .to('.social-icon', {
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    }, '-=0.3');

    // Social icon hover animations
    const socialIcons = document.querySelectorAll('.social-icon');
    
    socialIcons.forEach(icon => {
      const handleMouseEnter = () => {
        gsap.to(icon, {
          scale: 1.2,
          rotation: 5,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      const handleMouseLeave = () => {
        gsap.to(icon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      };

      icon.addEventListener('mouseenter', handleMouseEnter);
      icon.addEventListener('mouseleave', handleMouseLeave);
    });

  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Animate submit button
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
      gsap.to(submitBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }

    // Here you would typically handle form submission
    console.log('Form submitted:', formData);

    try {
      const response = await fetch('https://my-contact-form-backend.onrender.com', { // Replace with your backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        // Optionally show a success message to the user
      } else {
        console.error('Failed to send email:', response.status);
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error('Error sending email:', error);
      // Optionally show an error message to the user
    }
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  const socialLinks = [
    {
      icon: GithubLogo,
      label: 'GitHub',
      href: 'https://github.com/Sudecon5',
      color: 'hover:text-white'
    },
    {
      icon: LinkedinLogo,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/sudiptapriyamkakoty/',
      color: 'hover:text-blue-400'
    },
    {
      icon: EnvelopeSimple,
      label: 'Email',
      href: 'mailto:sudiptapriyam55@gmail.com',
      color: 'hover:text-red-400'
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="py-20 lg:py-32 relative"
      id="contact"
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Title */}
          <h2 
            ref={titleRef}
            className="text-4xl lg:text-5xl font-light text-center mb-16"
          >
            Let's{' '}
            <span className="bg-gradient-primary bg-clip-text text-transparent font-medium">
              Connect
            </span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <div ref={formRef} className="space-y-6">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-medium mb-6 text-foreground">
                  Send me a message
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="form-field">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <User size={16} className="inline mr-2" />
                      Your Name
                    </label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="glass-input"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <EnvelopeSimple size={16} className="inline mr-2" />
                      Email Address
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="glass-input"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <ChatCircle size={16} className="inline mr-2" />
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell me about your project..."
                      rows={6}
                      className="glass-input resize-none"
                      required
                    />
                  </div>

                  <GlassButton 
                    type="submit"
                    variant="hero" 
                    size="lg"
                    className="w-full submit-btn"
                  >
                    Send Message
                  </GlassButton>
                </form>
              </div>
            </div>

            {/* Contact Info & Social */}
            <div className="space-y-8">
              {/* Contact Info */}
              <div className="glass-card p-8">
                <h3 className="text-2xl font-medium mb-6 text-foreground">
                  Get in touch
                </h3>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    I'm always interested in hearing about new opportunities, 
                    whether it's a data science project, collaboration, or just a chat about technology.
                  </p>
                  
                  <p>
                    Feel free to reach out if you'd like to discuss how data science 
                    can drive your business forward.
                  </p>
                  
                  <div className="pt-4">
                    <p className="text-foreground font-medium">
                      Response time: Usually within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div ref={socialRef} className="glass-card p-8">
                <h3 className="text-xl font-medium mb-6 text-foreground">
                  Connect with me
                </h3>
                
                <div className="flex space-x-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social-icon p-4 glass-card text-muted-foreground transition-colors duration-300 ${social.color}`}
                      aria-label={social.label}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-neon-blue rounded-full opacity-5 blur-2xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-neon-purple rounded-full opacity-7 blur-2xl animate-float" style={{ animationDelay: '-3s' }} />
      </div>
    </section>
  );
};