import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const quickLinks = [
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Web Development", href: "/services#web-dev" },
    { name: "Cybersecurity", href: "/services#cybersecurity" },
    { name: "UI/UX Design", href: "/services#ui-ux" },
    { name: "Cloud Solutions", href: "/services#cloud" },
  ];

  return (
    <footer className="relative z-10 bg-background/95 backdrop-blur-md border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/f74ed528-2395-4436-80d7-9c9e9aa354da.png" 
                alt="Coddex Technologies" 
                className="h-8 w-auto"
              />
              <span className="font-poppins font-bold text-xl text-foreground">
                Coddex
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Global technology company specializing in innovative web development 
              and comprehensive cybersecurity solutions for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="ghost"
                  size="sm"
                  className="p-2 tech-hover"
                  asChild
                >
                  <a href={social.href} aria-label={social.label}>
                    <social.icon size={18} />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-poppins font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-poppins font-semibold text-foreground mb-4">
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-poppins font-semibold text-foreground mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-sm">
                <MapPin size={16} className="text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">
                  123 Tech Street<br />
                  San Francisco, CA 94105
                </span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone size={16} className="text-secondary flex-shrink-0" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail size={16} className="text-secondary flex-shrink-0" />
                <span className="text-muted-foreground">info@coddextech.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Coddex Technologies. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              to="/privacy"
              className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-muted-foreground hover:text-secondary transition-colors duration-200 text-sm"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;