import { COMMENTS_LOADED, POSTS_LOADED } from "../actions/post";

const INITIAL_STATE = {
	posts: [],
	comments: {},
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

		case COMMENTS_LOADED: {
			const { postId, comments } = payload;
			return {
				...state,
				comments: {
					...state.comments,
					[postId]: comments,
				},
			};
		}

		default: {
			return state;
		}
	}
};

export default postReducer;
