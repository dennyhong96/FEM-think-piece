import { ReduxProvider } from "src/redux";
import useUser from "@hooks/useUser";
import usePosts from "@hooks/usePosts";
import GlobalStyles from "@styles/globalStyles";

function App({ Component, pageProps }) {
	useUser();
	usePosts();

	return <Component {...pageProps} />;
}

function AppWrapper({ Component, pageProps }) {
	return (
		<ReduxProvider>
			<GlobalStyles />
			<App Component={Component} pageProps={pageProps} />
		</ReduxProvider>
	);
}

export default AppWrapper;
