import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { subscribeToAuth } from "@redux/actions/user";

const useUser = () => {
	const dispatch = useDispatch();

	// Auth subscription
	useEffect(() => {
		let unsubscribe;
		dispatch(subscribeToAuth()).then(fn => (unsubscribe = fn));
		return () => {
			console.log("about to unsubscribe from auth");
			unsubscribe();
		};
	}, []);

	return null;
};

export default useUser;
