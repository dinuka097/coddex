import { motion } from "framer-motion";
import { Users, Globe, Award, TrendingUp, Shield, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const stats = [
    { icon: Users, value: "500+", label: "Projects Delivered", color: "text-secondary" },
    { icon: Globe, value: "50+", label: "Countries Served", color: "text-accent" },
    { icon: Award, value: "1+", label: "Years Experience", color: "text-secondary" },
    { icon: TrendingUp, value: "99.9%", label: "Uptime Guarantee", color: "text-accent" },
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: "Secure by Design",
      description: "Every solution is built with security as the foundation, not an afterthought.",
      color: "text-secondary"
    },
    {
      icon: Clock,
      title: "24/7 Monitoring",
      description: "Continuous monitoring and support to ensure your systems are always protected.",
      color: "text-accent"
    },
    {
      icon: Award,
      title: "ISO/GDPR Compliant",
      description: "Fully certified and compliant with international security and privacy standards.",
      color: "text-secondary"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Certified professionals with deep expertise in modern technologies and security.",
      color: "text-accent"
    }
  ];

  return (
    <section id="about-section" className="py-20 relative geometric-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
            Why Choose <span className="text-secondary">Coddex</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the digital transformation with innovative solutions and uncompromising security
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 space-y-4">
                  <stat.icon className={`mx-auto ${stat.color}`} size={40} />
                  <div>
                    <motion.h3
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="font-poppins font-bold text-3xl text-foreground"
                    >
                      {stat.value}
                    </motion.h3>
                    <p className="text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="font-poppins font-bold text-2xl lg:text-3xl text-foreground">
              Pioneering Digital Excellence Since 2023
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Coddex Technologies stands at the forefront of digital innovation, delivering 
                cutting-edge web development and cybersecurity solutions to enterprises worldwide. 
                Our mission is to empower businesses through secure, scalable, and intelligent 
                technology solutions.
              </p>
              <p>
                With over 1 year of experience and a team of certified experts, we've successfully 
                transformed the digital landscape for 500+ clients across 50+ countries. Our 
                commitment to excellence and security-first approach has made us a trusted partner 
                for businesses ranging from startups to Fortune 500 companies.
              </p>
              <p>
                We believe in building long-term partnerships, not just delivering projects. 
                Our comprehensive approach encompasses strategy, design, development, security, 
                and ongoing support to ensure your success in the digital realm.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-video rounded-lg overflow-hidden tech-shadow">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Coddex Technologies Team"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full animate-bounce"></div>
          </motion.div>
        </div>

        {/* Why Choose Us Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {whyChooseUs.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${index % 2 === 0 ? 'bg-secondary/20' : 'bg-accent/20'}`}>
                      <item.icon className={item.color} size={24} />
                    </div>
                    <div>
                      <h4 className="font-poppins font-semibold text-lg text-foreground mb-2">
                        {item.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;