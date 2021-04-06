import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducers/index";

const store = createStore(
	rootReducer,
	process.env.NODE_ENV === "production"
		? applyMiddleware(reduxThunk)
		: composeWithDevTools(applyMiddleware(reduxThunk)),
);

export const ReduxProvider = ({ children }) => {
	return <Provider store={store}>{children}</Provider>;
};
