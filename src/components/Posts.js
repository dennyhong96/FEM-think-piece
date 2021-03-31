import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Posts = ({ posts }) => {
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
