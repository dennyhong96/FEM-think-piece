import { ReduxProvider } from "src/redux";
import { initSentry } from "@lib/sentry";
import useUser from "@hooks/useUser";
import usePosts from "@hooks/usePosts";
import ErrorBoundry from "@components/ErrorBoundry";
import Layout from "@components/Layout";
import GlobalStyles from "@styles/globalStyles";

// Initialize Sentry
initSentry();

function App({ Component, pageProps }) {
	useUser();
	usePosts();

	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

function AppWrapper({ Component, pageProps }) {
	return (
		<ErrorBoundry>
			<ReduxProvider>
				<GlobalStyles />
				<App Component={Component} pageProps={pageProps} />
			</ReduxProvider>
		</ErrorBoundry>
	);
}

export default AppWrapper;
