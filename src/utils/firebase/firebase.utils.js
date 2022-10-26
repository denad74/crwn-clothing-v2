import userEvent from "@testing-library/user-event";
import {initializeApp} from "firebase/app";
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider
} from "firebase/auth";
import {getFirestore, doc, getDoc, setDoc} from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyAapeyix2rONzCVuWLJFvtFoChMmUxyljk",
	authDomain: "crwn-clothing-db-869b2.firebaseapp.com",
	projectId: "crwn-clothing-db-869b2",
	storageBucket: "crwn-clothing-db-869b2.appspot.com",
	messagingSenderId: "510129086329",
	appId: "1:510129086329:web:0a02d2d97c5b23f95a99a8"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
	prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);
	console.log(userDocRef);
	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());
	// if user data does not exist
	//create / set the document with the data from userAuth in my collection
	if (!userSnapshot.exists()) {
		const {displayName, email} = userAuth;
		const createdAt = new Date();
		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			});
		} catch (error) {
			console.log("error creating the user", console.error.message);
		}
	}

	// if user data exists
	return userDocRef;
};
