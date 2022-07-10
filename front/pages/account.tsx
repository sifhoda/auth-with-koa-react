import { Link } from "react-router-dom";
import { Login } from "../components/login/login";

export const Account = ({
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
			<h2>vous etes dans le comtpte</h2>
			<Link to="/dashboard">Allez dans le dashboard</Link>
		</>
	);
};
