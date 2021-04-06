import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { subscribeToPosts } from "@redux/actions/post";
import { auth, syncUserProfile } from "@lib/firebase";
import Authentication from "@components/Authentication";
import Posts from "@components/Posts";

const Application = () => {
	const [user, setUser] = useState(null);
	const dispatch = useDispatch();

	// Posts subscription
	useEffect(() => {
		let unsubscribe;
		(async () => {
			unsubscribe = await dispatch(subscribeToPosts()).then(unsubFn => (unsubscribe = unsubFn));
		})();

		// Clean up
		return unsubscribe;
	}, []);

	// Auth subscription
	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async user => {
			if (user) {
				// signed in, sync with DB
				const userProfile = await syncUserProfile(user);
				setUser(userProfile);
			} else {
				// not signed in
				setUser(null);
			}
		});

		// Clean up
		return unsubscribe;
	}, []);

	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication user={user} />
			<Posts />
		</main>
	);
};

export default Application;
