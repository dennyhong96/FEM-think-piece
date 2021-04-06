import Link from "next/link";

import Authentication from "@components/Authentication";

const Layout = ({ children }) => {
	return (
		<main className="Application">
			<Link href="/" passHref>
				<a>
					<h1>Think Piece</h1>
				</a>
			</Link>
			<Authentication />
			{children}
		</main>
	);
};

export default Layout;
