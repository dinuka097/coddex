import { ReactNode } from "react";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";

interface Service {
  id: string;
  title: string;
  description: string;
  image: string;
  features: string[];
  technologies?: string[];
  benefits: string[];
}

interface ServicesModalProps {
  service: Service | null;
  isOpen: boolean;
  onClose: () => void;
}

const ServicesModal = ({ service, isOpen, onClose }: ServicesModalProps) => {
  const navigate = useNavigate();
  
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="font-poppins text-2xl text-foreground">
            {service.title}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {service.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Service Image */}
          <div className="w-full h-64 rounded-lg overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-lg leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <div>
            <h3 className="font-poppins font-semibold text-lg text-foreground mb-3">
              Key Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies (if available) */}
          {service.technologies && (
            <div>
              <h3 className="font-poppins font-semibold text-lg text-foreground mb-3">
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-secondary/20 text-secondary rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Benefits */}
          <div>
            <h3 className="font-poppins font-semibold text-lg text-foreground mb-3">
              Benefits
            </h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <ArrowRight className="text-secondary mt-0.5 flex-shrink-0" size={16} />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA Button */}
          <div className="pt-4 border-t border-border">
            <Button 
              className="w-full sm:w-auto accent-gradient border-0 tech-hover"
              size="lg"
              onClick={() => {
                onClose();
                navigate('/contact');
              }}
            >
              Request This Service
              <ArrowRight className="ml-2" size={16} />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServicesModal;