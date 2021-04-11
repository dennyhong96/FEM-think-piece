import Posts from "@components/Posts";
import { createDefaultLog, createUserLog } from "@lib/sentry";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Home() {
	const user = useSelector(({ user }) => user.user);

	// Will be caught in ErrorBoundary
	// as long as code inside userEffect is not async
	useEffect(() => {
		throw new Error("New error.");
	}, []);

	// Event handlers won't be caught by ErrorBoundary
	const handleClick = () => {
		try {
			// do something...
			throw new Error("Error with user log.");
		} catch (error) {
			createUserLog({ error, user });
		}
	};

	const handleClick2 = () => {
		try {
			// do something...
			throw new Error("Error with default log.");
		} catch (error) {
			createDefaultLog(error);
		}
	};

	return (
		<Fragment>
			<Posts />
			<button onClick={handleClick}>Create an Error with Sentry user log</button>
			<button onClick={handleClick2}>Create an Error with Sentry default log</button>
		</Fragment>
	);
}
