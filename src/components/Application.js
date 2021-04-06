import { useEffect, useState } from "react";

import { db, auth, syncUserProfile } from "@lib/firebase";
import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";
import Authentication from "@components/Authentication";
import Posts from "@components/Posts";

const Application = () => {
	const [posts, setPosts] = useState([]);
	const [user, setUser] = useState(null);

	// Posts subscription
	useEffect(() => {
		const unsubscribe = db.collection("posts").onSnapshot(snapshots => {
			const posts = listDocsFromSnapshots(snapshots);
			setPosts(posts);
		});

		// Clean up
		return unsubscribe;
	}, []);

	// Auth subscription
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async user => {
			if (user) {
				// signed in, sync with DB
				const userProfile = await syncUserProfile(user);
				setUser(userProfile);
			} else {
				// not signed in
				setUser(null);
			}
		});

		// Clean up
		return unsubscribe;
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts posts={posts} />
		</main>
	);
};

export default Application;
