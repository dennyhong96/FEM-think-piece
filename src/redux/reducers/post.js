import { POSTS_LOADED } from "../actions/post";

const INITIAL_STATE = {
	posts: [],
};

const postReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;
	switch (type) {
		case POSTS_LOADED: {
			return {
				...state,
				posts: payload,
			};
		}

		default: {
			return state;
		}
	}
};

export default postReducer;
