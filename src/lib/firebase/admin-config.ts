import * as admin from 'firebase-admin';

if (!admin.apps.length) {

  // Initialize Firebase Admin
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
  });

  // Log
  console.log('Firebase Admin Initialized');
}

export default admin;