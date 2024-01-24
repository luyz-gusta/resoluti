
import { initializeApp } from "firebase/app";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCjrp1qF5VPdsL7ebLCf7Zstws3jb9iH5E",
  authDomain: "desafio-resoluti.firebaseapp.com",
  projectId: "desafio-resoluti",
  storageBucket: "desafio-resoluti.appspot.com",
  messagingSenderId: "781045042756",
  appId: "1:781045042756:web:9b7977435d0aed7a03b611",
  measurementId: "G-EF3VYJFK93"
};

export const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)
export const storageRef = ref(storage);

