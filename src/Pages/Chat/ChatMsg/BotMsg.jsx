import React from "react";
import logo from "../../../assets/prodoc.png";

export const BotMsg = ({ msg, doc }) => {
	return (
		<div className="bot-msg-loading-doc">
			<div className="bot-msg-loading">
				<img src={logo} alt="" />
				<span>{msg}</span>
			</div>
			{doc ? (
				<div className="bot-msg-docs">
					{doc.map((doc_sug) => {
						return doc_sug.map((indi_doc) => {
							// console.log(indi_doc);
							// // var indi_doc = JSON.parse(indi_doc);
							// const validJsonString = indi_doc.replace(/'/g, '"');

							// // Parse the JSON string to a JavaScript object
							// const jsonObject = JSON.parse(validJsonString);

							// console.log(jsonObject);
							console.log(indi_doc);
							return (
								<div className="docs-sug">
									<span className="doc-name">{indi_doc.doctor_name}</span>
									<span className="doc-specs">{`${indi_doc.specialization} | ${indi_doc.experience_years} Years`}</span>
									<span className="doc-summary">
										{indi_doc.summary.slice(0, 150) + " ...."}
									</span>
									<div className="filler"></div>
									<div className="doc-opt-btn">
										<button className="doc-loc-btn">Location</button>
										<button className="doc-book-btn">
											Book an Appointment
										</button>
									</div>
								</div>
							);
						});
					})}
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
};
