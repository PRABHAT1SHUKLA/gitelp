// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const storage = getStorage(app);

// export async function uploadFile(file: File, setProgress?: (progress: number) => void) {

//   return new Promise((resolve, reject) => {
//     try {
//       console.log("FIREBASE CONFIG:", {
//         apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//         authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//         projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//         storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//         messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//         appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
//       });
      
//       const storageRef = ref(storage, file.name)
//       console.log("Uploading file to:", storageRef.fullPath);
//       const uploadTask = uploadBytesResumable(storageRef, file)

//       uploadTask.on('state_changed', snapshot => {
//         const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
//         console.log(`Upload progress: ${progress}%`); 
//         if (setProgress) setProgress(progress)

//         switch (snapshot.state) {
//           case 'paused':
//             console.log('upload is paused'); break;
//           case 'running':
//             console.log('upload is running'); break;
//         }
//       }, error => {
//         reject(error)
//       }, () => {
//         getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
//           resolve(downloadUrl)
//         })
//       })
//     } catch (error) {
//       console.error(error)
//       reject(error)
//     }
//   })

// }