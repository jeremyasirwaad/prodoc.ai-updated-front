import React from "react";
import "./Msg.css";

export const UserMsg = ({ msg, src }) => {
	return (
		<div className="user-msg">
			<span>{msg}</span>
			<img src={src} alt="" />
		</div>
	);
};
