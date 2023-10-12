import React, { useContext } from "react";
import logo from "../../assets/prodoc.png";
import facebook_logo from "../../assets/facebook.png";
import google_logo from "../../assets/google.png";
import apple_logo from "../../assets/apple-logo.png";
import jwt from "jsonwebtoken";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { auth, jwt_key } from "../../config-firebase";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import UserContext from "../../UserProvider";
// import { Buffer } from "buffer";
// globalThis.Buffer = Buffer;

export const Login = () => {
	const { setUser } = useContext(UserContext);
	const signInGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then((data) => {
				console.log(data.user);
				const expiresIn = "7d";
				const user = {
					uid: data.user.uid,
					email: data.user.email,
					photoUrl: data.user.photoURL,
					phoneNumber: data.user.phoneNumber,
					displayName: data.user.displayName
				};
				const token = jwt.sign(user, jwt_key, { expiresIn });
				console.log(token);
				localStorage.setItem("user-prodoc", token);
				setUser(user);
				navigate("/chat");
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const handleFacebookLogin = () => {
		const provider = new FacebookAuthProvider();

		signInWithPopup(auth, provider)
			.then((data) => {
				console.log(data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

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
						signInGoogle();
						// navigate("/chat");
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
