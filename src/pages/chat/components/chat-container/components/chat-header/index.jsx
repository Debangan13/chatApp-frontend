import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import React from "react";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
	const { closeChat, selectedChatData, selectedChatType } = useAppStore();
	const { image, firstName, lastName, email, color } = selectedChatData;
	console.log(selectedChatData)
	return (
		<div className='h-[10vh] border-b-2 border-[#2f303b] flex items-center justify-between '>
			<div className='flex gap-5 items-center w-full justify-between'>
				<div className='flex gap-3 items-center justify-center '>
					<div className='ml-2 w-12 h-12 relative'>
						<Avatar className='h-12 w-12 rounded-full overflow-hidden'>
							{image ? (
								<AvatarImage
									src={image}
									alt='profile'
									className='object-cover w-full h-full bg-black'
								/>
							) : (
								<div
									className={`uppercase h-12 w-12 text-3xl border-[1px] flex items-center justify-center rounded-full ${getColor(
										color
									)} `}
								>
									{firstName
										? firstName.split("").shift()
										: email.split("").shift()}
								</div>
							)}
						</Avatar>
					</div>
					<div className='flex flex-col'>
						<span>
							{selectedChatType === "contact" && `${firstName} ${lastName}`}
						</span>
					</div>
				</div>
				<div className='flex gap-5 items-center justify-center '>
					<button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-400 transition-all'>
						<RiCloseFill className='text-3xl' onClick={closeChat} />
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChatHeader;
