import React from "react";
import logo from "../../../assets/prodoc.png";

export const BotMsg = ({ msg }) => {
	return (
		<div className="bot-msg">
			<img src={logo} alt="" />
			<span>{msg}</span>
		</div>
	);
};
