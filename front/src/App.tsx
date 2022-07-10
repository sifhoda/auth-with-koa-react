import "./App.css";
import { NavBar } from "../components/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Dashboard } from "../pages/dashboard";
import { Account } from "../pages/account";
import { Settings } from "../pages/settings";
import { useToken } from "../lib/hooks";
import { Signup } from "../components/login/login";

function App() {
	const { token, setToken } = useToken();
	return (
		<div>
			<NavBar />
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
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</div>
	);
}

export default App;
