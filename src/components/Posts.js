import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Posts = ({ posts, onCreate }) => {
	return (
		<section className="Posts">
			<AddPost onCreate={onCreate} />
			{posts.map(post => (
				<Post key={post.id} {...post} />
			))}
		</section>
	);
};

export default Posts;
