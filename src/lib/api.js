import { db } from "@lib/firebase";

import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";

export const listPosts = () => db.collection("posts").get().then(listDocsFromSnapshots);

export const createPost = async post => {
	const docRef = await db.collection("posts").add({ ...post });
	const doc = await docRef.get();
	return { id: doc.id, ...doc.data() };
};
