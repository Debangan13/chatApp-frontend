import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants";
import moment from "moment/moment";
import { useEffect, useRef } from "react";

const MessageContainer = () => {
	const scorllRef = useRef();
	const {
		selectedChatType,
		selectedChatData,
		userInfo,
		selectedChatMessages,
		setSelectedChatMessages,
	} = useAppStore();

	useEffect(() => {
		if (scorllRef.current) {
			scorllRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [selectedChatMessages]);
	useEffect(() => {
		const getMessages = async () => {
			console.log("in useEffect id:", selectedChatData._id);
			try {
				const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE, {
					id: selectedChatData._id,
				});
				console.log(response.data.messages);
				if (response.data.messages) {
					setSelectedChatMessages(response.data.messages);
				}
				console.log("messages response:", response);
			} catch (error) {
				console.log(error);
			}
		};
		if (selectedChatData._id) getMessages();
	}, [selectedChatType, selectedChatData, setSelectedChatMessages]);
	const renderMessages = () => {
		console.log("in renderMessage");
		let lastDate = null;
		console.log("selectedChatMessages:",selectedChatMessages)
		return selectedChatMessages.map((message, index) => {
			console.log("messages:",message)
			const { timestamp } = message;
			const messageDate = moment(timestamp).format("YYYY-MM-DD");
			const showDate = messageDate !== lastDate;
			lastDate = messageDate;
			return (
				<div key={index}>
					{showDate && (
						<div className='text-center text-gray-500'>
							{moment(timestamp).format("LL")}
						</div>
					)}
					{selectedChatType === "contact" && renderDmMessages(message)}
				</div>
			);
		});
	};
	const renderDmMessages = (message) => {
		console.log("Message sender ID:", message);
		console.log("Current chat user ID:", selectedChatData._id);
		console.log(
			"Is current user the sender?",
			message.sender === selectedChatData._id
		);
		return (
			<div
				className={`${
					message.sender === selectedChatData._id
						? "text-left"
						: "text-right"
				}`}
			>
				{message.messageType === "text" && (
					<div
						className={`${
							message.sender !== selectedChatData._id
								? "bg-[#8418ff]/5 text-[#8418ff]/90 border-[#8418ff]/50"
								: "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
						} border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
					>
						{message.content}
					</div>
				)}
				<div className="text-xs text-gray-500">{moment(message.timestamp).format("LT")}</div>
			</div>
		);
	};

	return (
		<div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full '>
			{renderMessages()}
			<div ref={scorllRef} />
		</div>
	);
};

export default MessageContainer;
