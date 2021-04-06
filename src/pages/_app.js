import GlobalStyles from "@styles/globalStyles";
import { ReduxProvider } from "src/redux";

function MyApp({ Component, pageProps }) {
	return (
		<ReduxProvider>
			<GlobalStyles />
			<Component {...pageProps} />
		</ReduxProvider>
	);
}

export default MyApp;
