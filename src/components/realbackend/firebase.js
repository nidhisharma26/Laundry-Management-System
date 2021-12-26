import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
let firebaseConfig = {
  apiKey: "AIzaSyDL_28PJ7T2DWmbSIDISaS-Z_f_7oPT9Ow",
  authDomain: "laundry-management-2ce11.firebaseapp.com",
  projectId: "laundry-management-2ce11",
  storageBucket: "laundry-management-2ce11.appspot.com",
  messagingSenderId: "314593594981",
  appId: "1:314593594981:web:21ecd44a3d16cd6c8a808c",
  measurementId: "G-XSEZR87TXQ"
};
let app = initializeApp(firebaseConfig);
export let firebaseAuth = getAuth(app);
 
 