import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Code, 
  Shield, 
  Palette, 
  Server, 
  Search, 
  Lock, 
  FileCheck, 
  ShieldAlert,
  Database,
  Monitor
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ServicesModal from "./ServicesModal";

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const webDevServices = [
    {
      id: "custom-website",
      title: "Custom Website Design",
      description: "Bespoke responsive websites tailored to your brand identity and business goals.",
      icon: Code,
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Mobile-first responsive design",
        "SEO optimization built-in",
        "Fast loading performance",
        "Cross-browser compatibility",
        "Content management system",
        "Social media integration"
      ],
      technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
      benefits: [
        "Increased online presence and brand visibility",
        "Better user engagement and conversion rates",
        "Search engine optimization advantages",
        "Scalable architecture for future growth"
      ]
    },
    {
      id: "fullstack-dev",
      title: "Full-Stack Development",
      description: "End-to-end web application development using modern technology stacks.",
      icon: Server,
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "MERN/MEAN stack development",
        "API design and integration",
        "Database architecture",
        "Cloud deployment",
        "Real-time functionality",
        "Third-party integrations"
      ],
      technologies: ["MongoDB", "Express.js", "React", "Node.js", "PostgreSQL", "AWS"],
      benefits: [
        "Unified development approach",
        "Seamless frontend-backend integration",
        "Scalable and maintainable codebase",
        "Faster time to market"
      ]
    },
    {
      id: "cms-ecommerce",
      title: "CMS & E-Commerce",
      description: "Powerful content management and e-commerce solutions for growing businesses.",
      icon: Database,
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "WordPress/Drupal customization",
        "Shopify/WooCommerce setup",
        "Payment gateway integration",
        "Inventory management",
        "Admin dashboard development",
        "Multi-language support"
      ],
      technologies: ["WordPress", "Shopify", "WooCommerce", "Stripe", "PayPal"],
      benefits: [
        "Easy content management",
        "Secure payment processing",
        "Automated inventory tracking",
        "Enhanced customer experience"
      ]
    },
    {
      id: "ui-ux",
      title: "UI/UX Engineering",
      description: "User-centered design and interface development for optimal user experiences.",
      icon: Palette,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "User research and personas",
        "Wireframing and prototyping",
        "Design system creation",
        "Usability testing",
        "Accessibility compliance",
        "Interactive prototypes"
      ],
      technologies: ["Figma", "Adobe XD", "Sketch", "InVision", "Framer"],
      benefits: [
        "Improved user satisfaction",
        "Higher conversion rates",
        "Reduced development costs",
        "Better accessibility compliance"
      ]
    },
    {
      id: "performance",
      title: "Web Performance Optimization",
      description: "Advanced performance tuning and optimization for lightning-fast web applications.",
      icon: Monitor,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Core Web Vitals optimization",
        "Code splitting and lazy loading",
        "Image optimization",
        "CDN implementation",
        "Caching strategies",
        "Performance monitoring"
      ],
      technologies: ["Lighthouse", "WebPageTest", "GTmetrix", "CloudFlare", "Redis"],
      benefits: [
        "Faster page load times",
        "Better search engine rankings",
        "Improved user experience",
        "Reduced bounce rates"
      ]
    }
  ];

  const cyberSecurityServices = [
    {
      id: "penetration-testing",
      title: "Penetration Testing",
      description: "Comprehensive security assessments to identify vulnerabilities before attackers do.",
      icon: ShieldAlert,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Network penetration testing",
        "Web application security testing",
        "Social engineering assessments",
        "Wireless security audits",
        "Detailed vulnerability reports",
        "Remediation recommendations"
      ],
      technologies: ["Metasploit", "Nmap", "Burp Suite", "OWASP ZAP", "Kali Linux"],
      benefits: [
        "Proactive security vulnerability identification",
        "Compliance with security standards",
        "Reduced risk of data breaches",
        "Enhanced security posture"
      ]
    },
    {
      id: "vulnerability-assessment",
      title: "Vulnerability Assessment",
      description: "Systematic evaluation of security weaknesses in your IT infrastructure.",
      icon: Search,
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Automated vulnerability scanning",
        "Manual security testing",
        "Risk prioritization matrix",
        "CVSS scoring system",
        "Executive summary reports",
        "Technical remediation guides"
      ],
      technologies: ["Nessus", "OpenVAS", "Qualys", "Rapid7", "Acunetix"],
      benefits: [
        "Comprehensive security visibility",
        "Prioritized remediation roadmap",
        "Compliance requirement fulfillment",
        "Continuous security improvement"
      ]
    },
    {
      id: "secure-code-audit",
      title: "Secure Code Auditing",
      description: "In-depth analysis of source code to identify security flaws and coding issues.",
      icon: FileCheck,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Static code analysis",
        "Dynamic application testing",
        "Code review processes",
        "Security pattern analysis",
        "Compliance checking",
        "Developer training recommendations"
      ],
      technologies: ["SonarQube", "Checkmarx", "Veracode", "Fortify", "CodeQL"],
      benefits: [
        "Early vulnerability detection",
        "Reduced security debt",
        "Improved code quality",
        "Enhanced developer security awareness"
      ]
    },
    {
      id: "waf-ddos",
      title: "WAF & DDoS Protection",
      description: "Advanced web application firewall and distributed denial-of-service protection.",
      icon: Shield,
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "Real-time threat detection",
        "Traffic filtering and blocking",
        "Bot protection mechanisms",
        "Rate limiting implementation",
        "Geographic blocking",
        "24/7 monitoring dashboard"
      ],
      technologies: ["CloudFlare", "AWS WAF", "Akamai", "Imperva", "F5 Networks"],
      benefits: [
        "Protection against web attacks",
        "Improved website availability",
        "Reduced infrastructure load",
        "Enhanced user experience"
      ]
    },
    {
      id: "compliance",
      title: "Compliance Assistance",
      description: "Expert guidance for achieving and maintaining ISO, GDPR, and other compliance standards.",
      icon: Lock,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      features: [
        "ISO 27001 implementation",
        "GDPR compliance audit",
        "Policy documentation",
        "Risk assessment frameworks",
        "Training and awareness programs",
        "Ongoing compliance monitoring"
      ],
      technologies: ["GRC Platforms", "Risk Management Tools", "Policy Management Systems"],
      benefits: [
        "Regulatory compliance achievement",
        "Reduced legal and financial risks",
        "Enhanced customer trust",
        "Competitive advantage"
      ]
    }
  ];

  const handleServiceClick = (service: any) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const ServiceCard = ({ service, category }: { service: any; category: string }) => (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full tech-hover cursor-pointer bg-card/50 backdrop-blur-sm border-border">
        <CardHeader className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg ${category === 'web' ? 'bg-secondary/20' : 'bg-accent/20'}`}>
              <service.icon className={category === 'web' ? 'text-secondary' : 'text-accent'} size={24} />
            </div>
            <CardTitle className="font-poppins text-lg text-foreground">
              {service.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-muted-foreground leading-relaxed">
            {service.description}
          </CardDescription>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full tech-hover"
            onClick={() => handleServiceClick(service)}
          >
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <section id="services" className="py-20 relative">
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
            Our <span className="text-secondary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your digital transformation
          </p>
        </motion.div>

        {/* Web Development Services */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-semibold text-2xl lg:text-3xl text-foreground mb-8 flex items-center"
          >
            <Code className="text-secondary mr-3" size={32} />
            Web Development Services
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {webDevServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard service={service} category="web" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Cybersecurity Services */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-poppins font-semibold text-2xl lg:text-3xl text-foreground mb-8 flex items-center"
          >
            <Shield className="text-accent mr-3" size={32} />
            Cybersecurity Services
          </motion.h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cyberSecurityServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard service={service} category="security" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Modal */}
      <ServicesModal
        service={selectedService}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default ServicesSection;