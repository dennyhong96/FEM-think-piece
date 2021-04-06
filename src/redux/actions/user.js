import { auth } from "@lib/firebase";
import { syncUserProfile } from "@lib/api";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";

export const subscribeToAuth = () => async dispatch => {
	const unsubscribe = auth.onAuthStateChanged(async user => {
		if (user) {
			// signed in, sync with DB
			const userProfile = await syncUserProfile(user);
			dispatch({
				type: USER_LOADED,
				payload: userProfile,
			});
		} else {
			// not signed in
			dispatch({
				type: AUTH_ERROR,
			});
		}
	});

	return unsubscribe;
};
