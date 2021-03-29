import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";

const Posts = ({ posts, onCreate, handleRemove }) => {
	return (
		<section className="Posts">
			<AddPost onCreate={onCreate} />
			{posts.map(post => (
				<Post key={post.id} {...post} onRemove={handleRemove} />
			))}
		</section>
	);
};

export default Posts;
