import { AUTH_ERROR, PROFILE_UPDATED, USER_LOADED } from "../actions/user";

const INITIAL_STATE = {
	user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
		case PROFILE_UPDATED: {
			return {
				...state,
				user: payload,
			};
		}

		case AUTH_ERROR: {
			return {
				...state,
				user: null,
			};
		}

		default: {
			return state;
		}
	}
};

export default userReducer;
