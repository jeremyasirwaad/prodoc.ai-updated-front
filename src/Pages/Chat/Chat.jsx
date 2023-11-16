import React, { useEffect, useState, useContext, useRef } from "react";
import "./Chat.css";
import {
	AiFillCloseCircle,
	AiOutlineLayout,
	AiOutlinePlus,
	AiOutlineClose
} from "react-icons/ai";
import { BiMessageSquare, BiRightTopArrowCircle } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { UserMsg } from "./ChatMsg/UserMsg";
import { BotMsg } from "./ChatMsg/BotMsg";
import { LoadingMsg } from "./ChatMsg/LoadingMsg";
import { PulseLoader } from "react-spinners";
import { json, useNavigate } from "react-router-dom";
import UserContext from "../../UserProvider";
import { v4 as uuidv4 } from "uuid";
import { model_url, openAI_url, url } from "../../../networl.config";
import { GrAttachment } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { Document, pdfjs } from "react-pdf";
import { Limit_over } from "../../PopUps/Limit_over.jsx";
import { is_24hrs_pass } from "../../helpers/Helpers.js";
import badge_24hrs from "../../assets/logo_only_24hrs.png";
import axios from "axios";

export const Chat = () => {
	pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
	const msgContainerRef = useRef(null);
	const Enter_button_ref = useRef(null);
	const { user, setUser } = useContext(UserContext);
	const [sidenav, setSidenav] = useState(true);
	const [isHidden, setIsHidden] = useState(false);
	const [hidele, setHidele] = useState(false);
	const [inputPrompt, setInputPrompt] = useState("");
	const [msgHistory, setMsgHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [contextId, setcontextId] = useState(uuidv4());
	const [sidebarhistory, setSidebarhistory] = useState([]);
	const [modelReply, setModelReply] = useState("");
	const [file, setFile] = useState(null);
	const [selectedFileName, setSelectedFileName] = useState("");
	const [fileContents, setFileContents] = useState("");
	const [location, setLocation] = useState(null);
	const [city, setCity] = useState("");
	const [locationStatus, setLocationStatue] = useState(false);
	const [show_limit_over, setShow_limit_over] = useState(false);

	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("user-prodoc")) {
			navigate("/");
		} else {
			getHistory();
			console.log(user);
		}
	}, [user]);

	useEffect(() => {
		const checkLocationPermission = async () => {
			try {
				const status = await navigator.permissions.query({
					name: "geolocation"
				});

				if (status.state === "granted") {
					// Location permission is already granted
					navigator.geolocation.getCurrentPosition(
						async (position) => {
							const latitude = position.coords.latitude;
							const longitude = position.coords.longitude;
							setLocation({ latitude, longitude });

							// Use reverse geocoding to get the city name
							try {
								const response = await fetch(
									`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
								);
								const data = await response.json();
								if (data) {
									const city = data.address.county;
									setCity(city);
									setLocationStatue(true);
								}
							} catch (error) {
								console.error("Error fetching city name:", error);
							}
						},
						(error) => {
							console.error(error.message);
						}
					);
				} else if (status.state === "prompt") {
					// Location permission is not granted but can be requested
					const position = await navigator.geolocation.getCurrentPosition();
					const latitude = position.coords.latitude;
					const longitude = position.coords.longitude;
					setLocation({ latitude, longitude });

					// Use reverse geocoding to get the city name
					try {
						const response = await fetch(
							`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
						);
						const data = await response.json();
						if (data) {
							const city = data.address.county;
							setCity(city);
							console.log(city);
							setLocationStatue(true);
						}
					} catch (error) {
						console.error("Error fetching city name:", error);
					}
				} else {
					// Location permission is denied
					console.error("Location permission is denied");
					setCity("Location Disabled");
					setLocationStatue(false);
				}
			} catch (error) {
				console.error("Error checking location permission:", error);
			}
		};

		checkLocationPermission();
	}, []);

	function loadScript(src) {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
			document.body.appendChild(script);
		});
	}

	async function displayRazorpay() {
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);

		if (!res) {
			alert("Razorpay SDK failed to load. Are you online?");
			return;
		}

		// creating a new order
		const result = await axios.post(`${url}payment/orders`);

		if (!result) {
			alert("Server error. Are you online?");
			return;
		}

		// Getting the order details back
		const { amount, id: order_id, currency } = result.data;

		const options = {
			key: "rzp_test_0a6Ol91FCqsw02", // Enter the Key ID generated from the Dashboard
			amount: amount.toString(),
			currency: currency,
			name: "Prodoc.ai",
			description: "24-hrs Unlimited free pass",
			order_id: order_id,
			handler: async function (response) {
				const data = {
					orderCreationId: order_id,
					razorpayPaymentId: response.razorpay_payment_id,
					razorpayOrderId: response.razorpay_order_id,
					razorpaySignature: response.razorpay_signature
				};

				const result = await axios.post(`${url}payment/success`, {
					payment: data,
					uid: user["uid"]
				});

				if (result.data.status == true) {
					window.location.reload();
				}
			},
			prefill: {
				name: user["displayName"],
				email: user["email"],
				contact: user["mob_otp"]
			},
			notes: {
				address: "Prodoc.ai"
			},
			theme: {
				color: "#16564a"
			}
		};

		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	const hideElement = () => {
		setIsHidden(true);
		setTimeout(() => {
			setHidele(true);
		}, 350);
	};

	const emergeElement = () => {
		setHidele(false);
		setIsHidden(false);
		// setTimeout(() => {}, 350);
	};

	const sendPromt = async () => {
		if (inputPrompt == "") {
			toast((t) => (
				<span>
					Please provide a <b>specific question</b> or <b>inquiry</b> along with
					the medical report for a more accurate and helpful response
				</span>
			));
			return;
		}
		var prompt = inputPrompt;
		// if (fileContents != "") {
		// 	prompt = fileContents + " ----------------> " + inputPrompt;
		// }
		hideElement();
		setMsgHistory((oldArray) => [
			...oldArray,
			{ type: "user", message: prompt, model: prompt }
		]);
		setLoading(true);
		setInputPrompt("");
		try {
			const response = await fetch(model_url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					context: prompt,
					history: msgHistory
				})
			})
				.then((res) => res.json())
				.then((data) => {
					setMsgHistory((oldArray) => [
						...oldArray,
						{
							type: "assisstant",
							message: data.message.reply,
							doc: data.message.doctors,
							hos: data.message.hospitals,
							model: JSON.stringify(data.message.model)
						}
					]);
					setModelReply(data.message.reply);
					setLoading(false);

					pushHistoryDB([
						{ type: "user", message: prompt, model: prompt },
						{
							type: "assisstant",
							message: data.message.reply,
							doc: data.message.doctors,
							hos: data.message.hospitals,
							model: JSON.stringify(data.message.model)
						}
					]);

					setFileContents("");
					document.getElementById("fileupload").value = null;
				});
		} catch (error) {
			console.error(error);
		}
	};

	const sendPromt_OpenAI = async () => {
		console.log(is_24hrs_pass(user["pass_last_brought"]));
		if (!is_24hrs_pass(user["pass_last_brought"]) && user["free_limit"] >= 5) {
			setShow_limit_over(true);
			return;
		}

		console.log(user["free_limit"]);

		if (inputPrompt == "") {
			toast((t) => (
				<span>
					Please provide a <b>specific question</b> or <b>inquiry</b> along with{" "}
					<b>medical report </b>
					for a more accurate and helpful response
				</span>
			));
			return;
		}
		var prompt = inputPrompt;

		hideElement();
		setMsgHistory((oldArray) => [
			...oldArray,
			{ type: "user", message: prompt, model: prompt }
		]);
		setLoading(true);
		setInputPrompt("");
		console.log({
			query: prompt,
			report: fileContents
		});
		try {
			const response = await fetch(openAI_url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					query: prompt,
					report: fileContents
				})
			})
				.then((res) => res.json())
				.then((data) => {
					setMsgHistory((oldArray) => [
						...oldArray,
						{
							type: "assistant",
							message: data.message,
							doc: data.Doctor && data.Doctor.length > 0 ? data.Doctor : [],
							hos:
								data.Hospital && data.Hospital.length > 0 ? data.Hospital : []
						}
					]);
					setModelReply(data.message.reply);
					setLoading(false);
					pushHistoryDB([
						{ type: "user", message: prompt, model: prompt },
						{
							type: "assisstant",
							message: data.message,
							doc: data.Doctor && data.Doctor.length > 0 ? data.Doctor : [],
							hos:
								data.Hospital && data.Hospital.length > 0 ? data.Hospital : []
						}
					]);
					user["free_limit"] = user["free_limit"] + 1;
					setUser(user);
					setFileContents("");
					document.getElementById("fileupload").value = null;
				});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		updateScroll();
	}, [msgHistory]);

	function updateScroll() {
		var element = document.getElementById("msg-cont");
		element.scroll({
			top: element.scrollHeight,
			behavior: "smooth"
		});
	}

	const pushHistoryDB = async (chatArray) => {
		try {
			const response = await fetch(`${url}addHistory`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					uid: user.uid,
					chat_id: contextId,
					chats: chatArray,
					is_24hrs: is_24hrs_pass(user["pass_last_brought"])
				})
			}).then(() => {
				getHistory();
			});
		} catch (error) {
			console.error(error);
		}
	};

	const getHistory = async () => {
		try {
			const response = await fetch(`${url}getHistory`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					uid: user?.uid
				})
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setSidebarhistory(data.data[0].history);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const onhandleSideClicks = (side_nav) => {
		const filtered_history = sidebarhistory.filter(
			(data) => data.chat_id == side_nav.chat_id
		);
		console.log(filtered_history[0].chats);
		setcontextId(side_nav.chat_id);
		hideElement();
		setMsgHistory(filtered_history[0].chats);
		// console.log(side_nav);
	};

	const newChat = () => {
		setcontextId(uuidv4());
		setInputPrompt("");
		setFileContents("");
		emergeElement();
	};

	const pdf_file_extract = (acceptedFiles) => {
		const file = acceptedFiles;
		const reader = new FileReader();

		reader.onload = async () => {
			const pdfData = new Uint8Array(reader.result);

			// Load the PDF using pdf.js
			const pdf = await pdfjs.getDocument({ data: pdfData }).promise;

			// Extract text from each page
			let textContent = "";
			for (let i = 1; i <= pdf.numPages; i++) {
				const page = await pdf.getPage(i);
				const pageText = await page.getTextContent();
				textContent += pageText.items.map((item) => item.str).join(" ");
			}

			console.log(textContent);
			setFileContents(textContent);
			setSelectedFileName(file.name);
		};

		reader.readAsArrayBuffer(file);
	};

	const deleteHistory = async (e, chatid) => {
		e.stopPropagation();
		const filtered_his = sidebarhistory.filter((his) => {
			return his.chat_id != chatid;
		});
		setSidebarhistory(filtered_his);
		try {
			const response = await fetch(`${url}delHistory`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					uid: user?.uid,
					chatid: chatid
				})
			})
				.then((res) => res.json())
				.then((data) => {
					toast.success("Chat deleted");
				});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="chat-page" ref={Enter_button_ref}>
			<Toaster position="top-right" reverseOrder={false} />
			{show_limit_over && (
				<Limit_over
					close={setShow_limit_over}
					displayRazorpay={displayRazorpay}
				/>
			)}
			<div
				className={sidenav ? "chat-sidebar" : "chat-sidebar side-bar-closed"}
			>
				<div className="chat-sidebar-options ">
					<button
						className="new-chat-btn"
						onClick={() => {
							setMsgHistory([]);
							newChat();
						}}
					>
						<AiOutlinePlus style={{ marginRight: "5px" }} /> New Chat
					</button>
					<button
						className="side-bar-close"
						onClick={() => {
							setSidenav(false);
						}}
					>
						<AiOutlineLayout size={20} color="white" />
					</button>
				</div>
				<div className="chat-history">
					{sidebarhistory.map((data) => {
						return (
							<div
								className="chat-component"
								onClick={() => {
									onhandleSideClicks(data);
								}}
							>
								<div
									style={{
										display: "flex",
										alignItems: "center",
										justifyContent: "center"
									}}
								>
									<BiMessageSquare size={19} color="white" />
									<span className="chat-history-title">
										{data.chats[0].message.slice(0, 17)}
									</span>
								</div>

								<AiOutlineClose
									className="chat-his-del-btn"
									size={17}
									color="white"
									onClick={(e) => {
										deleteHistory(e, data.chat_id);
									}}
								/>
							</div>
						);
					})}
				</div>
				<div className="side-bar-profile-section">
					<div className="profile-divider"></div>
					{user && !is_24hrs_pass(user["pass_last_brought"]) && (
						<div
							className="upgrade-pro"
							onClick={() => {
								setShow_limit_over(true);
							}}
						>
							<BiRightTopArrowCircle color="white" size={19} />
							<span>Buy 24-hrs Pass</span>
						</div>
					)}

					<div className="side-nav-profile">
						<img src={user?.photoUrl} alt="" />
						<span>{user?.displayName}</span>
						<FiLogOut
							className="logout-btn"
							fontSize={41}
							onClick={() => {
								localStorage.removeItem("user-prodoc");
								navigate("/");
							}}
						/>
					</div>
				</div>
			</div>
			<div className="chat-section">
				<div className="chat-nav">
					<div
						className={sidenav ? "side-nav-open-btn-none" : "side-nav-open-btn"}
						onClick={() => {
							setSidenav(true);
						}}
					>
						<AiOutlineLayout size={20} color="white" />
					</div>
				</div>

				<div className="chat-cont">
					<span className="location-status">
						{city == "" ? (
							<PulseLoader size={7} color="rgb(164, 164, 164)" />
						) : (
							city
						)}
					</span>
					<span
						className={`chat-hero ${isHidden ? "transition-hero" : ""}`}
						onClick={updateScroll}
					>
						Prodoc.ai
						{user && is_24hrs_pass(user["pass_last_brought"]) && (
							<img
								className={`chat-hero-badge ${
									isHidden ? "chat-hero-badge-transition" : ""
								}`}
								src={badge_24hrs}
								alt=""
							/>
						)}
					</span>

					{!hidele && (
						<div
							className={`chat-suggestions  ${
								isHidden ? "transition-hide" : ""
							}`}
						>
							<div
								className="chat-suggestion"
								onClick={() => {
									setInputPrompt(
										"Here are my medical reports, Whom should I consult with ?"
									);
								}}
							>
								<span className="chat-suggestion-title">Reports</span>
								<span>
									Here are my medical reports, Whom should I consult with ?
								</span>
							</div>
							<div
								className="chat-suggestion"
								onClick={() => {
									setInputPrompt(
										"Looking for an second opinion, find me an alternative"
									);
								}}
							>
								<span className="chat-suggestion-title">Alternatives</span>
								<span>
									Looking for an second opinion, find me an alternative
								</span>
							</div>
							<div
								className="chat-suggestion"
								onClick={() => {
									setInputPrompt("Find a hospital that has neonatal ICU");
								}}
							>
								<span className="chat-suggestion-title">Search</span>
								<span>Find a hospital that has neonatal ICU</span>
							</div>
							<div
								className="chat-suggestion"
								onClick={() => {
									setInputPrompt("Suggest a good physiotherapist near me");
								}}
							>
								<span className="chat-suggestion-title">Suggestion</span>
								<span>Suggest a good physiotherapist near me</span>
							</div>
						</div>
					)}

					<div className="chat-input-cont">
						{fileContents != "" && (
							<div className="file-display">
								<span className="selected-file-name">
									{selectedFileName.slice(0, 40)}
								</span>
								<AiFillCloseCircle
									style={{ cursor: "pointer" }}
									color="rgb(22, 86, 74)"
									onClick={() => {
										setFileContents("");
									}}
								/>
							</div>
						)}

						<div className="chat-input">
							<div>
								<label for="fileupload" className="file_upload">
									<GrAttachment />
								</label>
								<input
									type="file"
									id="fileupload"
									accept=".pdf"
									style={{ display: "none" }}
									onChange={(e) => {
										const selectedFile = e.target.files[0];
										setFile(selectedFile);
										pdf_file_extract(selectedFile);
									}}
								/>
							</div>
							<textarea
								type="text"
								placeholder="Send a message"
								value={inputPrompt}
								onChange={(e) => {
									setInputPrompt(e.target.value);
								}}
							/>
							{loading ? (
								<PulseLoader size={4} className="send-btn" />
							) : (
								<AiOutlineSend
									className={fileContents != "" ? "send-btn-file" : "send-btn"}
									size={25}
									onClick={() => {
										sendPromt_OpenAI();
									}}
								/>
							)}
						</div>
						{/* <span>Hello</span> */}
					</div>
					<div className="msg-container" id="msg-cont" ref={msgContainerRef}>
						{msgHistory.map((msg) => {
							var doc = [
								[
									{
										name: "Jeremy",
										spec: "Nephrologist",
										exp: 15,
										Latitude: 10.998532,
										Longitude: 77.009224,
										summary:
											"lornals djalks dlka sdlka sldajs ldkasj dlkas dlka jskld jalskd jklas djlkasdjl akjsdlk ajsldk jalskd"
									}
								]
							];
							if (msg.type === "user") {
								return <UserMsg msg={msg.message} src={user?.photoUrl} />;
							} else {
								return (
									<BotMsg
										msg={msg.message}
										doc={msg.doc}
										hos={msg.hos}
										modelReply={modelReply}
									/>
								);
							}
						})}
						{loading && <LoadingMsg />}
					</div>
				</div>
			</div>
		</div>
	);
};
