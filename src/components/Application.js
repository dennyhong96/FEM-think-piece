import { useEffect, useState } from "react";

import { listPosts } from "@lib/api";
import Posts from "@components/Posts";

const Application = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		(async () => {
			const posts = await listPosts();
			setPosts(posts);
		})();
	}, []);

	console.log({ posts });

	const handleCreate = post => {
		setPosts(prev => [post, ...prev]);
	};

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Posts posts={posts} onCreate={handleCreate} />
		</main>
	);
};

export default Application;
