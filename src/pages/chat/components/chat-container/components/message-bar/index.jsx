import React, { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import EmojiPicker from "emoji-picker-react";
import { io } from "socket.io-client";

const MessageBar = () => {
	const [message, setMessage] = useState("");
	const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
	const emojiRef = useRef();

	useEffect(() => {
		const handledClickOuside = (e) => {
			if (emojiRef.current && !emojiRef.current.contains(e.target)) {
				setEmojiPickerOpen(false);
			}
		};
		document.addEventListener("mousedown", handledClickOuside);
		return () => {
			document.removeEventListener("mousedown", handledClickOuside);
		};
	}, [emojiRef]);

	const handledAddEmoji = (emoji) => {
		setMessage((msg) => msg + emoji.emoji);
	};

	const handledSendMessage = () => {
		
	};

	return (
		<div className='h-[10vh] bg-[#1d1d25] flex justify-center items-center px-8 mb-5 gap-6 '>
			<div className='flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 '>
				<input
					type='text'
					className='flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none '
					placeholder='Enter message'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-400 transition-all'>
					<GrAttachment />
				</button>
				<div className='relative'>
					<button
						className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-400 transition-all'
						onClick={() => setEmojiPickerOpen(true)}
					>
						<RiEmojiStickerLine />
					</button>
					<div className='absolute bottom-16 right-0' ref={emojiRef}>
						<EmojiPicker
							theme='dark'
							open={emojiPickerOpen}
							onEmojiClick={handledAddEmoji}
							autoFocusSearch={false}
						/>
					</div>
				</div>
			</div>
			<button
				className='bg-[#8417ff] focus:border-none focus:outline-none focus:text-white hover:bg-[#741bda] focus:bg-[#741bda] flex items-center justify-center p-5 duration-400 transition-all'
				onClick={handledSendMessage}
			>
				<IoSend />
			</button>
		</div>
	);
};

export default MessageBar;
