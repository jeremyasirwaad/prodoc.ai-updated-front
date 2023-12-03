import React, { useContext, useEffect, useState } from "react";
import logo from "../../../assets/prodoc.png";
import { url } from "../../../../networl.config";
import UserContext from "../../../UserProvider";
import toast from "react-hot-toast";
import tick from "../../../assets/check-green.gif";
import { MsgCard } from "./MsgCard";

export const BotMsg = ({ msg, doc, modelReply, hos, updateScroll }) => {
	const { user } = useContext(UserContext);
	const [show_hos_doc, setShow_hos_doc] = useState(false);
	// const [knowmore, setKnowmore] = useState(false);

	function formatText(inputText) {
		const lines = inputText.split("*"); // Split the text into lines using '*'

		// Process each line and format as needed
		const formattedLines = lines.map((line) => {
			if (line.trim() === "") {
				return "<br>"; // Replace empty lines with a line break
			} else {
				// Wrap non-empty lines in <h5> tags
				return `<h5>${line.trim()}</h5>`;
			}
		});

		// Join the formatted lines back together
		const formattedText = formattedLines.join("");

		return formattedText;
	}

	useEffect(() => {
		updateScroll();
	}, [show_hos_doc]);

	return (
		<div className="bot-msg-loading-doc">
			<div className="bot-msg-loading">
				<img src={logo} alt="" />
				<span>{msg}</span>
			</div>
			{(doc.length > 0 || hos.length > 0) && (
				<div className="doc-hos-btn">
					{!show_hos_doc && (
						<button
							className="show-doc-hos-btn"
							style={{ marginRight: "10px" }}
							onClick={() => {
								setShow_hos_doc(true);
							}}
						>
							List Nearby Doctors and Hospitals ?
						</button>
					)}
				</div>
			)}

			{doc.length > 0 && show_hos_doc ? (
				<div className="bot-msg-docs">
					<span className="bot-msg-reponse-type">Doctors</span>
					{doc.map((doc_sug) => {
						if (Array.isArray(doc_sug))
							return doc_sug.map((indi_doc) => {
								return (
									<MsgCard indi_doc={indi_doc} type={"Doctor"} msg={msg} />
								);
							});
					})}
				</div>
			) : (
				<div></div>
			)}
			{hos.length > 0 && show_hos_doc ? (
				<div className="bot-msg-docs">
					<span className="bot-msg-reponse-type">Hospitals</span>
					{hos.map((doc_sug) => {
						if (Array.isArray(doc_sug))
							return doc_sug.map((indi_doc) => {
								return (
									<MsgCard indi_doc={indi_doc} type={"Hospitals"} msg={msg} />
								);
							});
					})}
				</div>
			) : (
				<div></div>
			)}
			{(doc.length > 0 || hos.length > 0) && show_hos_doc && (
				<span className="chat-disclaimer">
					The current list is limited to doctors/hospitals who have signed up
					with us
				</span>
			)}
		</div>
	);
};
