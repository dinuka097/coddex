import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Shield, Code, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/", icon: Globe },
    { name: "Services", path: "/services", icon: Code },
    { name: "Projects", path: "/projects", icon: Shield },
    { name: "About", path: "/about", icon: Code },
    { name: "Blog", path: "/blog", icon: Code },
    { name: "Contact", path: "/contact", icon: Shield },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 tech-hover">
            <img 
              src="/lovable-uploads/f74ed528-2395-4436-80d7-9c9e9aa354da.png" 
              alt="Coddex Technologies" 
              className="h-16 w-auto"
            />
            
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.path)
                    ? "text-secondary"
                    : "text-foreground hover:text-secondary"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Button variant="outline" size="sm" className="tech-hover" onClick={() => window.location.href = '/contact'}>
              Contact Us
            </Button>
            <Link to="/admin/login">
              <Button variant="ghost" size="sm" className="tech-hover text-muted-foreground hover:text-secondary">
                <Shield size={16} className="mr-1" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="px-4 py-3 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? "text-secondary bg-secondary/10"
                      : "text-foreground hover:text-secondary hover:bg-secondary/5"
                  }`}
                >
                  <item.icon size={18} />
                  <span>{item.name}</span>
                </Link>
              ))}
              <div className="pt-2">
                <Button 
                  variant="outline" 
                  className="w-full tech-hover"
                  onClick={() => {
                    setIsOpen(false);
                    window.location.href = '/contact';
                  }}
                >
                  Contact Us
                </Button>
                <Link 
                  to="/admin/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Button variant="ghost" className="w-full tech-hover text-muted-foreground hover:text-secondary">
                    <Shield size={16} className="mr-2" />
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
