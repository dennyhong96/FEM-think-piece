import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import { useSelector } from "react-redux";

const Posts = () => {
	const posts = useSelector(({ post }) => post.posts);

	return (
		<section className="Posts">
			<AddPost />

			{posts.map(post => (
				<Post key={post.id} {...post} />
			))}
		</section>
	);
};

export default Posts;
