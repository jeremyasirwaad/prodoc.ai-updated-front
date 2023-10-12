import React from "react";
import { PulseLoader } from "react-spinners";
import logo from "../../../assets/prodoc.png";

export const LoadingMsg = () => {
	return (
		<div className="bot-msg-loading">
			<img src={logo} alt="" />
			<PulseLoader size={8} />
		</div>
	);
};
