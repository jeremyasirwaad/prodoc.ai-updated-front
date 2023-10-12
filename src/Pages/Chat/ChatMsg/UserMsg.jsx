import React from "react";
import "./Msg.css";

export const UserMsg = ({ msg }) => {
	return (
		<div className="user-msg">
			<span>{msg}</span>
			<img
				src="https://chat.openai.com/_next/image?url=https%3A%2F%2Flh3.googleusercontent.com%2Fa%2FACg8ocIVOhL9jtkBx0G_vCWCO50jLDoDLGjkkgr3qlB6FBtPJ9tA%3Ds96-c&w=64&q=75"
				alt=""
			/>
		</div>
	);
};
