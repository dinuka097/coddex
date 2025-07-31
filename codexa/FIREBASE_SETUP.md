# Firebase Setup Guide

This project has been migrated from Supabase to Firebase. Follow these steps to complete the Firebase configuration.

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or use an existing one
3. Enable Firestore Database
4. Set up Firestore security rules
5. Get your Firebase configuration

## 2. Firebase Configuration

Update the configuration in `src/lib/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};
```

Replace the placeholder values with your actual Firebase project credentials.

## 3. Firestore Database Structure

The application expects the following collections:

### Collection: `contact_submissions`
```json
{
  "first_name": "string",
  "last_name": "string", 
  "email": "string",
  "phone_number": "string (optional)",
  "service_interested": "string",
  "project_budget": "string (optional)",
  "project_details": "string",
  "created_at": "timestamp",
  "is_read": "boolean",
  "notes": "string (optional)"
}
```

### Collection: `testimonials`
```json
{
  "name": "string",
  "email": "string",
  "company": "string (optional)",
  "position": "string (optional)", 
  "rating": "number",
  "review": "string",
  "created_at": "timestamp",
  "is_approved": "boolean",
  "is_featured": "boolean"
}
```

### Collection: `profiles`
```json
{
  "email": "string",
  "role": "string (optional)",
  "created_at": "timestamp",
  "updated_at": "timestamp",
  "user_id": "string"
}
```

## 4. Firestore Security Rules

Set up these security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Contact submissions - allow read/write for authenticated users
    match /contact_submissions/{document} {
      allow read, write: if true; // Adjust based on your auth requirements
    }
    
    // Testimonials - allow read for all, write for authenticated
    match /testimonials/{document} {
      allow read: if true;
      allow write: if true; // Adjust based on your auth requirements  
    }
    
    // Profiles - restrict access
    match /profiles/{document} {
      allow read, write: if true; // Adjust based on your auth requirements
    }
  }
}
```

## 5. Admin Credentials

The admin login has been updated with new credentials:
- **Username**: `coddex_admin`
- **Password**: `CodexAdmin@2024!`

## 6. Features

The Firebase-powered admin dashboard includes:

### Database Overview Tab
- Complete database statistics
- Real-time data from all collections
- Recent activity feed

### Contact Submissions Tab
- View all contact form submissions
- Mark submissions as read/unread
- Add admin notes
- Delete submissions

### Testimonials Tab  
- Manage customer testimonials
- Approve/reject testimonials
- Feature/unfeature testimonials
- View detailed testimonial information

### User Profiles Tab
- View all user profiles
- Monitor user roles
- Track registration dates

## 7. Environment Variables (Optional)

For better security, you can use environment variables:

Create a `.env` file:
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

Then update `src/lib/firebase.ts`:
```typescript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};
```

## 8. Migration Notes

- Supabase client has been replaced with Firebase
- All database operations now use Firebase Firestore
- Admin authentication still uses localStorage (can be upgraded to Firebase Auth)
- Timestamp handling accounts for Firebase Timestamp objects

## 9. Next Steps

1. Update Firebase configuration with your project details
2. Set up appropriate Firestore security rules
3. Test the admin dashboard functionality
4. Consider implementing Firebase Authentication for enhanced security
5. Remove any remaining Supabase references if needed

## Support

If you need help with Firebase setup or have questions about the migration, please refer to:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Getting Started](https://firebase.google.com/docs/firestore/quickstart)