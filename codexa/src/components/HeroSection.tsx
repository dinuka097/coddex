import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Shield, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentText, setCurrentText] = useState(0);
  const heroTexts = [
    "Code. Secure. Deliver.",
    "Innovation at Scale",
    "Trust Through Technology"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % heroTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('about-section');
    nextSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden geometric-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-primary/20 rotate-12 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-primary/10 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 right-1/4 w-20 h-20 bg-primary/10 rounded-full animate-pulse"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center min-h-screen py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 w-full"
          >
            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                className="font-poppins font-bold text-4xl sm:text-5xl lg:text-7xl text-foreground text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <span className="block">Welcome to</span>
                <span className="block bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
                  Coddex Technologies
                </span>
              </motion.h1>
              
              {/* Rotating Tagline */}
              <div className="h-12 sm:h-16 flex items-center justify-center">
                <motion.p
                  key={currentText}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="font-poppins text-xl sm:text-2xl lg:text-3xl text-primary font-medium text-center"
                >
                  {heroTexts[currentText]}
                </motion.p>
              </div>
            </div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-center"
            >
              Global technology leader delivering cutting-edge web development solutions 
              and comprehensive cybersecurity services to enterprises worldwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            >
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg font-medium tech-hover bg-primary text-primary-foreground hover:bg-primary/90 border-0 min-w-[200px]"
                onClick={() => navigate('/contact')}
              >
                Get Free Consultation
                <ArrowRight className="ml-2" size={20} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg font-medium tech-hover border-primary text-primary hover:bg-primary hover:text-primary-foreground min-w-[200px]"
                onClick={() => navigate('/services')}
              >
                Explore Services
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-16 max-w-4xl mx-auto"
            >
              <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm tech-hover text-center">
                <Shield className="text-primary" size={32} />
                <span className="font-poppins font-semibold text-foreground">Secure by Design</span>
                <span className="text-sm text-muted-foreground">
                  Enterprise-grade security built into every solution
                </span>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm tech-hover text-center">
                <Clock className="text-primary" size={32} />
                <span className="font-poppins font-semibold text-foreground">24/7 Monitoring</span>
                <span className="text-sm text-muted-foreground">
                  Round-the-clock protection and support
                </span>
              </div>
              <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card/50 backdrop-blur-sm tech-hover text-center">
                <Award className="text-primary" size={32} />
                <span className="font-poppins font-semibold text-foreground">ISO/GDPR Compliant</span>
                <span className="text-sm text-muted-foreground">
                  Certified compliance and data protection
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToNext}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-primary hover:text-primary/80 transition-colors duration-300"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={32} />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;