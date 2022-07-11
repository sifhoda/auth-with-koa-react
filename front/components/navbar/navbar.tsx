import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

export const NavBar = ({
	token,
	setToken,
}: {
	token: string;
	setToken: Function;
}) => {
	const [active, setActive] = useState(false);

	const toogleNav = () => setActive(!active);

	const logout = () => setToken({});
	return (
		<>
			<nav>
				<Link
					to="/"
					className="nav-icon"
					aria-label="visiter la page d'accueil"
					aria-current="page"
				>
					<img src="public/logo.svg" alt="app logo" />
					<span>STE Maroconcept</span>
				</Link>
				<div className="main-navlinks">
					<button
						className={`hamburger ${active && "open"}`}
						type="button"
						aria-label="Faire apparaittre la navigation"
						aria-expanded={active ? "true" : "false"}
						onClick={toogleNav}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>
				<div className={`navlinks-container ${active && "open"}`}>
					<ul>
						<li>
							<div className="dropdown">
								<a className="dropbtn">
									<span>menu1</span>
									<img src="public/chevron-down.svg" />
								</a>

								<div className="dropdown-content">
									<a href="#">Link1</a>
									<a href="#">Link2</a>
									<a href="#">Link3</a>
									<a href="#">Link4</a>
									<a href="#">Link5</a>
								</div>
							</div>
						</li>
						<li>
							<div className="dropdown">
								<a className="dropbtn">
									<span>menu2</span>
									<img src="public/chevron-down.svg" />
								</a>

								<div className="dropdown-content">
									<a href="#">Link6</a>
									<a href="#">Link7</a>
									<a href="#">Link8</a>
									<a href="#">Link9</a>
									<a href="#">Link10</a>
								</div>
							</div>
						</li>
						<li>
							<div className="dropdown">
								<a className="dropbtn">
									<span>menu3</span>
									<img src="public/chevron-down.svg" />
								</a>
								<div className="dropdown-content">
									<a href="#">Link11</a>
									<a href="#">Link12</a>
									<a href="#">Link13</a>
									<a href="#">Link14</a>
								</div>
							</div>
						</li>
						<li>
							<div className="dropdown">
								<a className="dropbtn">
									<span>menu4</span>
									<img src="public/chevron-down.svg" />
								</a>
								<div className="dropdown-content">
									<a href="#">Link15</a>
									<a href="#">Link16</a>
									<Link to="/dashboard">Link17</Link>
									<Link to="/account">Link18</Link>
									<Link to="/settings">Link19</Link>
								</div>
							</div>
						</li>
					</ul>
				</div>
				<div className="nav-auth">
					<a href="#" className="sign-user" aria-label="se connecter">
						<img src="public/user.svg" alt="" />
					</a>
					<div className="sign-btns">
						{!token ? (
							<Link to="/register">Se Connecter</Link>
						) : (
							<a href="#" onClick={logout}>
								Se deconnecter
							</a>
						)}
					</div>
				</div>
			</nav>
		</>
	);
};
