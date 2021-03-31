import CurrentUser from "@components/CurrentUser";
import SignInAndSignUp from "@components/SignInAndSignUp";

const Authentication = ({ user, loading }) => {
	if (loading) return null;

	return <div>{user ? <CurrentUser {...user} /> : <SignInAndSignUp />}</div>;
};

export default Authentication;
