import { Login } from "../components/login/login";

export const Settings = ({
	token,
	setToken,
}: {
	token: string;
	setToken: Function;
}) => {
	if (!token) {
		return <Login setToken={setToken} />;
	}
	return (
		<>
			<h2>vous êtes dans les parametres</h2>
		</>
	);
};
