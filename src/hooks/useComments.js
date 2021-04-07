import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { subscribeToComments } from "@redux/actions/post";

const useComments = ({ postId }) => {
	const dispatch = useDispatch();
	useEffect(() => {
		let unsubscribe;
		dispatch(subscribeToComments(postId)).then(fn => (unsubscribe = fn));
		return unsubscribe;
	}, [postId]);

	return null;
};

export default useComments;
