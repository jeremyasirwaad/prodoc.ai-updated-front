import React, { useContext, useState } from "react";
import "./Declaration.css";
import logo from "../../assets/prodoc.png";
import { useNavigate } from "react-router-dom";
import { local, url } from "../../../networl.config";
import UserContext from "../../UserProvider";

export const Declaration = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [agreement_tick, setAgreement_tick] = useState(false);

	const declaration = async () => {
		try {
			const response = await fetch(`${url}declaration`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ uid: user.uid })
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status) {
						navigate("/chat");
					}
				});
		} catch (error) {
			// setResponse("Error creating user");
			console.error(error);
		}
	};

	return (
		<div className="login-page">
			<div className="login-logo" style={{ marginTop: "20px" }}>
				<img src={logo} alt="" />
			</div>
			<div className="privacy_policy_container">
				<span className="privacy_policy_title">Privacy Policy</span>
				<p className="privay_bold">
					THIS IS AN AGREEMENT BETWEEN YOU OR THE ENTITY THAT YOU REPRESENT (
					HEREINAFTER “YOU” or “YOUR”) AND GROWTH HACKER CONSULTING PVT. LTD.
					(HEREINAFTER “PRODOC” OR "Prodoc" OR "Prodoc.ai" ) GOVERNING YOUR USE
					OF PRODOC SUITE OF ONLINE BUSINESS PRODUCTIVITY AND COLLABORATION
					SOFTWARE.
				</p>
				<p>
					Prodoc is committed to protecting the privacy of our users. This
					Privacy Policy outlines the types of information we collect, how we
					use and share it, and the steps we take to protect your privacy when
					you use our website, web app, and any associated services
					(collectively, the “Services”). By using our Services, you agree to
					the terms and conditions of this Privacy Policy. If you do not agree
					with the terms and conditions set forth herein, please do not use our
					Services.
				</p>
				<ol>
					<li>
						<p className="privacy_mb_15">Information We Collect</p>
						<p>
							We collect information that is necessary for the operation and
							improvement of our Services. This information can be divided into
							two categories: non-personally identifiable information and
							aggregate information.
						</p>
						<ul>
							<li>
								<p className="privacy_mb_15">
									A. Non-Personally Identifiable Information
								</p>
								<p>
									When you use our Services, we may automatically collect
									non-personally identifiable information, such as your device
									type, browser type, IP address, and operating system. This
									information is used for statistical purposes and to improve
									our Services.
								</p>
							</li>
							<li>
								<p className="privacy_mb_15">B. Aggregate Information</p>
								<p>
									In order to provide our Services, we may collect, process, and
									analyze aggregate information from users, such as the types of
									diseases, symptoms, or treatments that are searched for or
									selected. This information is used to improve our Services and
									is not linked to any personally identifiable information.
								</p>
							</li>
						</ul>
					</li>
					<li>
						<p className="privacy_mb_15">How We Use Your Information</p>
						<p>We use the information we collect to:</p>
						<ul>
							<li>Provide, maintain, and improve our Services</li>
							<li>
								Analyze usage patterns to make our Services more effective
							</li>
							<li>
								Communicate with you about our Services, including updates,
								promotions, and other information we believe may be of interest
								to you
							</li>
							<li>
								Comply with legal obligations and enforce our Terms of Service
							</li>
						</ul>
					</li>
					<li>
						<p className="privacy_mb_15">Disclosure of Your Information</p>
						<p>
							We will not sell, rent, or share your information with third
							parties, except in the following circumstances:
						</p>
						<ul>
							<li>With your consent</li>
							<li>
								With trusted service providers who perform services on our
								behalf and are bound by confidentiality agreements
							</li>
							<li>
								When required by law, regulation, or legal process, or to
								protect the rights, property, or safety of Prodoc.ai, our users,
								or others
							</li>
							<li>
								In the event of a merger, acquisition, or sale of all or a
								portion of our assets
							</li>
						</ul>
					</li>
					<li>
						<p className="privacy_mb_15">
							Third-Party Services and Affiliate Partners
						</p>
						<p>
							Our Services may include links to third-party websites or
							services, including those of our affiliate partners. This Privacy
							Policy does not apply to the practices of these third parties, and
							we encourage you to review their privacy policies before providing
							them with any information. We may receive compensation from our
							affiliate partners if you make a purchase through one of our
							links. However, this does not influence our recommendations, which
							are based on our independent research and analysis.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Data Security</p>
						<p>
							We take appropriate measures to protect your information from
							unauthorized access, disclosure, alteration, or destruction.
							However, no method of transmission over the Internet or electronic
							storage is 100% secure. Therefore, we cannot guarantee the
							absolute security of your information.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">International Data Transfers</p>
						<p>
							Your information may be transferred to and processed in countries
							other than the one in which you reside. By using our Services, you
							consent to the transfer, processing, and storage of your
							information in such countries.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Changes to This Privacy Policy</p>
						<p>
							We may update this Privacy Policy from time to time. If we make
							material changes, we will notify you by posting a notice on our
							website or by sending you an email. Your continued use of our
							Services after such notice constitutes your acceptance of the
							updated Privacy Policy.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Contact Us</p>
						<p>
							If you have any questions or concerns about this Privacy Policy or
							our privacy practices, please contact us at info@prodoc.io.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Disclaimer</p>
						<p>
							Our Services are provided for informational purposes only and are
							not intended to replace professional medical advice, diagnosis, or
							treatment. Always seek the advice of a qualified healthcare
							provider with any questions you may have regarding a medical
							condition, and never disregard professional medical advice or
							delay seeking it because of something you have read or accessed
							through our Services.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Limitation of Liability</p>
						<p>
							To the maximum extent permitted by applicable law, in no event
							shall Prodoc.ai, its affiliates, or their respective directors,
							employees, or agents be liable for any direct, indirect,
							incidental, special, consequential, or punitive damages, including
							but not limited to, loss of profits, data, use, or goodwill,
							arising out of or in connection with the use or performance of our
							Services, even if Prodoc.ai has been advised of the possibility of
							such damages.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">User Consent</p>
						<p>
							By using our Services, you acknowledge and agree that you have
							read and understood this Privacy Policy, and you consent to the
							collection, use, and disclosure of your information as described
							herein.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Children’s Privacy</p>
						<p>
							Our Services are not directed to or intended for use by children
							under the age of 13. We do not knowingly collect information from
							children under the age of 13. If you are under the age of 13,
							please do not use our Services or provide us with any information.
							If we become aware that we have collected information from a child
							under the age of 13, we will take steps to delete such
							information.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15_no_bold">
							Governing Law and Dispute Resolution: This Privacy Policy will be
							governed by and interpreted in accordance with the laws of India,
							where Prodoc.ai is located, without consideration of its conflict
							of law principles. Any disputes arising from or related to this
							Privacy Policy or our privacy practices will be settled through
							negotiation, mediation, or arbitration, as mutually decided by the
							parties involved.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Severability</p>
						<p>
							If any provision of this Privacy Policy is found to be invalid or
							unenforceable, the remaining provisions shall remain in full force
							and effect.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">No Waiver</p>
						<p>
							Our failure to enforce any right or provision of this Privacy
							Policy shall not be deemed a waiver of such right or provision.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">
							European Union (EU) Residents – General Data Protection Regulation
							(GDPR) Rights
						</p>
						<p>
							If you are an EU resident, you have certain rights under the GDPR,
							including the right to access, rectify, or erase your personal
							data, restrict or object to the processing of your personal data,
							and the right to data portability. To exercise these rights,
							please contact us at info@prodoc.io.
						</p>
						<p>
							Please note that we may require you to verify your identity before
							processing your request. Additionally, we may not be able to
							fulfill certain requests if doing so would infringe on the rights
							and freedoms of others.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">Data Retention</p>
						<p>
							We retain your information for as long as necessary to provide our
							Services, comply with our legal obligations, resolve disputes, and
							enforce our agreements. When we no longer need your information
							for these purposes, we will securely delete or anonymize it.
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">How to Contact Us</p>
						<p>
							If you have any questions or concerns about this Privacy Policy or
							our privacy practices, please contact us at the following email
							address: info@prodoc.io
						</p>
					</li>
					<li>
						<p className="privacy_mb_15">HIPAA Compliance</p>
						<p>
							Prodoc is not a healthcare provider or medical organization, and
							it does not collect personally identifiable information. As such,
							the Health Insurance Portability and Accountability Act (HIPAA)
							regulations do not directly apply to Prodoc. However, we are
							committed to maintaining user privacy and strive to protect any
							information you may provide during your use of our website and web
							application. Please note that while we take measures to protect
							user privacy, we cannot guarantee the security of any information
							you transmit to us. Users are responsible for maintaining the
							confidentiality of their own information.
						</p>
						<p>
							If you are a healthcare provider, medical professional, or other
							entity subject to HIPAA regulations, it is your responsibility to
							ensure that your use of Prodoc and any associated services
							complies with all applicable laws, regulations, and professional
							standards, including HIPAA.
						</p>
						<p>
							Please note that this section is provided for informational
							purposes only and should not be construed as legal advice. If you
							have questions about HIPAA or other legal issues related to your
							use of Prodoc, you should consult with your own legal counsel.
						</p>
						<p>
							By using our Services, you acknowledge and agree that you have
							read, understand, and agree to be bound by the terms and
							conditions of this Privacy Policy. If you do not agree with the
							terms and conditions set forth herein, please do not use our
							Services.
						</p>
					</li>
				</ol>
				<div className="privacy_checkbox">
					<input
						type="checkbox"
						onClick={() => {
							setAgreement_tick(true);
						}}
					/>
					<span>I agree with the terms and conditions mentioned above</span>
				</div>
				<div className="accept_btn_cont">
					{agreement_tick && (
						<button
							onClick={() => {
								declaration();
							}}
						>
							Next
						</button>
					)}
				</div>
			</div>
			{/* <div className="term-privacy-login">Terms of use | Privacy Policy</div> */}
		</div>
	);
};
