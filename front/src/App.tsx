import "./App.css";
import { NavBar } from "../components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Dashboard } from "../pages/dashboard";
import { Account } from "../pages/account";
import { Settings } from "../pages/settings";
import { useToken } from "../lib/hooks";
import { Login, Signup } from "../components/login/login";

function App() {
	const { token, setToken } = useToken();
	return (
		<div>
			<NavBar token={token} setToken={setToken} />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route
					path="/dashboard"
					element={<Dashboard token={token} setToken={setToken} />}
				/>
				<Route
					path="/account"
					element={<Account token={token} setToken={setToken} />}
				/>
				<Route
					path="/settings"
					element={<Settings token={token} setToken={setToken} />}
				/>
				<Route
					path="/register"
					element={<Login setToken={setToken} toUrl="/" />}
				/>
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
