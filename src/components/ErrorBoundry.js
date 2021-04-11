import React from "react";

const { createBoundryError } = require("@lib/sentry");

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { error: null };
	}

	componentDidCatch(error, errorInfo) {
		// You can also log the error to an error reporting service
		this.setState({ error });
		createBoundryError({ error, errorInfo });
	}

	render() {
		if (this.state.error) {
			// You can render any custom fallback UI
			return <h1>Something went wrong.</h1>;
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
