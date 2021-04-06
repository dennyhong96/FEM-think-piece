import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
// import "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);

	// For debug only
	if (process.env.NODE_ENV === "development" && process.browser && !window.firebase) {
		window.firebase = firebase;
	}
}

// firestore
export const db = firebase.firestore();

// auth
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(googleAuthProvider);
export const signOut = () => auth.signOut();

export default firebase;

export const syncUserProfile = async ({ uid, email, displayName, photoURL } = {}) => {
	if (!uid) return; // Called without a user, when onAuthStateChanged fired from authenticatd to unauthenticated

	// If user already in DB, return the user
	const userDocRef = db.collection("users").doc(uid);
	const userSnapshot = await userDocRef.get();

	// User not in DB yet
	if (!userSnapshot.exists) {
		try {
			const createdAt = Date.now();

			// Store user into DB
			await userDocRef.set({ email, displayName, photoURL, createdAt });
		} catch (error) {
			console.error("Error creating user's Profile.", error.message);
		}
	}

	// return the user from DB
	return await getUserProfile(uid);
};

export const getUserProfile = async uid => {
	if (!uid) return null;

	try {
		const doc = await db.collection("users").doc(uid).get();
		return { uid: doc.id, ...doc.data() };
	} catch (error) {
		console.error("Error getting user's Profile.", error.message);
	}
};
