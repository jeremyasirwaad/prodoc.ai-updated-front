import React, { useContext, useState } from "react";
import logo from "../../../assets/prodoc.png";
import { url } from "../../../../networl.config";
import UserContext from "../../../UserProvider";
import toast from "react-hot-toast";
import tick from "../../../assets/check-green.gif";

export const BotMsg = ({ msg, doc, modelReply, hos }) => {
	const { user } = useContext(UserContext);
	// const [knowmore, setKnowmore] = useState(false);

	const sendMail_Hospital = async (hospital, location, message, email) => {
		try {
			console.log({
				hos: hospital,
				email: email,
				name: user.displayName,
				contact: user.email + "-" + user.mob_otp,
				details: message,
				location: location
			});
			const response = await fetch(`${url}sendEmailToHospital`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					hos: hospital,
					email: email,
					name: user.displayName,
					contact: user.email + "-" + user.mob_otp,
					details: message,
					location: location
				})
			})
				.then((res) => res.json())
				.then((data) => {});
		} catch (error) {
			console.error(error);
		}
	};

	const sendMail_User = async () => {
		try {
			const response = await fetch(`${url}sendEmailToUser`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: user.displayName,
					email: user.email
				})
			})
				.then((res) => res.json())
				.then((data) => {});
		} catch (error) {
			console.error(error);
		}
	};

	const send_lead_aggregator = async (doc) => {
		const body = {
			name: user.displayName,
			phone_number: user.mob_otp,
			email: user.email,
			source: "Prodoc.ai",
			last_contacted_time: Date.now().toString(),
			concerned_doc: doc.doctor_name,
			comments: doc.clinic_name + " - " + doc.specialization,
			lead_state: "Created"
		};

		const lead_url =
			"https://api-prodoc.dev.diginnovators.com/aws/v1/lead_aggregator";

		try {
			const response = await fetch(lead_url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Api-Key": "g0SAK2pSti8uvnOgkVmzt833bA1SWR2M"
				},
				body: JSON.stringify(body)
			})
				.then((res) => res.json())
				.then((data) => {});
		} catch (error) {
			console.error(error);
		}
	};

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

	return (
		<div className="bot-msg-loading-doc">
			<div className="bot-msg-loading">
				<img src={logo} alt="" />

				<span>{msg}</span>
			</div>
			{doc.length > 0 ? (
				<div className="bot-msg-docs">
					<span className="bot-msg-reponse-type">Doctors</span>
					{doc.map((doc_sug) => {
						if (Array.isArray(doc_sug))
							return doc_sug.map((indi_doc) => {
								const [knowmore, setKnowmore] = useState(false);

								return (
									<div className="docs-sug">
										<span className="doc-name">{indi_doc.doctor_name}</span>
										<span className="doc-specs">{`${
											indi_doc.specialization
										} | ${
											indi_doc.experience_years != ""
												? indi_doc.experience_years + Years
												: ""
										}`}</span>
										{!knowmore ? (
											<span className="doc-summary">
												{indi_doc?.summary?.slice(0, 150) + "..."}{" "}
												{indi_doc.summary ? (
													<span
														style={{ fontWeight: "600", cursor: "pointer" }}
														onClick={() => {
															setKnowmore(true);
														}}
													>
														Know More
													</span>
												) : (
													""
												)}
											</span>
										) : (
											<span className="doc-summary">
												{indi_doc?.summary}
												<span
													style={{ fontWeight: "600", cursor: "pointer" }}
													onClick={() => {
														setKnowmore(false);
													}}
												>
													Know Less
												</span>
											</span>
										)}

										<div className="filler"></div>
										<div className="doc-opt-btn">
											<button className="doc-loc-btn">Location</button>
											<button
												className="doc-book-btn"
												onClick={() => {
													sendMail_User();
													sendMail_Hospital(
														indi_doc.clinic_name,
														indi_doc.practice.city,
														modelReply,
														"inbound@prodoc.io"
													);
													send_lead_aggregator(indi_doc);
													setTimeout(() => {
														toast.custom(() => (
															<div className="mail-sent-popup">
																<div className="mail-inner-popup">
																	<img src={tick} alt="" />
																	<span>
																		Your Interest has been noted. We will get
																		back to you shortly. Thanks.
																	</span>
																</div>
															</div>
														));
													}, 1000);
												}}
											>
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
			{hos.length > 0 ? (
				<div className="bot-msg-docs">
					<span className="bot-msg-reponse-type">Hospitals</span>
					{hos.map((hos_sug) => {
						return hos_sug.map((indi_hos) => {
							const [knowmore, setKnowmore] = useState(false);
							return (
								<div className="docs-sug">
									<span className="doc-name">{indi_hos.name}</span>
									<span className="doc-specs">{`${indi_hos.city} | ${indi_hos?.vn_phone_number?.number}`}</span>
									{!knowmore ? (
										<span className="doc-summary">
											{indi_hos?.description?.slice(0, 150) + "..."}{" "}
											{indi_hos.description ? (
												<span
													style={{ fontWeight: "600", cursor: "pointer" }}
													onClick={() => {
														setKnowmore(true);
													}}
												>
													Know More
												</span>
											) : (
												""
											)}
										</span>
									) : (
										<span className="doc-summary">
											{indi_hos?.description}
											<span
												style={{ fontWeight: "600", cursor: "pointer" }}
												onClick={() => {
													setKnowmore(false);
												}}
											>
												Know Less
											</span>
										</span>
									)}

									<div className="filler"></div>
									<div className="doc-opt-btn">
										<button className="doc-loc-btn">Location</button>
										<button
											className="doc-book-btn"
											onClick={() => {
												sendMail_User();
												sendMail_Hospital(
													indi_hos.name,
													indi_hos.city,
													modelReply,
													"inbound@prodoc.io"
												);
												setTimeout(() => {
													toast.custom(() => (
														<div className="mail-sent-popup">
															<div className="mail-inner-popup">
																<img src={tick} alt="" />
																<span>
																	Your Interest has been noted. We will get back
																	to you shortly. Thanks.
																</span>
															</div>
														</div>
													));
												}, 1000);
											}}
										>
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
			{(doc.length > 0 || hos.length > 0) && (
				<span className="chat-disclaimer">
					The current list is limited to doctors/hospitals who have signed up
					with us
				</span>
			)}
		</div>
	);
};
