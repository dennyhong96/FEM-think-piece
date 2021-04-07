import React from "react";
import Comment from "./Comment";
import AddComment from "./AddComment";

const Comments = ({ postId, comments }) => {
	return (
		<section className="Comments">
			<AddComment postId={postId} />
			{comments.map(comment => (
				<Comment key={comment.id} {...comment} />
			))}
		</section>
	);
};

export default Comments;
