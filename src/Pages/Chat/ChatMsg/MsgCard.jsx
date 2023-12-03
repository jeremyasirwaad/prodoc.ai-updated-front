import React, { useState, useContext } from "react";
import { url } from "../../../../networl.config";
import toast from "react-hot-toast";
import tick from "../../../assets/check-green.gif";
import UserContext from "../../../UserProvider";

export const MsgCard = ({ indi_doc, type, msg }) => {
	const { user } = useContext(UserContext);

	const [knowmore, setKnowmore] = useState(false);

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
			"https://uat-api.prodoc.io/aws/v1/lead_aggregator";

		try {
			const response = await fetch(lead_url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Api-Key": "8Ni9PPLMbHBWxQkh3QiYUVx8cfLdJ6UQ"
				},
				body: JSON.stringify(body)
			})
				.then((res) => res.json())
				.then((data) => {});
		} catch (error) {
			console.error(error);
		}
	};

	if (type == "Doctor") {
		return (
			<div className="docs-sug">
				<span className="doc-name">{indi_doc.doctor_name}</span>
				<span className="doc-specs">{`${indi_doc.specialization} | ${
					indi_doc.experience_years != ""
						? indi_doc.experience_years + " Years"
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
								msg,
								"inbound@prodoc.io"
							);
							send_lead_aggregator(indi_doc);
							setTimeout(() => {
								toast.custom(() => (
									<div className="mail-sent-popup">
										<div className="mail-inner-popup">
											<img src={tick} alt="" />
											<span>
												Your Interest has been noted. We will get back to you
												shortly. Thanks.
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
	} else {
		return (
			<div className="docs-sug">
				<span className="doc-name">{indi_doc.name}</span>
				<span className="doc-specs">{`${indi_doc.city} | ${indi_doc?.vn_phone_number?.number}`}</span>
				{!knowmore ? (
					<span className="doc-summary">
						{indi_doc?.description?.slice(0, 150) + "..."}{" "}
						{indi_doc.description ? (
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
						{indi_doc?.description}
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
								indi_doc.name,
								indi_doc.city,
								msg,
								"inbound@prodoc.io"
							);
							send_lead_aggregator(indi_doc);
							setTimeout(() => {
								toast.custom(() => (
									<div className="mail-sent-popup">
										<div className="mail-inner-popup">
											<img src={tick} alt="" />
											<span>
												Your Interest has been noted. We will get back to you
												shortly. Thanks.
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
	}
};
