import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
	BrowserRouter,
	createBrowserRouter,
	Form,
	Route,
	RouterProvider,
	Routes
} from "react-router-dom";
import { Navbar } from "./common/Navbav/Navbar.jsx";
import { Login } from "./Pages/Login/Login.jsx";
import { Chat } from "./Pages/Chat/Chat.jsx";
import { UserProvider } from "./UserProvider.jsx";
import { Declaration } from "./Pages/Declaration/Declaration.jsx";
import { Otp } from "./Pages/Otp/Otp.jsx";
import { Faq } from "./Pages/Faq/Faq.jsx";
import { Forms } from "./Pages/Forms/Forms.jsx";

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
					<Route
						path="/declaration/:login"
						element={
							<>
								<Declaration />
							</>
						}
					/>
					<Route
						path="/faq"
						element={
							<>
								<Faq />
							</>
						}
					/>
					<Route
						path="/forms"
						element={
							<>
								<Forms />
							</>
						}
					/>

					<Route
						path="/otp"
						element={
							<>
								<Otp />
							</>
						}
					/>
				</Routes>
			</BrowserRouter>
		</UserProvider>
	</React.StrictMode>
);
