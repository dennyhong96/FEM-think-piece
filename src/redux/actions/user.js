import { auth, db } from "@lib/firebase";
import { syncUserProfile } from "@lib/api";

export const USER_LOADED = "USER_LOADED";
export const AUTH_ERROR = "AUTH_ERROR";
export const PROFILE_UPDATED = "PROFILE_UPDATED";

export const subscribeToAuth = () => async dispatch => {
	let unsubFromProfileChange;

	const unsubscribe = auth.onAuthStateChanged(async user => {
		if (user) {
			// User signed in, sync with DB user profile
			const userProfile = await syncUserProfile(user);
			dispatch({
				type: USER_LOADED,
				payload: userProfile,
			});

			// Subscribe to profile updates
			unsubFromProfileChange = await dispatch(subscribeToProfileChange(userProfile.uid));
		} else {
			// Not signed in
			dispatch({
				type: AUTH_ERROR,
			});

			unsubFromProfileChange?.();
		}
	});

	return unsubscribe;
};

export const subscribeToProfileChange = uid => async dispatch => {
	const unsubscribe = db
		.collection("users")
		.doc(uid)
		.onSnapshot(snapshot => {
			const userProfile = { uid: snapshot.id, ...snapshot.data() };

			dispatch({
				type: PROFILE_UPDATED,
				payload: userProfile,
			});
		});

	return unsubscribe;
};
