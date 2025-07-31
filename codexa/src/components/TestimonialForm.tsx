import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Send, User, Building, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const TestimonialForm = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    position: '',
    review: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating for your review.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('testimonials')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            company: formData.company || null,
            position: formData.position || null,
            rating: rating,
            review: formData.review,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Thank You!",
        description: "Your testimonial has been submitted successfully. It will be reviewed before being published.",
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        position: '',
        review: ''
      });
      setRating(0);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Share Your <span className="text-secondary">Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Help us improve and share your experience with Coddex Technologies
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardHeader>
              <CardTitle className="font-poppins text-2xl text-foreground text-center">
                Submit Your Testimonial
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input 
                        type="text" 
                        placeholder="John Doe"
                        className="pl-10 bg-background/50 border-border focus:border-secondary"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input 
                        type="email" 
                        placeholder="john@example.com"
                        className="pl-10 bg-background/50 border-border focus:border-secondary"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Company
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input 
                        type="text" 
                        placeholder="Your Company"
                        className="pl-10 bg-background/50 border-border focus:border-secondary"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Position
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                      <Input 
                        type="text" 
                        placeholder="Your Position"
                        className="pl-10 bg-background/50 border-border focus:border-secondary"
                        value={formData.position}
                        onChange={(e) => setFormData({...formData, position: e.target.value})}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Rating *
                  </label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-colors duration-200"
                      >
                        <Star 
                          size={32} 
                          className={`${
                            star <= (hoverRating || rating) 
                              ? 'text-accent fill-current' 
                              : 'text-muted-foreground'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm text-muted-foreground">
                      {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Your Review *
                  </label>
                  <Textarea
                    placeholder="Share your experience working with Coddex Technologies..."
                    className="bg-background/50 border-border focus:border-secondary min-h-[120px]"
                    value={formData.review}
                    onChange={(e) => setFormData({...formData, review: e.target.value})}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full accent-gradient border-0 tech-hover" 
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    "Submitting..."
                  ) : (
                    <>
                      <Send className="mr-2" size={18} />
                      Submit Testimonial
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialForm;