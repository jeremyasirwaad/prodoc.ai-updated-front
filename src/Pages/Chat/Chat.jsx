import React, { useEffect, useState, useContext } from "react";
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

export const Chat = () => {
	const { user } = useContext(UserContext);
	const [sidenav, setSidenav] = useState(true);
	const [isHidden, setIsHidden] = useState(false);
	const [hidele, setHidele] = useState(false);
	const [inputPrompt, setInputPrompt] = useState("");
	const [msgHistory, setMsgHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [contextId, setcontextId] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		setcontextId(uuidv4());
		if (!localStorage.getItem("user-prodoc")) {
			navigate("/");
		}
	}, []);

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

	const sendPromt = () => {
		hideElement();
		setMsgHistory((oldArray) => [
			...oldArray,
			{ type: "user", message: inputPrompt }
		]);
		setLoading(true);
		setTimeout(() => {
			setMsgHistory((oldArray) => [
				...oldArray,
				{
					type: "model",
					message:
						"Hi this is Prodoc.ai, I am here to assist you on all regards related to medical domain. I can also suggest various doctors related to the prompts."
				}
			]);
			setLoading(false);
			setInputPrompt("");
		}, 3000);
	};

	return (
		<div className="chat-page">
			<div
				className={sidenav ? "chat-sidebar" : "chat-sidebar side-bar-closed"}
			>
				<div className="chat-sidebar-options ">
					<button className="new-chat-btn">
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
					<div className="chat-component">
						<BiMessageSquare size={19} color="white" />
						<span className="chat-history-title">How is Medical ?</span>
					</div>
					<div className="chat-component">
						<BiMessageSquare size={19} color="white" />
						<span className="chat-history-title">How is Medical ?</span>
					</div>
					<div className="chat-component">
						<BiMessageSquare size={19} color="white" />
						<span className="chat-history-title">How is Medical ?</span>
					</div>
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
					<span className={`chat-hero ${isHidden ? "transition-hero" : ""}`}>
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
					<div className="msg-container">
						{msgHistory.map((msg) => {
							if (msg.type === "user") {
								return <UserMsg msg={msg.message} src={user?.photoUrl} />;
							} else {
								return <BotMsg msg={msg.message} />;
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
