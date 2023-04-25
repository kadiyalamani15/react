// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAX7Pq9tn1M7RUmvdrkddeGp2b7Fie1qk8",
	authDomain: "crwn-clothing-db-8e409.firebaseapp.com",
	projectId: "crwn-clothing-db-8e409",
	storageBucket: "crwn-clothing-db-8e409.appspot.com",
	messagingSenderId: "211731701391",
	appId: "1:211731701391:web:83d226fed16a2965eb9afa",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
	
	if (!userSnapshot.exists()) { 
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, { displayName, email, createdAt });
		} catch (err) { 
			console.log('error creating the user', err.message);
		};
	};

	return userDocRef;
};