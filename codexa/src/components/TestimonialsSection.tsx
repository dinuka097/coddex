import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Testimonial {
  id: string;
  name: string;
  email: string;
  company?: string;
  position?: string;
  rating: number;
  review: string;
  created_at: string;
  is_approved: boolean;
  is_featured: boolean;
}

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback testimonials in case database is empty
  const fallbackTestimonials = [
    {
      id: "1",
      name: "Sarah Johnson",
      position: "CTO",
      company: "TechStart Inc.",
      email: "sarah@techstart.com",
      review: "Coddex Technologies transformed our digital infrastructure completely. Their cybersecurity solutions gave us the confidence to scale globally without compromising on security.",
      rating: 5,
      created_at: new Date().toISOString(),
      is_approved: true,
      is_featured: true
    },
    {
      id: "2",
      name: "Michael Chen",
      position: "CEO",
      company: "Global Dynamics",
      email: "michael@globaldynamics.com",
      review: "Working with Coddex was a game-changer. Their team delivered a world-class e-commerce platform that increased our conversion rates by 300%. Exceptional work!",
      rating: 5,
      created_at: new Date().toISOString(),
      is_approved: true,
      is_featured: true
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      position: "IT Director",
      company: "FinanceCore",
      email: "emily@financecore.com",
      review: "The penetration testing and vulnerability assessment helped us identify critical security gaps. Their detailed reports and remediation guidance were invaluable.",
      rating: 5,
      created_at: new Date().toISOString(),
      is_approved: true,
      is_featured: false
    }
  ];

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_approved', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Use database testimonials if available, otherwise use fallback
      const testimonialsToUse = data && data.length > 0 ? data : fallbackTestimonials;
      setTestimonials(testimonialsToUse);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      // Use fallback testimonials if database fetch fails
      setTestimonials(fallbackTestimonials);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
            <p className="text-muted-foreground mt-4">Loading testimonials...</p>
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return (
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4"
          >
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
              Client <span className="text-secondary">Testimonials</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              No testimonials available at the moment.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

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
                        <div className="w-24 h-24 rounded-full mx-auto lg:mx-0 bg-secondary/20 flex items-center justify-center">
                          <User className="text-secondary" size={32} />
                        </div>
                        <div className="absolute -bottom-2 -right-2 bg-secondary p-2 rounded-full">
                          <Quote className="text-background" size={16} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-poppins font-semibold text-lg text-foreground">
                          {current.name}
                        </h4>
                        {current.position && (
                          <p className="text-secondary font-medium">{current.position}</p>
                        )}
                        {current.company && (
                          <p className="text-muted-foreground">{current.company}</p>
                        )}
                      </div>
                      {/* Star Rating */}
                      <div className="flex justify-center lg:justify-start space-x-1">
                        {[...Array(current.rating)].map((_, i) => (
                          <Star key={i} className="text-accent fill-current" size={16} />
                        ))}
                        <span className="ml-2 text-sm text-muted-foreground">
                          ({current.rating}/5)
                        </span>
                      </div>
                    </div>

                    {/* Testimonial Content */}
                    <div className="lg:col-span-2 space-y-6">
                      <blockquote className="text-lg lg:text-xl text-foreground leading-relaxed italic">
                        "{current.review}"
                      </blockquote>
                      <div className="border-l-4 border-secondary pl-4">
                        <p className="text-muted-foreground font-medium">Submitted:</p>
                        <p className="text-secondary">{new Date(current.created_at).toLocaleDateString()}</p>
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