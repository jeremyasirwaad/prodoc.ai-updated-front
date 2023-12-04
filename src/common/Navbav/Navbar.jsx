import React from "react";
import "./Navbar.css";
import logo from "../../assets/prodoc.png";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const navigate = useNavigate();
	return (
		<div className="navbar">
			<div className="nav-logo">
				<img src={logo} alt="" />
				<div className="nav-title">
					<span>Prodoc.ai</span>
					<span className="beta-tag">Alpha</span>
					{/* <span>Connected Healthcare</span> */}
				</div>
			</div>
			<div className="nav_mob_logins">
				<a
					target="_blank"
					href="https://forms.gle/T5WaRgS6zDQ8QYdD8"
					style={{ textDecoration: "none", marginRight: "10px" }}
				>
					Get Listed
				</a>
				<span
					onClick={() => {
						console.log("hitting");
						navigate("/faq");
					}}
				>
					FAQ
				</span>
			</div>
		</div>
	);
};
