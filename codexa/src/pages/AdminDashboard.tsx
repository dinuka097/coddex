import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Trash2, 
  Eye, 
  User, 
  Calendar, 
  Phone, 
  DollarSign, 
  MessageSquare, 
  LogOut,
  Shield,
  FileText,
  CheckCircle,
  Clock,
  Star,
  ThumbsUp,
  Award,
  Database,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  ContactSubmission,
  Testimonial,
  Profile,
  getContactSubmissions,
  getTestimonials,
  getProfiles,
  markSubmissionAsRead,
  updateSubmissionNotes,
  deleteContactSubmission,
  approveTestimonial,
  toggleFeaturedTestimonial,
  deleteTestimonial,
  getAllDatabaseData
} from "@/lib/firebaseService";

const AdminDashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<ContactSubmission | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [notes, setNotes] = useState('');
  const [activeTab, setActiveTab] = useState<'submissions' | 'testimonials' | 'profiles' | 'overview'>('overview');

  useEffect(() => {
    checkAuth();
    fetchAllData();
  }, []);

  const checkAuth = () => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    const loginTime = localStorage.getItem('adminLoginTime');
    
    if (isAuthenticated !== 'true' || !loginTime) {
      navigate('/admin/login');
      return;
    }
    
    // Check if session is still valid (24 hours)
    const now = Date.now();
    const loginTimestamp = parseInt(loginTime);
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    if (now - loginTimestamp >= sessionDuration) {
      // Session expired
      localStorage.removeItem('adminAuthenticated');
      localStorage.removeItem('adminLoginTime');
      navigate('/admin/login');
    }
  };

  const fetchAllData = async () => {
    try {
      const data = await getAllDatabaseData();
      setSubmissions(data.contactSubmissions);
      setTestimonials(data.testimonials);
      setProfiles(data.profiles);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch data from Firebase",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminLoginTime');
    navigate('/admin/login');
  };

  const markAsRead = async (id: string) => {
    try {
      await markSubmissionAsRead(id);
      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, is_read: true } : sub)
      );
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive",
      });
    }
  };

  const deleteSubmission = async (id: string) => {
    try {
      await deleteContactSubmission(id);
      setSubmissions(prev => prev.filter(sub => sub.id !== id));
      toast({
        title: "Success",
        description: "Submission deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete submission",
        variant: "destructive",
      });
    }
  };

  const saveNotes = async (id: string) => {
    try {
      await updateSubmissionNotes(id, notes);
      setSubmissions(prev => 
        prev.map(sub => sub.id === id ? { ...sub, notes } : sub)
      );
      
      toast({
        title: "Success",
        description: "Notes saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save notes",
        variant: "destructive",
      });
    }
  };

  const approveTestimonialHandler = async (id: string) => {
    try {
      await approveTestimonial(id);
      setTestimonials(prev => 
        prev.map(test => test.id === id ? { ...test, is_approved: true } : test)
      );
      
      toast({
        title: "Success",
        description: "Testimonial approved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to approve testimonial",
        variant: "destructive",
      });
    }
  };

  const toggleFeaturedTestimonialHandler = async (id: string) => {
    try {
      const testimonial = testimonials.find(t => t.id === id);
      if (!testimonial) return;

      await toggleFeaturedTestimonial(id, testimonial.is_featured);
      setTestimonials(prev => 
        prev.map(test => test.id === id ? { ...test, is_featured: !test.is_featured } : test)
      );
      
      toast({
        title: "Success",
        description: `Testimonial ${testimonial.is_featured ? 'removed from' : 'added to'} featured list`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to update testimonial",
        variant: "destructive",
      });
    }
  };

  const deleteTestimonialHandler = async (id: string) => {
    try {
      await deleteTestimonial(id);
      setTestimonials(prev => prev.filter(test => test.id !== id));
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const stats = {
    total: submissions.length,
    unread: submissions.filter(sub => !sub.is_read).length,
    today: submissions.filter(sub => {
      if (!sub.created_at?.toDate) return false;
      return sub.created_at.toDate().toDateString() === new Date().toDateString();
    }).length,
    testimonials: {
      total: testimonials.length,
      pending: testimonials.filter(test => !test.is_approved).length,
      featured: testimonials.filter(test => test.is_featured).length,
    },
    profiles: {
      total: profiles.length,
      admins: profiles.filter(profile => profile.role === 'admin').length,
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-secondary mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString();
    }
    return new Date(timestamp).toLocaleDateString();
  };

  const formatDateTime = (timestamp: any) => {
    if (!timestamp) return 'Unknown';
    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleString();
    }
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="text-secondary" size={24} />
              <h1 className="font-poppins font-bold text-xl text-foreground">
                Coddex Admin - Firebase Backend
              </h1>
            </div>
            <Button 
              variant="outline" 
              onClick={handleSignOut}
              className="tech-hover"
            >
              <LogOut className="mr-2" size={16} />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8"
        >
          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Contact Forms</p>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                </div>
                <FileText className="text-secondary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold text-foreground">{stats.unread}</p>
                </div>
                <Clock className="text-accent" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Testimonials</p>
                  <p className="text-2xl font-bold text-foreground">{stats.testimonials.total}</p>
                </div>
                <Star className="text-secondary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">{stats.testimonials.pending}</p>
                </div>
                <Clock className="text-accent" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Featured</p>
                  <p className="text-2xl font-bold text-foreground">{stats.testimonials.featured}</p>
                </div>
                <Award className="text-secondary" size={32} />
              </div>
            </CardContent>
          </Card>

          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Profiles</p>
                  <p className="text-2xl font-bold text-foreground">{stats.profiles.total}</p>
                </div>
                <Users className="text-secondary" size={32} />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="tech-hover bg-card/50 backdrop-blur-sm border-border">
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                <div className="p-6 pb-0">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Database Overview</TabsTrigger>
                    <TabsTrigger value="submissions">Contact Submissions</TabsTrigger>
                    <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
                    <TabsTrigger value="profiles">User Profiles</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="overview" className="p-6 pt-4">
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Database className="text-secondary" size={24} />
                      <h2 className="text-xl font-semibold">Firebase Database Overview</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <FileText size={20} />
                            <span>Contact Submissions</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total: {stats.total}</p>
                            <p className="text-sm text-muted-foreground">Unread: {stats.unread}</p>
                            <p className="text-sm text-muted-foreground">Today: {stats.today}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Star size={20} />
                            <span>Testimonials</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total: {stats.testimonials.total}</p>
                            <p className="text-sm text-muted-foreground">Pending: {stats.testimonials.pending}</p>
                            <p className="text-sm text-muted-foreground">Featured: {stats.testimonials.featured}</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <Users size={20} />
                            <span>User Profiles</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Total: {stats.profiles.total}</p>
                            <p className="text-sm text-muted-foreground">Admins: {stats.profiles.admins}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      <div className="space-y-2">
                        {submissions.slice(0, 5).map((submission) => (
                          <div key={submission.id} className="flex items-center justify-between p-3 bg-muted/10 rounded-md">
                            <div>
                              <p className="text-sm font-medium">{submission.first_name} {submission.last_name}</p>
                              <p className="text-xs text-muted-foreground">{submission.email}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground">{formatDate(submission.created_at)}</p>
                              <Badge variant={submission.is_read ? "secondary" : "default"} className="text-xs">
                                {submission.is_read ? "Read" : "New"}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="submissions" className="p-6 pt-4">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Service</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell>
                          <Badge 
                            variant={submission.is_read ? "secondary" : "default"}
                            className={submission.is_read ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"}
                          >
                            {submission.is_read ? "Read" : "New"}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">
                          {submission.first_name} {submission.last_name}
                        </TableCell>
                        <TableCell>{submission.email}</TableCell>
                        <TableCell>{submission.service_interested}</TableCell>
                        <TableCell>
                          {formatDate(submission.created_at)}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    setSelectedSubmission(submission);
                                    setNotes(submission.notes || '');
                                    if (!submission.is_read) {
                                      markAsRead(submission.id);
                                    }
                                  }}
                                >
                                  <Eye size={14} />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>
                                    Contact Submission Details
                                  </DialogTitle>
                                </DialogHeader>
                                {selectedSubmission && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Name</label>
                                        <p className="text-foreground">
                                          {selectedSubmission.first_name} {selectedSubmission.last_name}
                                        </p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                                        <p className="text-foreground">{selectedSubmission.email}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                                        <p className="text-foreground">{selectedSubmission.phone_number || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Service</label>
                                        <p className="text-foreground">{selectedSubmission.service_interested}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Budget</label>
                                        <p className="text-foreground">{selectedSubmission.project_budget || 'N/A'}</p>
                                      </div>
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">Date</label>
                                        <p className="text-foreground">
                                          {formatDateTime(selectedSubmission.created_at)}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Project Details</label>
                                      <p className="text-foreground mt-1 p-3 bg-muted/10 rounded-md">
                                        {selectedSubmission.project_details}
                                      </p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">Admin Notes</label>
                                      <Textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Add your notes here..."
                                        className="mt-1"
                                        rows={3}
                                      />
                                      <Button
                                        onClick={() => saveNotes(selectedSubmission.id)}
                                        className="mt-2"
                                        size="sm"
                                      >
                                        Save Notes
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this submission?')) {
                                  deleteSubmission(submission.id);
                                }
                              }}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
                </TabsContent>

                <TabsContent value="testimonials" className="p-6 pt-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Status</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {testimonials.map((testimonial) => (
                          <TableRow key={testimonial.id}>
                            <TableCell>
                              <div className="flex gap-2">
                                <Badge 
                                  variant={testimonial.is_approved ? "secondary" : "default"}
                                  className={testimonial.is_approved ? "bg-secondary/20 text-secondary" : "bg-accent/20 text-accent"}
                                >
                                  {testimonial.is_approved ? "Approved" : "Pending"}
                                </Badge>
                                {testimonial.is_featured && (
                                  <Badge variant="outline" className="bg-amber-500/20 text-amber-600 border-amber-500/50">
                                    Featured
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">
                              {testimonial.name}
                            </TableCell>
                            <TableCell>
                              {testimonial.company || 'N/A'}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                  <Star key={i} className="text-accent fill-current" size={14} />
                                ))}
                                <span className="ml-1 text-sm text-muted-foreground">({testimonial.rating})</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              {formatDate(testimonial.created_at)}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Dialog>
                                  <DialogTrigger asChild>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setSelectedTestimonial(testimonial)}
                                    >
                                      <Eye size={14} />
                                    </Button>
                                  </DialogTrigger>
                                  <DialogContent className="max-w-2xl">
                                    <DialogHeader>
                                      <DialogTitle>
                                        Testimonial Details
                                      </DialogTitle>
                                    </DialogHeader>
                                    {selectedTestimonial && (
                                      <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                          <div>
                                            <label className="text-sm font-medium text-muted-foreground">Name</label>
                                            <p className="text-foreground">{selectedTestimonial.name}</p>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium text-muted-foreground">Email</label>
                                            <p className="text-foreground">{selectedTestimonial.email}</p>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium text-muted-foreground">Company</label>
                                            <p className="text-foreground">{selectedTestimonial.company || 'N/A'}</p>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium text-muted-foreground">Position</label>
                                            <p className="text-foreground">{selectedTestimonial.position || 'N/A'}</p>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium text-muted-foreground">Rating</label>
                                            <div className="flex items-center space-x-1">
                                              {[...Array(selectedTestimonial.rating)].map((_, i) => (
                                                <Star key={i} className="text-accent fill-current" size={16} />
                                              ))}
                                              <span className="ml-1 text-sm">({selectedTestimonial.rating}/5)</span>
                                            </div>
                                          </div>
                                          <div>
                                            <label className="text-sm font-medium text-muted-foreground">Date</label>
                                            <p className="text-foreground">
                                              {formatDateTime(selectedTestimonial.created_at)}
                                            </p>
                                          </div>
                                        </div>
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">Review</label>
                                          <p className="text-foreground mt-1 p-3 bg-muted/10 rounded-md">
                                            {selectedTestimonial.review}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </DialogContent>
                                </Dialog>
                                
                                {!testimonial.is_approved && (
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => approveTestimonialHandler(testimonial.id)}
                                    className="text-green-600 hover:text-green-700"
                                  >
                                    <ThumbsUp size={14} />
                                  </Button>
                                )}
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => toggleFeaturedTestimonialHandler(testimonial.id)}
                                  className={testimonial.is_featured ? "text-amber-600 hover:text-amber-700" : ""}
                                >
                                  <Award size={14} />
                                </Button>
                                
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    if (confirm('Are you sure you want to delete this testimonial?')) {
                                      deleteTestimonialHandler(testimonial.id);
                                    }
                                  }}
                                  className="text-destructive hover:text-destructive"
                                >
                                  <Trash2 size={14} />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                <TabsContent value="profiles" className="p-6 pt-4">
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Updated</TableHead>
                          <TableHead>User ID</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profiles.map((profile) => (
                          <TableRow key={profile.id}>
                            <TableCell className="font-medium">{profile.email}</TableCell>
                            <TableCell>
                              <Badge variant={profile.role === 'admin' ? "default" : "secondary"}>
                                {profile.role || 'user'}
                              </Badge>
                            </TableCell>
                            <TableCell>{formatDate(profile.created_at)}</TableCell>
                            <TableCell>{formatDate(profile.updated_at)}</TableCell>
                            <TableCell className="font-mono text-sm">{profile.user_id}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;