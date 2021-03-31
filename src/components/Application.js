import { useEffect, useState } from "react";

import { db } from "@lib/firebase";
import listDocsFromSnapshots from "@utils/listDocsFromSnapshots";
import Posts from "@components/Posts";

const Application = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const unsubscribe = db.collection("posts").onSnapshot(snapshots => {
			const posts = listDocsFromSnapshots(snapshots);
			setPosts(posts);
		});

		// Clean up
		return unsubscribe;
	}, []);

	console.log({ posts });

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Posts posts={posts} />
		</main>
	);
};

export default Application;
