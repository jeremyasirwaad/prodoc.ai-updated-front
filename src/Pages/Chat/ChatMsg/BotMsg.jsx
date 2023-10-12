import React from "react";
import logo from "../../../assets/prodoc.png";

export const BotMsg = ({ msg }) => {
	return (
		<div className="bot-msg-loading">
			<img src={logo} alt="" />
			<span>{msg}</span>
		</div>
	);
};
