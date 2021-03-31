import { useState } from "react";

import { createPost } from "@lib/api";

const AddPost = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	const handleSubmit = async evt => {
		evt.preventDefault();

		const post = {
			title,
			content,
			user: {
				uid: "1111",
				displayName: "Steve Kinney",
				email: "steve@mailinator.com",
				photoURL: "http://placekitten.com/g/200/200",
			},
			stars: 0,
			comments: 0,
			createdAt: new Date(),
		};

		await createPost(post);

		setTitle("");
		setContent("");
	};

	return (
		<form onSubmit={handleSubmit} className="AddPost">
			<input
				type="text"
				name="title"
				placeholder="Title"
				value={title}
				onChange={evt => setTitle(evt.target.value)}
			/>
			<input
				type="text"
				name="content"
				placeholder="Body"
				value={content}
				onChange={evt => setContent(evt.target.value)}
			/>
			<input className="create" type="submit" value="Create Post" />
		</form>
	);
};

export default AddPost;
