import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	BrowserRouter,
	createBrowserRouter,
	Route,
	RouterProvider,
	Routes
} from "react-router-dom";
import { Navbar } from "./common/Navbav/Navbar.jsx";
import { Login } from "./Pages/Login/Login.jsx";
import { Chat } from "./Pages/Chat/Chat.jsx";
import { UserProvider } from "./UserProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserProvider>
			<BrowserRouter>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<App />
							</>
						}
					/>
					<Route
						path="/login"
						element={
							<>
								<Login />
							</>
						}
					/>
					<Route
						path="/chat"
						element={
							<>
								<Chat />
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	</React.StrictMode>
);
