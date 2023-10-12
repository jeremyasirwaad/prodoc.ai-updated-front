import { createContext, useState, useEffect } from "react";
import jwt from "jsonwebtoken";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState();

	const getToken = () => {
		const token = localStorage.getItem("user-prodoc");
		if (token) {
			setUser(jwt.decode(token));
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
