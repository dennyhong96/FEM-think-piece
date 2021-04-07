import { updateUser } from "@lib/api";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
	const user = useSelector(({ user }) => user.user);
	const [{ displayName, file }, setState] = useState({
		displayName: user?.displayName ?? "",
		file: null,
	});
	const fileInputRef = useRef();

	const handleChange = evt => {
		const { name, value } = evt.target;
		setState(prev => ({ ...prev, [name]: value }));
	};

	const handleFile = evt => {
		const file = evt.target?.files?.[0];
		if (!file) return;
		setState(prev => ({ ...prev, file }));
	};

	const handleSubmit = async evt => {
		evt.preventDefault();
		await updateUser({
			uid: user.uid,
			...(displayName && { displayName }),
			...(file && { photo: file }),
		});

		if (!file) return;
		setState(prev => ({
			...prev,
			file: null,
		}));
		fileInputRef.current.value = "";
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				type="text"
				name="displayName"
				value={displayName}
				onChange={handleChange}
				placeholder="Enter a display name"
			/>
			<input type="file" name="file" onChange={handleFile} ref={fileInputRef} />
			<input type="submit" value="Update Profile" />
		</form>
	);
};

export default Profile;
