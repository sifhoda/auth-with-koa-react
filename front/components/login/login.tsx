import { ChangeEvent, SyntheticEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

const etablissements = [
	"Etablissement",
	"High Tech",
	"Maroconcept",
	"EMSI",
	"UPM",
];

type LoginProps = {
	setToken: Function;
	toUrl?: "/" | "/dashboard" | "/account";
};

export const Login = ({ setToken, toUrl }: LoginProps) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [error, setError] = useState({
		err: false,
		msg: "",
	});
	const navigate = useNavigate();

	const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setError({
			err: false,
			msg: "",
		});
		setEmail(event.target.value);
	};

	const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setError({
			err: false,
			msg: "",
		});
		setPassword(event.target.value);
	};

	const toggleShowPassword = () => setShowPassword(!showPassword);

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();

		const endpoint = "http://localhost:8000/auth/register";

		const options: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		};

		const result = await fetch(endpoint, options);

		if (result.ok) {
			const response = await result.json();
			setToken(response.citoyen);
			if (toUrl) {
				navigate(toUrl);
			}
		} else {
			const msg = await result.text();
			setError({
				err: true,
				msg,
			});
		}
	};

	return (
		<div className="container">
			<form onSubmit={handleSubmit}>
				<div
					className={`input-control ${
						email !== "" && "active-input"
					}`}
				>
					<input
						type="email"
						name="email"
						id="email"
						onChange={emailChange}
						placeholder="E-Mail*"
					/>
					<img src="public/email.svg" alt="email" />
				</div>
				<div
					className={`input-control ${
						password !== "" && "active-input"
					}`}
				>
					<input
						type={!showPassword ? "password" : "text"}
						name="password"
						id="password"
						onChange={passwordChange}
						placeholder="Mot de passe*"
					/>
					{!showPassword ? (
						<img
							onClick={toggleShowPassword}
							src="public/eye.svg"
							alt="eye"
						/>
					) : (
						<img
							onClick={toggleShowPassword}
							src="public/eye-off.svg"
							alt="email"
						/>
					)}
				</div>
				<button type="submit">Se Connecter</button>

				<div className="other-info">
					<a href="#" className="forget-password">
						mot de passe oublié
					</a>
					<Link to="/signup" className="signup">
						S'inscrire
					</Link>
				</div>

				{error.err && <div className="error">{error.msg}</div>}
			</form>
		</div>
	);
};

export const Signup = () => {
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [email, setEmail] = useState("");
	const [etablissement, setEtablissement] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [error, setError] = useState({
		err: false,
		msg: "",
	});

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const navigate = useNavigate();

	const nomChange = (event: ChangeEvent<HTMLInputElement>) => {
		setNom(event.target.value);
		setError((el) => ({ ...el, err: false }));
	};
	const prenomChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPrenom(event.target.value);
		setError((el) => ({ ...el, err: false }));
	};
	const emailChange = (event: ChangeEvent<HTMLInputElement>) => {
		setEmail(event.target.value);
		setError((el) => ({ ...el, err: false }));
	};
	const passwordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value);
		setError((el) => ({ ...el, err: false }));
	};
	const etablissementChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setEtablissement(event.target.value);
		setError((el) => ({ ...el, err: false }));
	};
	const confirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(event.target.value);
		setError((el) => ({ ...el, err: false }));
	};
	const toggleShowPassword = () => setShowPassword(!showPassword);
	const toggleShowConfirmPassword = () =>
		setShowConfirmPassword(!showConfirmPassword);
	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		if (password !== confirmPassword) {
			setError({
				err: true,
				msg: "Error: passwords are different",
			});

			return;
		}
		const data = {
			nom,
			prenom,
			email,
			password,
			etablissement,
		};

		console.log(JSON.stringify(data));

		let endpoint = "http://localhost:8000/citoyen/";

		const options: RequestInit = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		};

		let result = await fetch(endpoint, options);

		if (result.ok) {
			navigate("/dashboard");
		} else {
			const msg = await result.text();
			setError({
				err: true,
				msg,
			});
		}
	};
	return (
		<div className="container">
			<form onSubmit={handleSubmit} id="form">
				<div className="input-control">
					<input
						type="text"
						name="nom"
						id="nom"
						placeholder="Nom"
						onChange={nomChange}
						required
					/>
				</div>
				<div className="input-control">
					<input
						type="text"
						name="prenom"
						id="prenom"
						placeholder="Prenom"
						onChange={prenomChange}
						required
					/>
				</div>
				<div className="input-control">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="E-Mail"
						onChange={emailChange}
						required
					/>
					<img src="public/email.svg" alt="email" />
				</div>
				<div className="input-control">
					<select
						required
						name="etablissement"
						id="etablissement"
						onChange={etablissementChange}
					>
						{etablissements.map((el) => (
							<option key={el} value={el}>
								{el}
							</option>
						))}
					</select>
				</div>
				<div className="input-control">
					<input
						type={!showPassword ? "password" : "text"}
						name="password"
						id="password"
						placeholder="Mot de passe"
						onChange={passwordChange}
						required
					/>
					{!showPassword ? (
						<img
							onClick={toggleShowPassword}
							src="public/eye.svg"
							alt="password"
						/>
					) : (
						<img
							onClick={toggleShowPassword}
							src="public/eye-off.svg"
							alt="password"
						/>
					)}
				</div>
				<div className="input-control">
					<input
						type={!showConfirmPassword ? "password" : "text"}
						name="confirm-password"
						id="confirm-password"
						placeholder="Confirmer mot de passe"
						onChange={confirmPasswordChange}
						required
					/>
					{!showConfirmPassword ? (
						<img
							onClick={toggleShowConfirmPassword}
							src="public/eye.svg"
							alt="password"
						/>
					) : (
						<img
							onClick={toggleShowConfirmPassword}
							src="public/eye-off.svg"
							alt="password"
						/>
					)}
				</div>
				<button type="submit">S'inscrire</button>
				{error.err && <div className="error">{error.msg}</div>}
			</form>
		</div>
	);
};
