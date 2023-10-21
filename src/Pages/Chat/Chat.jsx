import React, { useEffect, useState, useContext, useRef } from "react";
import "./Chat.css";
import { AiOutlineLayout, AiOutlinePlus } from "react-icons/ai";
import { BiMessageSquare, BiRightTopArrowCircle } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { UserMsg } from "./ChatMsg/UserMsg";
import { BotMsg } from "./ChatMsg/BotMsg";
import { LoadingMsg } from "./ChatMsg/LoadingMsg";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import UserContext from "../../UserProvider";
import { v4 as uuidv4 } from "uuid";
import { model_url, url } from "../../../networl.config";
import { GrAttachment } from "react-icons/gr";
import { FiLogOut } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

export const Chat = () => {
	const msgContainerRef = useRef(null);
	const { user } = useContext(UserContext);
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
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("user-prodoc")) {
			navigate("/");
		} else {
			getHistory();
		}
	}, [user]);

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

	const prompt = "";

	const sendPromt = async () => {
		hideElement();
		setMsgHistory((oldArray) => [
			...oldArray,
			{ type: "user", message: inputPrompt }
		]);
		setLoading(true);
		try {
			const response = await fetch(model_url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					context: inputPrompt
				})
			})
				.then((res) => res.json())
				.then((data) => {
					setMsgHistory((oldArray) => [
						...oldArray,
						{
							type: "model",
							message: data.message.reply,
							doc: data.message.doctors
						}
					]);
					setModelReply(data.message.reply);
					setLoading(false);

					pushHistoryDB([
						{ type: "user", message: inputPrompt },
						{
							type: "model",
							message: data.message.reply,
							doc: data.message.doctors
						}
					]);
					setInputPrompt("");
				});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		updateScroll();
	}, [msgHistory]);

	// const handleEnterKeyPress = (event) => {
	// 	if (event.key === "Enter") {
	// 		sendPromt();
	// 	}
	// };

	// useEffect(() => {
	// 	// Attach event listener when the component mounts
	// 	document.addEventListener("keydown", handleEnterKeyPress);
	// }, []);

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
					chats: chatArray
				})
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
		hideElement();
		setMsgHistory(filtered_history[0].chats);
		// console.log(side_nav);
	};

	const newChat = () => {
		setcontextId(uuidv4());
		emergeElement();
	};

	const pdf_file_extract = (acceptedFiles) => {
		const file = acceptedFiles;
		setSelectedFileName(file.name);

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

			setPdfText(textContent);
			setNumPages(pdf.numPages);
			HandleSubmit(textContent);
		};

		reader.readAsArrayBuffer(file);
	};

	return (
		<div className="chat-page">
			<Toaster position="top-right" reverseOrder={false} />
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
					{sidebarhistory.slice(0, 10).map((data) => {
						return (
							<div
								className="chat-component"
								onClick={() => {
									onhandleSideClicks(data);
								}}
							>
								<BiMessageSquare size={19} color="white" />
								<span className="chat-history-title">
									{data.chats[0].message.slice(0, 17)}
								</span>
							</div>
						);
					})}
				</div>
				<div className="side-bar-profile-section">
					<div className="profile-divider"></div>
					<div className="upgrade-pro">
						<BiRightTopArrowCircle color="white" size={19} />
						<span> Upgrade to Pro</span>
					</div>
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
					<span
						className={`chat-hero ${isHidden ? "transition-hero" : ""}`}
						onClick={updateScroll}
					>
						Prodoc.ai
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
								className="send-btn"
								size={25}
								onClick={() => {
									sendPromt();
								}}
							/>
						)}
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
								if (msg.doc != null || msg.doc != undefined) {
									return (
										<BotMsg
											msg={msg.message}
											doc={msg.doc}
											modelReply={modelReply}
										/>
									);
								} else {
									return (
										<BotMsg
											msg={msg.message}
											doc={[]}
											modelReply={modelReply}
										/>
									);
								}
							}
						})}
						{loading && <LoadingMsg />}
						{/* <UserMsg msg={"Suggest me a good neonatal hospital nearby"} />
						<BotMsg msg={"Here is a list of good neanatal hospitals nearby"} /> */}
					</div>
				</div>
			</div>
		</div>
	);
};
