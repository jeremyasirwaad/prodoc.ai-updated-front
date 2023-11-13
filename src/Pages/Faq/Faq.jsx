import React, { useContext, useState } from "react";
import "../Declaration/Declaration";
import logo from "../../assets/prodoc.png";

export const Faq = () => {
	return (
		<div className="login-page">
			<div className="login-logo" style={{ marginTop: "20px" }}>
				<img src={logo} alt="" />
			</div>
			<div className="privacy_policy_container">
				<span className="privacy_policy_title">Frequently Asked Questions</span>

				<ol>
					<li>
						<p className="privacy_mb_15">What is Prodoc.ai?</p>
						<p>
							Prodoc.ai is an AI Discovery Platform designed to help patients
							find the right specialist or doctor tailored to their specific
							medical needs.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							2: How do I get started with Prodoc.ai?
						</p>
						<p>
							To find the specialist or doctor you need, simply sign in with
							your Google account and take the first step towards better
							healthcare.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							Do I need a Google account to login to Prodoc.ai?
						</p>
						<p>
							Yes, a Google account is required for a secure and seamless login
							experience.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							Does Prodoc.ai provide medical advice?
						</p>
						<p>
							No, Prodoc.ai does not provide medical advice. Our platform offers
							recommendations for healthcare professionals based on your
							condition.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							Does Prodoc.ai provide medical advice?
						</p>
						<p>
							No, Prodoc.ai does not provide medical advice. Our platform offers
							recommendations for healthcare professionals based on your
							condition.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							Where does Prodoc.ai source its responses from?
						</p>
						<p>
							We source responses from various reputable internet sources. While
							we strive for accuracy, it's important to note that the
							information provided may not always be completely accurate or
							up-to-date. We recommend verifying critical information with the
							healthcare provider.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							How can I share my medical reports? What formats are supported?
						</p>
						<p>
							You can easily upload medical reports, including blood tests,
							X-rays, biopsy reports, etc., in PDF, JPEG, or PNG formats.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Can I upload multiple documents?</p>
						<p>
							Yes, you can upload multiple documents, simplifying the sharing of
							medical information.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							Does Prodoc.ai use user-uploaded data and reports for any other
							purpose?
						</p>
						<p>
							No, we prioritize patient privacy. Your data and reports are used
							solely to find the right care, and we do not store your
							information.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Is Prodoc.ai free to use?</p>
						<p>
							Prodoc.ai is completely free to use. We are committed to making
							healthcare information accessible to all.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							Which geographies are supported by Prodoc.ai?
						</p>
						<p>
							Currently, we support users across India. However, we have a
							global vision and aspire to become a worldwide healthcare
							discovery platform shortly.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							I am a healthcare professional. How can I participate in
							Prodoc.ai?
						</p>
						<p>
							If you're a healthcare professional interested in joining
							Prodoc.ai, please complete our form in homepage, and our team will
							contact you for further details.
						</p>
					</li>
					<li style={{ marginBlock: "30px" }}>
						<p className="privacy_mb_15">
							How can I contact Prodoc.ai for more information?
						</p>
						<p>
							If you have any questions or require additional information about
							our platform, please feel free to contact us. We're here to assist
							you on your healthcare journey.
						</p>
					</li>
				</ol>
			</div>
		</div>
	);
};
