import { useEffect, useState } from "react";

import { db, auth } from "@lib/firebase";
import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";
import Posts from "@components/Posts";
import Authentication from "@components/Authentication";

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
				console.log(user);
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

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts posts={posts} />
		</main>
	);
};

export default Application;
