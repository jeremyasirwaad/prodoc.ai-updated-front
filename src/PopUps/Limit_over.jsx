import React from "react";
import { Back_drop } from "./Back_drop";
import { AnimatePresence, motion } from "framer-motion";
import img_24 from "../assets/prodoc_243.png";
import { BiChevronsRight } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";

export const Limit_over = ({ close, displayRazorpay }) => {
	return (
		<Back_drop>
			<motion.dev
				className="limt_over_model"
				initial={{ scale: 0 }}
				animate={{ scale: 1, transition: { duration: 0.2, delay: 0.3 } }}
				exit={{ scale: 0, transition: { duration: 0.2 } }}
			>
				<div className="limit_over_inner">
					<div
						style={{
							display: "flex",
							alignItems: "center",
							justifyContent: "flex-end",
							cursor: "pointer"
						}}
					>
						<AiFillCloseCircle
							color="rgb(22, 86, 74)"
							onClick={() => {
								close(false);
							}}
							size={20}
						/>
					</div>
					<div className="img_24_cont">
						<img src={img_24} alt="" />
					</div>
					<span>You have exhausted your 5 free trail questions !</span>
					<span className="buy_24hrs_text">Buy 24-hrs Pass to continue</span>
					<span className="feature_tag">Features</span>
					<div className="feature_list">
						<BiChevronsRight />
						<span>Unlimited doctor and hospital search though queries</span>
					</div>
					<div className="feature_list">
						<BiChevronsRight />
						<span>Unlimited suggestions to health care related questions</span>
					</div>
					<div className="feature_list">
						<BiChevronsRight />
						<span>Valid for 24-hrs from subscription</span>
					</div>
					<div className="button_options_24hrs">
						<button
							className="doc-loc-btn"
							onClick={() => {
								close(false);
							}}
						>
							Cancel
						</button>
						<button
							className="doc-book-btn"
							onClick={() => {
								displayRazorpay();
							}}
						>
							₹ 99 Rs /-
						</button>
					</div>
				</div>
			</motion.dev>
		</Back_drop>
	);
};
