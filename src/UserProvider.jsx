import { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import { url } from "../networl.config";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState();

	const getUser = async (uid) => {
		try {
			const response = await fetch(`${url}getUser`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					uid: uid
				})
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					setUser(data.data[0]);
				});
		} catch (error) {
			console.error(error);
		}
	};

	const getToken = () => {
		const token = localStorage.getItem("user-prodoc");
		if (token) {
			// setUser(jwt.decode(token));
			const user_local = jwt.decode(token);
			getUser(user_local.uid);
		}
	};

	useEffect(() => {
		getToken();
	}, []);

	return (
		<UserContext.Provider value={{ setUser: setUser, user: user }}>
			{children}
		</UserContext.Provider>
	);
}

export default UserContext;
