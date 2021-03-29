import { Fragment } from "react";

import GlobalStyles from "@styles/globalStyles";

function MyApp({ Component, pageProps }) {
	return (
		<Fragment>
			<GlobalStyles />
			<Component {...pageProps} />
		</Fragment>
	);
}

export default MyApp;
