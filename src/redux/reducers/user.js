import { AUTH_ERROR, USER_LOADED } from "../actions/user";

const INITIAL_STATE = {
	user: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED: {
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
