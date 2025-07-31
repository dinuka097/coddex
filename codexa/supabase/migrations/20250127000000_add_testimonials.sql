-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  position TEXT,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for testimonials
CREATE POLICY "Allow public insert on testimonials" 
ON public.testimonials 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Allow public read of approved testimonials" 
ON public.testimonials 
FOR SELECT 
USING (is_approved = true);

CREATE POLICY "Admins can view all testimonials" 
ON public.testimonials 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Create indexes for better performance
CREATE INDEX idx_testimonials_approved ON public.testimonials(is_approved);
CREATE INDEX idx_testimonials_featured ON public.testimonials(is_featured);
CREATE INDEX idx_testimonials_created_at ON public.testimonials(created_at);