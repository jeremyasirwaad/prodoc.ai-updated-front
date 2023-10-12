import React, { useState } from "react";
import "./Chat.css";
import { AiOutlineLayout, AiOutlinePlus } from "react-icons/ai";
import { BiMessageSquare, BiRightTopArrowCircle } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import { UserMsg } from "./ChatMsg/UserMsg";
import { BotMsg } from "./ChatMsg/BotMsg";

export const Chat = () => {
	const [sidenav, setSidenav] = useState(true);
	const [isHidden, setIsHidden] = useState(false);
	const [hidele, setHidele] = useState(false);

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
						<img
							src="https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocIVOhL9jtkBx0G_vCWCO50jLDoDLGjkkgr3qlB6FBtPJ9tA%3Ds96-c&w=64&q=75"
							alt=""
						/>
						<span>Jeremy Asirwaad</span>
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
					{!hidele && (
						<span className={`chat-hero ${isHidden ? "transition-hide" : ""}`}>
							Prodoc.ai
						</span>
					)}
					{!hidele && (
						<div
							className={`chat-suggestions  ${
								isHidden ? "transition-hide" : ""
							}`}
						>
							<div className="chat-suggestion">
								<span className="chat-suggestion-title">Reports</span>
								<span>
									Here are my medical reports, Whom should I consult with ?
								</span>
							</div>
							<div className="chat-suggestion">
								<span className="chat-suggestion-title">Alternatives</span>
								<span>
									Looking for a second opinion, find me an alternative
								</span>
							</div>
							<div className="chat-suggestion">
								<span className="chat-suggestion-title">Search</span>
								<span>Find a hospital that has neonatal ICU</span>
							</div>
							<div
								className="chat-suggestion"
								onClick={() => {
									hideElement();
								}}
							>
								<span className="chat-suggestion-title">Suggestion</span>
								<span>A good physiotherapist near me.</span>
							</div>
						</div>
					)}

					<div className="chat-input">
						<textarea type="text" placeholder="Send a message" />
						<AiOutlineSend className="send-btn" size={25} />
					</div>
					<div className="msg-container">
						<UserMsg msg={"Suggest me a good neonatal hospital nearby"} />
						<BotMsg msg={"Here is a list of good neanatal hospitals nearby"} />
					</div>
				</div>
			</div>
		</div>
	);
};
