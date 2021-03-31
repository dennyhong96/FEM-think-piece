import { useEffect, useState } from "react";

import { db, auth } from "@lib/firebase";
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
		const unsubscribe = auth.onAuthStateChanged(user => {
			if (user) {
				// signed in
				setUser({
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
					email: user.email,
				});
			} else {
				// not signed in
				setUser(null);
			}
		});

		// Clean up
		return unsubscribe;
	}, []);

	console.log({ posts });
	console.log({ user });

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts posts={posts} />
		</main>
	);
};

export default Application;
