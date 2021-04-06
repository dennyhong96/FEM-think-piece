import Authentication from "@components/Authentication";
import Posts from "@components/Posts";

const Application = () => {
	return (
		<main className="Application">
			<h1>Think Piece</h1>
			<Authentication />
			<Posts />
		</main>
	);
};

export default Application;
