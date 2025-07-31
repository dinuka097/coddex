import Layout from "@/components/Layout";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const Blog = () => {
  const { toast } = useToast();

  const handleReadMore = (post: any) => {
    toast({
      title: "Blog Post",
      description: `Opening "${post.title}". Full blog posts coming soon!`,
    });
  };
  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Cybersecurity Practices for 2024",
      excerpt: "Stay ahead of cyber threats with these crucial security measures every business should implement.",
      author: "Marcus Johnson",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "Cybersecurity",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Future of Web Development: Trends to Watch",
      excerpt: "Explore the latest technologies and frameworks shaping the future of web development.",
      author: "Sarah Chen",
      date: "2024-01-10",
      readTime: "7 min read",
      category: "Web Development",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Building Secure APIs: Best Practices Guide",
      excerpt: "Learn how to design and implement APIs that prioritize security without sacrificing performance.",
      author: "Alex Rodriguez",
      date: "2024-01-05",
      readTime: "6 min read",
      category: "Development",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
              Tech <span className="text-secondary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest trends, best practices, and insights in web development and cybersecurity
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full tech-hover bg-card/50 backdrop-blur-sm border-border group cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-secondary text-background">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <User size={14} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar size={14} />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <CardTitle className="font-poppins text-foreground group-hover:text-secondary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {post.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full tech-hover group-hover:bg-secondary group-hover:text-background"
                      onClick={() => handleReadMore(post)}
                    >
                      Read More
                      <ArrowRight className="ml-2" size={14} />
                    </Button>
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

export default Blog;