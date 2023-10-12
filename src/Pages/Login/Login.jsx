import React from "react";
import logo from "../../assets/prodoc.png";
import facebook_logo from "../../assets/facebook.png";
import google_logo from "../../assets/google.png";
import apple_logo from "../../assets/apple-logo.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const navigate = useNavigate();
	return (
		<div className="login-page">
			<div className="login-logo">
				<img src={logo} alt="" />
			</div>
			<div className="login-btns">
				<span>Welcome</span>
				<button
					onClick={() => {
						navigate("/chat");
					}}
				>
					<img src={google_logo} alt="" /> Continue with Google
				</button>
				<button>
					<img src={facebook_logo} alt="" /> Continue with Facebook
				</button>
				<button>
					<img src={apple_logo} alt="" /> Continue with Apple
				</button>
			</div>
			<div className="term-privacy-login">Terms of use | Privacy Policy</div>
		</div>
	);
};
