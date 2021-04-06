import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { subscribeToPosts } from "@redux/actions/post";
import { subscribeToAuth } from "@redux/actions/user";
import Authentication from "@components/Authentication";
import Posts from "@components/Posts";

const Application = () => {
	const dispatch = useDispatch();

	// Posts subscription
	useEffect(() => {
		let unsubscribe;
		(async () => {
			unsubscribe = await dispatch(subscribeToPosts()).then(fn => (unsubscribe = fn));
		})();

		// Clean up
		return unsubscribe;
	}, []);

	// Auth subscription
	useEffect(() => {
		let unsubscribe;
		(async () => {
			unsubscribe = await dispatch(subscribeToAuth()).then(fn => (unsubscribe = fn));
		})();

		// Clean up
		return unsubscribe;
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication />
			<Posts />
		</main>
	);
};

export default Application;
