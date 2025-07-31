import { useState } from "react";
import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const projects = [
    {
      id: 1,
      title: "FinanceCore Banking Platform",
      description: "Complete digital banking solution with advanced security features and real-time transaction processing.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Web Development",
      technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Stripe"],
      client: "FinanceCore Ltd.",
      year: "2023",
      services: ["Full-Stack Development", "Cybersecurity", "UI/UX Design"],
      testimonial: "Exceptional work that transformed our digital banking capabilities.",
      results: ["300% increase in user engagement", "Zero security incidents", "50% faster transactions"]
    },
    {
      id: 2,
      title: "TechStart E-Commerce Platform",
      description: "High-performance e-commerce platform with AI-powered recommendations and advanced analytics.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "E-Commerce",
      technologies: ["Next.js", "Python", "MongoDB", "Redis", "Shopify"],
      client: "TechStart Inc.",
      year: "2023",
      services: ["E-Commerce Development", "Performance Optimization", "SEO"],
      testimonial: "Our conversion rates increased by 400% after the platform launch.",
      results: ["400% conversion rate increase", "2x faster page load times", "99.9% uptime achieved"]
    },
    {
      id: 3,
      title: "Global Dynamics Security Audit",
      description: "Comprehensive cybersecurity assessment and implementation of enterprise security solutions.",
      image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Cybersecurity",
      technologies: ["Penetration Testing", "SIEM", "WAF", "Compliance Tools"],
      client: "Global Dynamics",
      year: "2023",
      services: ["Security Audit", "Compliance", "Monitoring Setup"],
      testimonial: "Critical vulnerabilities were identified and resolved, securing our infrastructure.",
      results: ["100% compliance achieved", "Zero security breaches", "90% faster incident response"]
    },
    {
      id: 4,
      title: "InnovateLab Portfolio Website",
      description: "Modern, responsive portfolio website with interactive animations and performance optimization.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Web Design",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "Vercel"],
      client: "InnovateLab",
      year: "2023",
      services: ["UI/UX Design", "Web Development", "Performance Optimization"],
      testimonial: "The website perfectly captures our brand and has impressed all our clients.",
      results: ["200% increase in inquiries", "95+ PageSpeed score", "40% longer session duration"]
    },
    {
      id: 5,
      title: "HealthTech Mobile App",
      description: "Secure healthcare mobile application with patient management and telemedicine features.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Mobile Development",
      technologies: ["React Native", "Node.js", "Firebase", "HIPAA Compliance"],
      client: "HealthTech Solutions",
      year: "2023",
      services: ["Mobile Development", "HIPAA Compliance", "Cloud Infrastructure"],
      testimonial: "Seamless patient experience with top-notch security compliance.",
      results: ["10,000+ active users", "HIPAA compliant", "99.5% app store rating"]
    },
    {
      id: 6,
      title: "EduPlatform Learning Management",
      description: "Comprehensive LMS with video streaming, interactive assessments, and progress tracking.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      category: "Education",
      technologies: ["Vue.js", "Laravel", "MySQL", "Video Streaming", "Analytics"],
      client: "EduPlatform Inc.",
      year: "2023",
      services: ["Full-Stack Development", "Video Integration", "Analytics"],
      testimonial: "Student engagement increased dramatically with the new platform.",
      results: ["80% increase in course completion", "50,000+ students served", "24/7 platform availability"]
    }
  ];

  const categories = ["All", "Web Development", "E-Commerce", "Cybersecurity", "Web Design", "Mobile Development", "Education"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const handleViewProject = (project: any) => {
    toast({
      title: "Project Details",
      description: `Viewing details for ${project.title}. Full case study coming soon!`,
    });
  };

  const handleExternalLink = (project: any) => {
    toast({
      title: "External Link",
      description: `Opening ${project.title} project link...`,
    });
  };

  const handleGithubLink = (project: any) => {
    toast({
      title: "GitHub Repository",
      description: `Opening GitHub repository for ${project.title}...`,
    });
  };

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
              Our <span className="text-secondary">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore our portfolio of successful projects that showcase our expertise in web development and cybersecurity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-8 bg-muted/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="tech-hover"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="h-full tech-hover bg-card/50 backdrop-blur-sm border-border group">
                  <div className="relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary" className="tech-hover" onClick={() => handleExternalLink(project)}>
                            <ExternalLink size={16} />
                          </Button>
                          <Button size="sm" variant="secondary" className="tech-hover" onClick={() => handleGithubLink(project)}>
                            <Github size={16} />
                          </Button>
                      </div>
                    </div>
                    <Badge className="absolute top-4 right-4 bg-secondary text-background">
                      {project.category}
                    </Badge>
                  </div>
                  
                  <CardHeader className="space-y-2">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Calendar size={14} />
                      <span>{project.year}</span>
                      <span>•</span>
                      <span>{project.client}</span>
                    </div>
                    <CardTitle className="font-poppins text-foreground group-hover:text-secondary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Technologies */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2 flex items-center">
                        <Tag size={14} className="mr-1" />
                        Technologies
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                        {project.technologies.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{project.technologies.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Key Results */}
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Key Results</h4>
                      <ul className="space-y-1">
                        {project.results.slice(0, 2).map((result, i) => (
                          <li key={i} className="text-sm text-muted-foreground flex items-start">
                            <div className="w-1.5 h-1.5 bg-secondary rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button variant="outline" size="sm" className="w-full tech-hover" onClick={() => handleViewProject(project)}>
                      View Case Study
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl text-foreground">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-muted-foreground">
              Let's collaborate to bring your vision to life with our expertise and innovation
            </p>
            <Button size="lg" className="accent-gradient border-0 tech-hover" onClick={() => navigate('/contact')}>
              Start Your Project
            </Button>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;