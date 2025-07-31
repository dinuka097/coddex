import Layout from "@/components/Layout";
import AboutSection from "@/components/AboutSection";
import { motion } from "framer-motion";
import { Users, Target, Eye, Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const timeline = [
    { year: "2023", event: "Company Founded", description: "Started with a vision to revolutionize digital security" },
    { year: "2023", event: "First Major Contract", description: "Secured enterprise-level cybersecurity project" },
    { year: "2023", event: "International Expansion", description: "Expanded services to global markets" },
    { year: "2023", event: "AI Integration", description: "Incorporated AI and machine learning in solutions" },
    { year: "2023", event: "Remote-First", description: "Transformed to fully remote-capable organization" },
    { year: "2023", event: "500+ Projects", description: "Milestone of 500 successful project deliveries" }
  ];

  const team = [
    {
      name: "Alex Rodriguez",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "1+ years in cybersecurity and business strategy"
    },
    {
      name: "Sarah Chen",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Expert in full-stack development and system architecture"
    },
    {
      name: "Marcus Johnson",
      position: "Head of Security",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Certified ethical hacker with penetration testing expertise"
    },
    {
      name: "Emily Davis",
      position: "Lead Designer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      bio: "Award-winning UI/UX designer with 1+ years experience"
    }
  ];

  const values = [
    {
      icon: Target,
      title: "Innovation",
      description: "Constantly pushing boundaries with cutting-edge technology solutions"
    },
    {
      icon: Users,
      title: "Collaboration",
      description: "Building strong partnerships with clients for mutual success"
    },
    {
      icon: Eye,
      title: "Transparency",
      description: "Open communication and honest reporting throughout every project"
    },
    {
      icon: Heart,
      title: "Excellence",
      description: "Commitment to delivering the highest quality in everything we do"
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
              About <span className="text-secondary">Coddex Technologies</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Pioneering digital transformation through innovative web development and comprehensive cybersecurity solutions since 2023
            </p>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AboutSection />

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="font-poppins text-2xl text-foreground flex items-center">
                    <Target className="text-secondary mr-3" size={28} />
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    To empower businesses worldwide with secure, scalable, and innovative technology solutions 
                    that drive digital transformation and protect against cyber threats. We believe in creating 
                    technology that not only solves today's challenges but anticipates tomorrow's opportunities.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="h-full tech-hover bg-card/50 backdrop-blur-sm border-border">
                <CardHeader>
                  <CardTitle className="font-poppins text-2xl text-foreground flex items-center">
                    <Eye className="text-accent mr-3" size={28} />
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    To be the global leader in secure digital solutions, setting the standard for innovation 
                    in web development and cybersecurity. We envision a world where businesses can leverage 
                    technology fearlessly, knowing their digital assets are protected by the best security practices.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
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
              Our <span className="text-secondary">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              1 year of innovation, growth, and technology leadership
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-secondary/30"></div>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          <div className="font-poppins font-bold text-2xl text-secondary">
                            {item.year}
                          </div>
                          <h3 className="font-poppins font-semibold text-lg text-foreground">
                            {item.event}
                          </h3>
                          <p className="text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-secondary rounded-full relative z-10 flex-shrink-0"></div>
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="font-poppins font-bold text-3xl sm:text-4xl lg:text-5xl text-foreground">
              Meet Our <span className="text-secondary">Team</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Passionate experts dedicated to delivering exceptional results
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center tech-hover bg-card/50 backdrop-blur-sm border-border">
                  <CardContent className="p-6 space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-24 h-24 rounded-full mx-auto object-cover"
                      />
                      <div className="absolute inset-0 rounded-full bg-gradient-to-t from-secondary/20 to-transparent"></div>
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold text-lg text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-secondary font-medium">{member.position}</p>
                      <p className="text-sm text-muted-foreground mt-2">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
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
              Our <span className="text-secondary">Values</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
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
                      <value.icon className={index % 2 === 0 ? 'text-secondary' : 'text-accent'} size={28} />
                    </div>
                    <h3 className="font-poppins font-semibold text-lg text-foreground">
                      {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {value.description}
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

export default About;