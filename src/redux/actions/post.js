import { db } from "@lib/firebase";
import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";

export const POSTS_LOADED = "POSTS_LOADED";
export const COMMENTS_LOADED = "COMMENTS_LOADED";

export const subscribeToPosts = () => async dispatch => {
	const unsubscribe = db.collection("posts").onSnapshot(snapshots => {
		const posts = listDocsFromSnapshots(snapshots);
		dispatch({
			type: POSTS_LOADED,
			payload: posts,
		});
	});

	return unsubscribe;
};

export const subscribeToComments = postId => async dispatch => {
	const unsubscribe = db
		.collection("posts")
		.doc(postId)
		.collection("comments")
		.onSnapshot(snapshots => {
			const comments = listDocsFromSnapshots(snapshots);
			dispatch({
				type: COMMENTS_LOADED,
				payload: { postId, comments },
			});
		});

	return unsubscribe;
};
