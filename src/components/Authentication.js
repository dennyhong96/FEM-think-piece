import CurrentUser from "@components/CurrentUser";
import SignInAndSignUp from "@components/SignInAndSignUp";
import { useSelector } from "react-redux";

const Authentication = () => {
	const user = useSelector(({ user }) => user.user);

	return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
