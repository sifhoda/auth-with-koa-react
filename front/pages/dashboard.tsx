import { Login } from "../components/login/login";

export const Dashboard = ({
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
		<div>
			<h2>vous êtes dans le dashboard</h2>
		</div>
	);
};
