import { useAppStore } from "@/store";
import moment from "moment/moment";
import { useEffect, useRef } from "react";

const MessageContainer = () => {
	const scorllRef = useRef();
	const { selectedChatType, selectedChatData, userInfo, selectedChatMessages } =
		useAppStore();
	console.log(selectedChatMessages);
	useEffect(() => {
		if (scorllRef.current) {
			scorllRef.current.scrollIntoView({ behavior: "smooth" });
		}
	}, [selectedChatMessages]);
	const renderMessages = () => {
		let lastDate = null;
		return selectedChatMessages.map((message, index) => {
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
	const renderDmMessages = (message) => (
		<div
			className={`${
				message.sender !== selectedChatData._id
					? "bg-[#8418ff]/5 text-[#8418ff]/90 border-[#8418ff]/50"
					: "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20"
			}`}
		></div>
	);
	return (
		<div className='flex-1 overflow-y-auto scrollbar-hidden p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full '>
			{renderMessages()}
			<div ref={scorllRef} />
		</div>
	);
};

export default MessageContainer;
