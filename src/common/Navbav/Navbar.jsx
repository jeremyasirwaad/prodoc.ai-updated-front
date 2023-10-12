import React from "react";
import "./Navbar.css";
import logo from "../../assets/prodoc.png";

export const Navbar = () => {
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
		</div>
	);
};
