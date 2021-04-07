import { db, storage } from "@lib/firebase";
import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";

// Posts
export const listPosts = () => db.collection("posts").get().then(listDocsFromSnapshots);

export const createPost = async post => {
	const docRef = await db.collection("posts").add({ ...post });
	const doc = await docRef.get();
	return { id: doc.id, ...doc.data() };
};

export const removePost = async postId => db.collection("posts").doc(postId).delete();

export const increaseStars = ({ id, stars }) => {
	db.collection("posts")
		.doc(id)
		.update({ stars: stars + 1 });
};

// Users
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

export const updateUser = async ({ uid, photo, ...props }) => {
	const updateObj = { ...props };

	if (photo) {
		const ext = photo.typt?.split("/")?.[1] ?? "png";
		const photoRef = storage.ref().child(`profile/${uid}/${uid}.${ext}`); // Same object name overwrites each other
		await photoRef.put(photo);
		const imageSrc = await photoRef.getDownloadURL();
		updateObj.photoURL = imageSrc;
	}

	await db.collection("users").doc(uid).set(updateObj, { merge: true });
};

export const createComment = async ({ postId, content, user }) => {
	await db
		.collection("posts")
		.doc(postId)
		.collection("comments")
		.add({ content, user, createdAt: Date.now() });
};
