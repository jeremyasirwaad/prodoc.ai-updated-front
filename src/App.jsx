import { useState, useEffect } from "react";
import { Navbar } from "./common/Navbav/Navbar";
import "./App.css";
import physiotherapy from "./assets/physiotherapy.jpg";
import reportimg from "./assets/reports.webp";
import secondopinion from "./assets/secondopinion.jpg";
import neonatal from "./assets/neonatel.jpeg";
import Typewriter from "./common/Typewriter/Typewriter";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	const [count, setCount] = useState(0);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const imageUrls = [reportimg, physiotherapy, neonatal, secondopinion];
	const timeIntervals = [6900, 5300, 5700, 6000];

	useEffect(() => {
		if (localStorage.getItem("user-prodoc")) {
			navigate("/chat");
		}
	});

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
		}, timeIntervals[currentImageIndex]);

		return () => clearInterval(intervalId);
	}, [currentImageIndex, imageUrls]);

	return (
		<div className="landing-page">
			<div className="landing-sec1">
				<Navbar></Navbar>
				<div className="sec1-contents">
					<div className="sec1-inner-div"></div>
					<span className="land-title">Prodoc.ai</span>
					<span className="land-subtitle">
						A conversational Chat-Bot by{" "}
						<a
							style={{
								color: "rgb(29,112,95)",
								fontWeight: "700",
								cursor: "pointer"
							}}
							href="https://prodoc.io"
						>
							Prodoc
						</a>
					</span>
					<span className="land-subpara">
						We're here to simplify your healthcare journey, answer your
						questions, and connect you with the right experts. Your health, our
						priority.
					</span>
					<span
						className="land-subbutton"
						onClick={() => {
							navigate("/login");
						}}
					>
						Get Started
					</span>
				</div>
			</div>
			<div className="landing-sec2">
				<div className="navbar-right">
					<div className="navbar-right-inner">
						<span className="navbar-right-faq">FAQ</span>
						<span
							className="navbar-right-login-btn"
							onClick={() => {
								navigate("/login");
							}}
						>
							Login
						</span>
					</div>
				</div>
				<div className="sec2-contents">
					<div className="sec2-imagecontainer">
						{imageUrls.map((imageUrl, index) => {
							return (
								<img
									key={index}
									src={imageUrl}
									alt=""
									className={`image ${
										index === currentImageIndex ? `active${index}` : ""
									}`}
								/>
							);
						})}
						<div className="sec2-imagetext">
							<span>
								<Typewriter
									stringChangeDelay={2000}
									texts={[
										"Here are my medical reports, Whom should I consult with ?",
										"Suggest a good physiotherapist near me",
										"Find a hospital that has a neonatal ICU",
										"Looking for a second opinion, find me an alternative?"
									]}
									delay={80}
									infinite
								/>
							</span>
						</div>
					</div>
				</div>
				<div className="term-privacy">Terms of use | Privacy Policy</div>
			</div>
		</div>
	);
}

export default App;
