import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  addDoc, 
  query, 
  orderBy, 
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from './firebase';

// Define interfaces for our data
export interface ContactSubmission {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  service_interested: string;
  project_budget?: string;
  project_details: string;
  created_at: any;
  is_read: boolean;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  email: string;
  company?: string;
  position?: string;
  rating: number;
  review: string;
  created_at: any;
  is_approved: boolean;
  is_featured: boolean;
}

export interface Profile {
  id: string;
  email: string;
  role?: string;
  created_at: any;
  updated_at: any;
  user_id: string;
}

// Contact Submissions Operations
export const getContactSubmissions = async (): Promise<ContactSubmission[]> => {
  try {
    const q = query(collection(db, 'contact_submissions'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as ContactSubmission));
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    throw error;
  }
};

export const markSubmissionAsRead = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'contact_submissions', id);
    await updateDoc(docRef, {
      is_read: true
    });
  } catch (error) {
    console.error('Error marking submission as read:', error);
    throw error;
  }
};

export const updateSubmissionNotes = async (id: string, notes: string): Promise<void> => {
  try {
    const docRef = doc(db, 'contact_submissions', id);
    await updateDoc(docRef, {
      notes: notes
    });
  } catch (error) {
    console.error('Error updating submission notes:', error);
    throw error;
  }
};

export const deleteContactSubmission = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'contact_submissions', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting contact submission:', error);
    throw error;
  }
};

export const addContactSubmission = async (submission: Omit<ContactSubmission, 'id' | 'created_at' | 'is_read'>): Promise<void> => {
  try {
    await addDoc(collection(db, 'contact_submissions'), {
      ...submission,
      created_at: serverTimestamp(),
      is_read: false
    });
  } catch (error) {
    console.error('Error adding contact submission:', error);
    throw error;
  }
};

// Testimonials Operations
export const getTestimonials = async (): Promise<Testimonial[]> => {
  try {
    const q = query(collection(db, 'testimonials'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Testimonial));
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    throw error;
  }
};

export const approveTestimonial = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      is_approved: true
    });
  } catch (error) {
    console.error('Error approving testimonial:', error);
    throw error;
  }
};

export const toggleFeaturedTestimonial = async (id: string, isFeatured: boolean): Promise<void> => {
  try {
    const docRef = doc(db, 'testimonials', id);
    await updateDoc(docRef, {
      is_featured: !isFeatured
    });
  } catch (error) {
    console.error('Error toggling featured testimonial:', error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, 'testimonials', id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    throw error;
  }
};

export const addTestimonial = async (testimonial: Omit<Testimonial, 'id' | 'created_at' | 'is_approved' | 'is_featured'>): Promise<void> => {
  try {
    await addDoc(collection(db, 'testimonials'), {
      ...testimonial,
      created_at: serverTimestamp(),
      is_approved: false,
      is_featured: false
    });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    throw error;
  }
};

// Profiles Operations
export const getProfiles = async (): Promise<Profile[]> => {
  try {
    const q = query(collection(db, 'profiles'), orderBy('created_at', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Profile));
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

// General function to get all database data
export const getAllDatabaseData = async () => {
  try {
    const [contactSubmissions, testimonials, profiles] = await Promise.all([
      getContactSubmissions(),
      getTestimonials(),
      getProfiles()
    ]);

    return {
      contactSubmissions,
      testimonials,
      profiles
    };
  } catch (error) {
    console.error('Error fetching all database data:', error);
    throw error;
  }
};