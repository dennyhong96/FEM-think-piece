import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { subscribeToPosts } from "@redux/actions/post";

const usePosts = () => {
	const dispatch = useDispatch();

	// Posts subscription
	useEffect(() => {
		let unsubscribe;
		dispatch(subscribeToPosts()).then(fn => (unsubscribe = fn));
		return unsubscribe;
	}, []);

	return null;
};

export default usePosts;
