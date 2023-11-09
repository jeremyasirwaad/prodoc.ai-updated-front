import React, { useState, useContext } from "react";
import "./Otp.css";
import logo from "../../assets/prodoc.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import toast, { Toaster } from "react-hot-toast";
import UserContext from "../../UserProvider";
import { local, url } from "../../../networl.config";
import { useNavigate } from "react-router-dom";
useNavigate;

export const Otp = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const [phoneNo, setPhoneNo] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otp, setOtp] = useState("");
	const [key, setKey] = useState("");

	const sendOtp = async () => {
		if (!phoneNo) {
			toast.error("Enter Valid Phone Number");
			return;
		}
		try {
			const response = await fetch(`${local}generateOtp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ phoneNo: phoneNo, uid: user.uid })
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status) {
						setOtpSent(true);
						toast.success(`OTP Sent`);
					} else {
						toast.error(data.message);
					}
				});
		} catch (error) {
			console.error(error);
		}
	};

	const verify_otp = async () => {
		if (!otp) {
			toast.error("Enter OTP sent to mobile");
			return;
		}
		try {
			const response = await fetch(`${local}verifyOtp`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ otp, key, phoneNo, uid: user.uid })
			})
				.then((res) => res.json())
				.then((data) => {
					if (data.status) {
						if (data.type == false) {
							navigate("/declaration");
						} else {
							navigate("/chat");
						}
					} else {
						toast.error("Invalid OTP");
					}
				});
		} catch (error) {
			// setResponse("Error creating user");
			console.error(error);
		}
	};

	return (
		<div className="login-page">
			<Toaster position="top-center" reverseOrder={false} />
			<div className="login-logo">
				<img src={logo} alt="" />
			</div>
			<div className="mobile_verify_container">
				<span className="mobile_verifiy_title">Mobile Verification</span>
				{!otpSent ? (
					<>
						<PhoneInput
							country={"in"}
							value={phoneNo}
							onChange={(phone) => setPhoneNo(phone)}
						/>
						<button
							className="get_otp_btn"
							onClick={() => {
								sendOtp();
							}}
						>
							Get OTP
						</button>
					</>
				) : (
					<>
						{" "}
						<OTPInput
							className={"otpinput"}
							value={otp}
							onChange={(e) => {
								setOtp(e);
							}}
							autoFocus
							OTPLength={6}
							otpType="number"
							disabled={false}
						/>
						<button
							className="get_otp_btn"
							onClick={() => {
								verify_otp();
							}}
						>
							Verify
						</button>
					</>
				)}
			</div>
			<div className="term-privacy-login">Terms of use | Privacy Policy</div>
		</div>
	);
};
