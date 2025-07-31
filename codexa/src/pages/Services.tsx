import Layout from "@/components/Layout";
import ServicesSection from "@/components/ServicesSection";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const navigate = useNavigate();
  const processSteps = [
    {
      step: "01",
      title: "Discovery & Analysis",
      description: "We start by understanding your business goals, requirements, and challenges through comprehensive analysis."
    },
    {
      step: "02", 
      title: "Strategy & Planning",
      description: "Our experts develop a tailored strategy and detailed project plan to ensure optimal outcomes."
    },
    {
      step: "03",
      title: "Design & Development",
      description: "We create and build your solution using cutting-edge technologies and best practices."
    },
    {
      step: "04",
      title: "Testing & Security",
      description: "Rigorous testing and security assessments ensure your solution is robust and secure."
    },
    {
      step: "05",
      title: "Deployment & Support",
      description: "Seamless deployment with ongoing monitoring and support to ensure continued success."
    }
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
              Our <span className="text-secondary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive technology solutions designed to transform your business and secure your digital future
            </p>
            <Button className="accent-gradient border-0 tech-hover" size="lg" onClick={() => navigate('/contact')}>
              Get Started Today
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <ServicesSection />

      {/* Process Section */}
      <section className="py-20 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
              Our <span className="text-secondary">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A proven methodology that ensures project success from conception to deployment
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full tech-hover bg-card/50 backdrop-blur-sm border-border relative">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                      <span className="font-poppins font-bold text-2xl text-secondary">
                        {step.step}
                      </span>
                    </div>
                    <CardTitle className="font-poppins text-lg text-foreground">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                      <ArrowRight className="text-secondary" size={24} />
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how our services can help you achieve your digital goals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="accent-gradient border-0 tech-hover" onClick={() => navigate('/contact')}>
                Schedule Free Consultation
              </Button>
              <Button variant="outline" size="lg" className="tech-hover" onClick={() => navigate('/projects')}>
                View Our Portfolio
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;