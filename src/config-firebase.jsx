import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const jwt_key = "prodoc@123";

const firebaseConfig = {
	apiKey: "AIzaSyCIfo_WRQBof8Q6ZAHGJXqKOlpgJA8rqHc",
	authDomain: "prodocai.firebaseapp.com",
	projectId: "prodocai",
	storageBucket: "prodocai.appspot.com",
	messagingSenderId: "682975077949",
	appId: "1:682975077949:web:117d96fffe8d4ec526ac54",
	measurementId: "G-L5G2WMF4NZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, jwt_key };
