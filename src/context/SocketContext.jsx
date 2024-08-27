import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";

import { createContext, useContext, useRef, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
	return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
	console.log("in Scoketprovider");
	const socket = useRef();
	const { userInfo } = useAppStore();
	useEffect(() => {
		console.log("in useEffect");
		if (userInfo) {
			socket.current = io(HOST, {
				withCredentials: true,
				query: { userId: userInfo.id },
			});
			socket.current.on("connect", () => {
				console.log("connected to socket server");
			});
			const handleRecieveMessage = (message) => {
				const {selectedChatData, selectedChatType, addMessage } = useAppStore.getState()
				if (
					selectedChatType !== undefined &&
					(selectedChatData._id === message.sender._id ||
						selectedChatData._id === message.recipient._id)
				) {
					console.log("message rec", message);
					addMessage(message);
				}
			};

			socket.current.on("recieveMessage", handleRecieveMessage);

			return () => socket.current.disconnect();
		}
	}, [userInfo]);
	return (
		<SocketContext.Provider value={socket.current}>
			{children}
		</SocketContext.Provider>
	);
};