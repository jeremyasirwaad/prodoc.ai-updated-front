import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import "./Popup.css";

export const Back_drop = ({ children }) => {
	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1, transition: { duration: 0.2 } }}
				exit={{ opacity: 0, transition: { delay: 0.2, duration: 0.2 } }}
				className="model_backdrop"
			></motion.div>
			{children}
		</AnimatePresence>
	);
};
