// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDY_6Q6HvMPMCtxW3JlnN3e-C2W6C6rXsw",
  authDomain: "gitelp-1024e.firebaseapp.com",
  projectId: "gitelp-1024e",
  storageBucket: "gitelp-1024e.firebasestorage.app",
  messagingSenderId: "233137051276",
  appId: "1:233137051276:web:1acff8e878c089d00a0da9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export async function uploadFile(file: File, setProgress?: (progress: number) => void) {

  return new Promise((resolve, reject) => {
    try {
      const storageRef = ref(storage, file.name)
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', snapshot => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        if (setProgress) setProgress(progress)

        switch (snapshot.state) {
          case 'paused':
            console.log('upload is paused'); break;
          case 'running':
            console.log('upload is running'); break;
        }
      }, error => {
        reject(error)
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadUrl => {
          resolve(downloadUrl)
        })
      })
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })

}