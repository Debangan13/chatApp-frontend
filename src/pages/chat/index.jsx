import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppStore } from "@/store";
import ContactsContainer from "./components/contacts-container";
import EmptyChatConatiner from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
	const { userInfo, selectedChatType, selectedChatData } = useAppStore();
	const navigate = useNavigate();
  console.log("seledtedCahType",selectedChatType)
  console.log("seledtedCahData",selectedChatData)

	useEffect(() => {
		if (!userInfo.profileSetup) {
			toast.error("Please setup profile to continue.");
			navigate("/profile");
		}
	}, [userInfo, navigate]);
	return (
		<div className='flex h-[100vh] text-white overflow-hidden '>
			<ContactsContainer />
			{selectedChatType === undefined ? (
				<EmptyChatConatiner />
			) : (
				<ChatContainer />
			)}
		</div>
	);
};

export default Chat;
