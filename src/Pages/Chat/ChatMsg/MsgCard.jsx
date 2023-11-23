import React, { useState } from "react";

export const MsgCard = ({ indi_doc }) => {
	const [knowmore, setKnowmore] = useState(false);

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
};
