export const is_24hrs_pass = (providedTimestampStr) => {
	if (providedTimestampStr == null) {
		return false;
	}
	// Provided timestamp
	const providedTimestamp = new Date(providedTimestampStr);

	// Current timestamp
	const currentTimestamp = new Date();

	// Calculate the time difference in milliseconds
	const timeDifference = currentTimestamp - providedTimestamp;

	// Convert 24 hours to milliseconds
	const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;

	// Check if the difference is less than 24 hours
	return timeDifference < twentyFourHoursInMillis;
};
