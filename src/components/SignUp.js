import React, { useState } from "react";

import { auth } from "@lib/firebase";
import { syncUserProfile } from "@lib/api";

const INITIAL_STATE = { displayName: "", email: "", password: "" };

const SignUp = () => {
	const [{ displayName, email, password }, setState] = useState(INITIAL_STATE);

	const handleChange = evt => {
		const { name, value } = evt.target;
		setState(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async evt => {
		evt.preventDefault();
		const { user } = await auth.createUserWithEmailAndPassword(email, password);
		syncUserProfile({ uid: user.uid, email: user.email, photoURL: user.photoURL, displayName });
		setState({ displayName: "", email: "", password: "" });
	};

	return (
		<form className="SignUp" onSubmit={handleSubmit}>
			<h2>Sign Up</h2>

			<input
				type="text"
				name="displayName"
				placeholder="Display Name"
				value={displayName}
				onChange={handleChange}
			/>
			<input type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />

			<input
				type="password"
				name="password"
				placeholder="Password"
				value={password}
				onChange={handleChange}
			/>

			<input type="submit" value="Sign Up" />
		</form>
	);
};

export default SignUp;
