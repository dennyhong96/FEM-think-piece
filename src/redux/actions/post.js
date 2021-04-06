import { db } from "@lib/firebase";
import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";

export const POSTS_LOADED = "POSTS_LOADED";

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
