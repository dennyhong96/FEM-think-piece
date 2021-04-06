import { useState } from "react";

import { auth, signInWithGoogle } from "@lib/firebase";

const SignIn = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async evt => {
		evt.preventDefault();

		await auth.signInWithEmailAndPassword(email, password);

		setEmail("");
		setPassword("");
	};

	return (
		<form className="SignIn" onSubmit={handleSubmit}>
			<h2>Sign In</h2>

			<input
				type="email"
				name="email"
				placeholder="Email"
				value={email}
				onChange={evt => setEmail(evt.target.value)}
			/>

			<input
				type="password"
				name="password"
				placeholder="Password"
				value={password}
				onChange={evt => setPassword(evt.target.value)}
			/>

			<input type="submit" value="Sign In" />

			<button type="button" onClick={signInWithGoogle}>
				Sign In With Google
			</button>
		</form>
	);
};

export default SignIn;
