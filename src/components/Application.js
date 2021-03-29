import { useEffect, useState } from "react";

import { createPost, listPosts } from "@lib/api";
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

	const handleCreate = async post => {
		const newPost = await createPost(post);
		setPosts(prev => [newPost, ...prev]);
	};

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Posts posts={posts} onCreate={handleCreate} />
		</main>
	);
};

export default Application;
