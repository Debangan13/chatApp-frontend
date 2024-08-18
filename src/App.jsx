import React, { useEffect, useState } from "react";
import {
	BrowserRouter,
	Navigate,
	Outlet,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Auth from "./pages/auth";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { useAppStore } from "@/store";
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO } from "./utils/constants";

const PublicRoutes = () => {
	const { userInfo } = useAppStore();
	const isAuthenticated = !!userInfo;
	const location = useLocation();
	return isAuthenticated && location.pathname === "/auth" ? (
		userInfo.profileSetup ? (
			<Navigate to='/chat' />
		) : (
			<Navigate to='/profile' />
		)
	) : (
		<Outlet />
	);
	// return isAuthenticated ? <Outlet /> : <Navigate to="/chat" />;0
};

const PrivateRoutes = () => {
	const { userInfo } = useAppStore();
	const isAuthenticated = !!userInfo;
	return isAuthenticated ? <Outlet /> : <Navigate to='/auth' />;
};

const App = () => {
	const { userInfo, setUserInfo } = useAppStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		console.log("useEffect started");

    // const getUserData = async () => {
    //   try {
    //     const response = await apiClient.get(GET_USER_INFO)
    //     console.log(response)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }

		const getUserData = async () => {
			try {
				console.log("Fetching user data...");
				const response = await apiClient.get(GET_USER_INFO);
				console.log("Response received");		
				if (response.status === 200 && response.data.id) {
					console.log("User data fetched successfully");
					setUserInfo(response.data);
				} else {
					console.log("No valid user data found");
					setUserInfo(undefined);
				}
			} catch (error) {
				console.error("Error fetching user data", error);
				setUserInfo(undefined);
			} finally {
			  console.log("Finally block executed");
			  setLoading(false);
			}
		};

		if (!userInfo) {
			console.log("User info not found, calling getUserData");
			getUserData();
		} else {
			console.log("User info already exists");
			setLoading(false);
		}
		console.log("userInfo", !userInfo);
	}, [userInfo, setUserInfo]);
	console.log("loading:",loading)
	if (loading) {
		return <div>Loading....</div>;
	}

	return (
		<BrowserRouter>
			<Routes>
				{/* Private Routes */}
				<Route element={<PrivateRoutes />}>
					<Route path='/chat' element={<Chat />} />
					<Route path='/profile' element={<Profile />} />
				</Route>

				{/* Public Routes */}
				<Route element={<PublicRoutes />}>
					<Route path='/auth' element={<Auth />} />
				</Route>
				<Route path='/' element={<Navigate to='/auth' />} />
				{/* <Route path="*" element={<NotFoundPage />} /> */}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
