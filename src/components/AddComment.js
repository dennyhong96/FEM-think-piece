import { createComment } from "@lib/api";
import { useState } from "react";
import { useSelector } from "react-redux";

const AddComment = ({ postId }) => {
	const [content, setContent] = useState("");
	const user = useSelector(({ user }) => user.user);

	const handleChange = evt => {
		setContent(evt.target.value);
	};

	const handleSubmit = async evt => {
		evt.preventDefault();
		await createComment({ postId, content, user });
		setContent("");
	};

	return (
		<form onSubmit={handleSubmit} className="AddComment">
			<input
				type="text"
				name="content"
				placeholder="Comment"
				value={content}
				onChange={handleChange}
			/>
			<input className="create" type="submit" value="Create Comment" />
		</form>
	);
};

export default AddComment;
