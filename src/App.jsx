import { useState, useEffect } from "react";
import { Navbar } from "./common/Navbav/Navbar";
import "./App.css";
import physiotherapy from "./assets/doc_img_land2.jpeg";
import reportimg from "./assets/report_img_land2.jpeg";
import secondopinion from "./assets/doc_consult_land.jpeg";
import neonatal from "./assets/neo_img_land.jpeg";
import Typewriter from "./common/Typewriter/Typewriter";
import { useNavigate } from "react-router-dom";

function App() {
	const navigate = useNavigate();
	const [count, setCount] = useState(0);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const imageUrls = [reportimg, physiotherapy, neonatal, secondopinion];
	const timeIntervals = [6900, 5300, 5700, 6000];

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
	// 	}, timeIntervals[currentImageIndex]);

	// 	return () => clearInterval(intervalId);
	// }, [currentImageIndex, imageUrls]);

	return (
		<div className="landing-page">
			<div className="landing-sec1">
				<Navbar></Navbar>
				<div className="sec1-contents">
					<div className="sec1-inner-div"></div>
					<h1 className="land-title">
						Find the right specialist for your surgery{" "}
					</h1>
					<span className="land-subtitle">
						Upload your medical diagnosis, locate the ideal specialist, and
						schedule an appointment with just one click.
						{/* <a
							style={{
								color: "rgb(29,112,95)",
								fontWeight: "700",
								cursor: "pointer"
							}}
							href="https://prodoc.io"
						>
							Prodoc
						</a> */}
					</span>
					<span className="land-subpara">
						Transforming the Approach to Healthcare Discovery
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
						<a
							href="https://forms.gle/T5WaRgS6zDQ8QYdD8"
							// onClick={() => {
							// 	navigate("/forms");
							// }}
							className="navbar-right-faq"
							style={{ textDecoration: "none" }}
							target="_blank"
						>
							Get Listed
						</a>
						<span
							onClick={() => {
								navigate("/faq");
							}}
							className="navbar-right-faq"
						>
							FAQ
						</span>
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
									title={imageUrl}
									key={index}
									src={imageUrl}
									alt={imageUrl}
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
									onTextChange={(index, delay) => {
										// Your callback logic here
										// console.log(
										// 	`Text changed to index ${index} with a delay of ${delay} milliseconds`
										// );
										setTimeout(() => {
											setCurrentImageIndex(
												(prevIndex) => (prevIndex + 1) % imageUrls.length
											);
										}, 2000);
									}}
								/>
							</span>
						</div>
					</div>
				</div>
				<div className="term-privacy">
					<span
						style={{ cursor: "pointer" }}
						onClick={() => {
							navigate("/termsofuse");
						}}
					>
						Terms of use
					</span>{" "}
					|{" "}
					<span
						style={{ cursor: "pointer" }}
						onClick={() => {
							navigate("/declaration/view");
						}}
					>
						Privacy Policy
					</span>
				</div>
			</div>
		</div>
	);
}

export default App;
