import { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Save to database
      const { error } = await supabase
        .from('contact_submissions')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone_number: formData.phone || null,
            service_interested: formData.service,
            project_budget: formData.budget || null,
            project_details: formData.message,
          }
        ]);

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
      });
      
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        budget: '',
        message: ''
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleScheduleConsultation = () => {
    toast({
      title: "Consultation Scheduled",
      description: "You'll receive a calendar invite shortly with available time slots.",
    });
  };
  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      details: "info@coddextech.com",
      description: "Get in touch via email for detailed inquiries"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: "+1 (555) 123-4567",
      description: "Speak directly with our consultants"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: "123 Tech Street, San Francisco, CA 94105",
      description: "Come to our headquarters for in-person meetings"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9:00 AM - 6:00 PM PST",
      description: "We're available during standard business hours"
    }
  ];

  const services = [
    "Web Development",
    "Cybersecurity Services",
    "UI/UX Design",
    "Mobile App Development",
    "Cloud Solutions",
    "Consulting Services",
    "Other"
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-24 pb-12 relative geometric-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="font-poppins font-bold text-4xl sm:text-5xl lg:text-6xl text-foreground">
              Contact <span className="text-secondary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your next project? Get in touch with our team of experts for a free consultation
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center tech-hover bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className={`mx-auto w-16 h-16 rounded-lg flex items-center justify-center ${
                      index % 2 === 0 ? 'bg-secondary/20' : 'bg-accent/20'
                    }`}>
                      <info.icon className={index % 2 === 0 ? 'text-secondary' : 'text-accent'} size={28} />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-foreground">
                      {info.title}
                    </h3>
                    <p className="font-medium text-secondary">
                      {info.details}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {info.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="font-poppins text-2xl text-foreground flex items-center">
                    <MessageSquare className="text-secondary mr-3" size={28} />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          First Name *
                        </label>
                        <Input 
                          placeholder="John" 
                          className="bg-background/50 border-border focus:border-secondary"
                          value={formData.firstName}
                          onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Last Name *
                        </label>
                        <Input 
                          placeholder="Doe" 
                          className="bg-background/50 border-border focus:border-secondary"
                          value={formData.lastName}
                          onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Email Address *
                      </label>
                      <Input 
                        type="email" 
                        placeholder="john@example.com"
                        className="bg-background/50 border-border focus:border-secondary"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number
                      </label>
                      <Input 
                        placeholder="+1 (555) 123-4567"
                        className="bg-background/50 border-border focus:border-secondary"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Service Interested In *
                      </label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({...formData, service: value})}>
                        <SelectTrigger className="bg-background/50 border-border focus:border-secondary">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {services.map((service) => (
                            <SelectItem key={service} value={service.toLowerCase()}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Project Budget
                      </label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData({...formData, budget: value})}>
                        <SelectTrigger className="bg-background/50 border-border focus:border-secondary">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-10k">Under $10,000</SelectItem>
                          <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                          <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                          <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                          <SelectItem value="over-100k">Over $100,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Project Details *
                      </label>
                      <Textarea 
                        placeholder="Tell us about your project requirements, goals, and timeline..."
                        rows={4}
                        className="bg-background/50 border-border focus:border-secondary resize-none"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full accent-gradient border-0 tech-hover" size="lg">
                      Send Message
                      <Send className="ml-2" size={16} />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-0">
                  <div className="aspect-video bg-gradient-to-br from-secondary/20 to-accent/20 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <MapPin className="text-secondary mx-auto" size={48} />
                      <p className="text-foreground font-medium">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        123 Tech Street, San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Response Promise */}
              <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-secondary/20 rounded-lg flex items-center justify-center">
                    <Clock className="text-secondary" size={28} />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-foreground">
                    Quick Response Guarantee
                  </h3>
                  <p className="text-muted-foreground">
                    We respond to all inquiries within 24 hours during business days. 
                    For urgent matters, call us directly for immediate assistance.
                  </p>
                </CardContent>
              </Card>

              {/* Free Consultation */}
              <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-accent/20 rounded-lg flex items-center justify-center">
                    <MessageSquare className="text-accent" size={28} />
                  </div>
                  <h3 className="font-poppins font-semibold text-lg text-foreground">
                    Free Consultation
                  </h3>
                  <p className="text-muted-foreground">
                    Schedule a complimentary 30-minute consultation to discuss your 
                    project requirements and how we can help achieve your goals.
                  </p>
                  <Button variant="outline" className="tech-hover" onClick={handleScheduleConsultation}>
                    Schedule Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground">
              Frequently Asked <span className="text-secondary">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Quick answers to common questions about our services and process
            </p>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "What is your typical project timeline?",
                answer: "Project timelines vary based on scope and complexity. Simple websites typically take 2-4 weeks, while complex applications can take 3-6 months. We provide detailed timelines during our initial consultation."
              },
              {
                question: "Do you provide ongoing maintenance and support?",
                answer: "Yes, we offer comprehensive maintenance packages including security updates, performance monitoring, content updates, and technical support to ensure your solution continues to perform optimally."
              },
              {
                question: "How do you ensure the security of our data?",
                answer: "We implement industry-standard security practices including encryption, secure coding practices, regular security audits, and compliance with standards like ISO 27001 and GDPR."
              },
              {
                question: "Can you work with our existing team?",
                answer: "Absolutely! We're experienced in collaborative environments and can integrate seamlessly with your existing development team, providing expertise where needed while respecting your workflow."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6">
                    <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;