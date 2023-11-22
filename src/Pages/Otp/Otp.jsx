import React, { useState, useContext } from "react";
import "./Otp.css";
import logo from "../../assets/prodoc.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import OTPInput, { ResendOTP } from "otp-input-react";
import toast, { Toaster } from "react-hot-toast";
import UserContext from "../../UserProvider";
import { url } from "../../../networl.config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Otp = () => {
	const navigate = useNavigate();
	const { user, setUser } = useContext(UserContext);
	const [phoneNo, setPhoneNo] = useState("");
	const [otpSent, setOtpSent] = useState(false);
	const [otp, setOtp] = useState("");
	const [key, setKey] = useState("");
	const [timer, setTimer] = useState(60); // Initial timer value in seconds
	const [isResendDisabled, setIsResendDisabled] = useState(false);

	useEffect(() => {
		let interval;

		// Start the timer
		if (timer > 0) {
			interval = setInterval(() => {
				setTimer((prevTimer) => prevTimer - 1);
			}, 1000);
		} else {
			// Timer reached 0, enable the resend button
			setIsResendDisabled(true);
			clearInterval(interval);
		}

		// Clean up the interval on component unmount
		return () => clearInterval(interval);
	}, [timer]);

	const handleResendClick = () => {
		// Disable the button and reset the timer
		setIsResendDisabled(false);
		setTimer(60); // Reset the timer to your initial value
	};

	const sendOtp = async () => {
		if (!phoneNo) {
			toast.error("Enter Valid Phone Number");
			return;
		}
		try {
			const response = await fetch(`${url}generateOtp`, {
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
			const response = await fetch(`${url}verifyOtp`, {
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
							navigate("/declaration/login");
							var info = user;
							info["mob_otp"] = phoneNo;
							setUser(info);
						} else {
							navigate("/chat");
							var info = user;
							info["mob_otp"] = phoneNo;
							setUser(info);
						}
					} else {
						toast.error("Invalid OTP");
					}
				});
		} catch (error) {
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
						{!isResendDisabled ? (
							<span className="resend-otp">
								Resend in 0:{timer.toString().padStart(2, "0")}
							</span>
						) : (
							<span
								className="resend-otp-enabled"
								onClick={() => {
									sendOtp();
								}}
							>
								Resend OTP
							</span>
						)}
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
			<div className="term-privacy-login">
				Terms of use |{" "}
				<span
					style={{ cursor: "pointer" }}
					onClick={() => {
						navigate("/declaration/view");
					}}
				>
					Privacy Policy
				</span>
			</div>
		</div>
	);
};
