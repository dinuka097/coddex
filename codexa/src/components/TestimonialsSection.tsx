import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechStart Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "Coddex Technologies transformed our digital infrastructure completely. Their cybersecurity solutions gave us the confidence to scale globally without compromising on security.",
      rating: 5,
      project: "Full-Stack Development & Security Audit"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "CEO",
      company: "Global Dynamics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "Working with Coddex was a game-changer. Their team delivered a world-class e-commerce platform that increased our conversion rates by 300%. Exceptional work!",
      rating: 5,
      project: "E-Commerce Platform Development"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "IT Director",
      company: "FinanceCore",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "The penetration testing and vulnerability assessment helped us identify critical security gaps. Their detailed reports and remediation guidance were invaluable.",
      rating: 5,
      project: "Cybersecurity Assessment"
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Founder",
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      content: "From concept to deployment, Coddex exceeded our expectations. Their attention to detail and commitment to quality is unmatched in the industry.",
      rating: 5,
      project: "Custom Web Application"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentTestimonial];

  return (
    <section className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Client <span className="text-secondary">Testimonials</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from our satisfied clients about their experience working with Coddex Technologies
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    {/* Client Info */}
                    <div className="text-center lg:text-left space-y-4">
                      <div className="relative inline-block">
                        <img
                          src={current.image}
                          alt={current.name}
                          className="w-24 h-24 rounded-full mx-auto lg:mx-0 object-cover"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-secondary p-2 rounded-full">
                          <Quote className="text-background" size={16} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-lg text-foreground">
                          {current.name}
                        </h4>
                        <p className="text-secondary font-medium">{current.position}</p>
                        <p className="text-muted-foreground">{current.company}</p>
                      </div>
                      {/* Star Rating */}
                      <div className="flex justify-center lg:justify-start space-x-1">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="text-accent fill-current" size={16} />
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed italic">
                        "{current.content}"
                      </blockquote>
                      <div className="border-l-4 border-secondary pl-4">
                        <p className="text-muted-foreground font-medium">Project:</p>
                        <p className="text-secondary">{current.project}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="tech-hover"
            >
              <ChevronLeft size={16} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="tech-hover"
            >
              <ChevronRight size={16} />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentTestimonial ? 'bg-secondary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;