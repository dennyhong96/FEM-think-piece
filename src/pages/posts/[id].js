import { useRouter } from "next/router";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import useComments from "@hooks/useComments";
import Post from "@components/Post";
import Comments from "@components/Comments";

const PostPage = () => {
	const router = useRouter();
	const id = router.query.id;

	useComments({ postId: id });
	const comments = useSelector(({ post }) => post.comments[id]);
	const post = useSelector(({ post }) => post.posts.find(post => post.id === id));

	return (
		<Fragment>
			{post && <Post {...post} />}
			<Comments postId={id} comments={comments ?? []} />
		</Fragment>
	);
};

export default PostPage;
