import admin from 'firebase-admin'
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  storageBucket: 'three-bar-fifty.appspot.com',
});

const bucket = admin.storage().bucket();

// Set the CORS rules
const corsConfig = [
  {
    origin: ['https://three-bar-fifty.firebaseapp.com/'],  
    method: ['GET'],
    maxAgeSeconds: 3600,
  }
];

bucket.setCorsConfiguration(corsConfig)
  .then(() => {
    console.log('CORS configuration set successfully.');
  })
  .catch((err) => {
    console.error('Error setting CORS configuration:', err);
  });
