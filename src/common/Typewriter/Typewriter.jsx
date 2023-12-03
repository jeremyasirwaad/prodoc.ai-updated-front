import React, { useState, useEffect } from "react";

const Typewriter = ({ texts = [], delay, stringChangeDelay, infinite, onTextChange }) => {
	const [currentText, setCurrentText] = useState("");
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		let timeout;

		if (currentIndex < texts.length) {
			const currentString = texts[currentIndex];

			if (currentText !== currentString) {
				timeout = setTimeout(() => {
					const newText = currentString.slice(0, currentText.length + 1);
					setCurrentText(newText);

					if (newText === currentString) {
						clearTimeout(timeout);

						// Call the callback function when the text changes
						if (onTextChange) {
							onTextChange(currentIndex, stringChangeDelay);
						}

						if (currentIndex === texts.length - 1 && !infinite) {
							return;
						}

						setTimeout(() => {
							setCurrentText("");
							setCurrentIndex((prevIndex) =>
								prevIndex === texts.length - 1 ? 0 : prevIndex + 1
							);
						}, stringChangeDelay); // Add a delay after each string change
					}
				}, delay);
			}
		}

		return () => clearTimeout(timeout);
	}, [currentText, currentIndex, delay, infinite, texts, stringChangeDelay, onTextChange]);

	return <span>{currentText}</span>;
};

export default Typewriter;
