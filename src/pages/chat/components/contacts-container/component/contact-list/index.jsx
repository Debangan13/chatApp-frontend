import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";

const ContactList = ({ contacts, isChannel = false }) => {
	const {
		selectedChatData,
		setSelectedChatType,
		setSelectedChatData,
		setSelectedChatMessages,
	} = useAppStore();

	console.log(selectedChatData);
	const handleClick = (contact) => {
		console.log(contact);
		if (isChannel) setSelectedChatType("channel");
		else setSelectedChatType("contact");
		setSelectedChatData(contact);
		console.log(selectedChatData);
		if (selectedChatData?._id !== contact._id) {
			setSelectedChatMessages([]);
		}
	};

	return (
		<div className='mt-5'>
			{contacts.map((contact, index) => {
				const { image, firstName, lastName, email, color } = contact;
				console.log(image, firstName, lastName, email, color);
				return (
					<div
						key={index}
						className={`pl-10 py-2 transition-all duration-300 cursor-pointer ${
							selectedChatData && selectedChatData._id === contact._id
								? "bg-[#8417ff] hover:bg-[#3e3461] "
								: "hover:bg-[#f1f1f111] "
						}
                        `}
						onClick={() => handleClick(contact)}
					>
						<div className='flex gap-5 items-center justify-start text-neutral-300'>
							{!isChannel && (
								<Avatar className='h-10 w-10 rounded-full overflow-hidden'>
									{image ? (
										<AvatarImage
											src={image}
											alt='profile'
											className='object-cover w-full h-full bg-black'
										/>
									) : (
										<div
											className={`${
												selectedChatData && selectedChatData._id === contact._id
													? "bg-[#ffffff22] border-2 border-white/50"
													: getColor(color)
											} uppercase h-10 w-10 text-3xl border-[1px] flex items-center justify-center rounded-full 
											 `}
										>
											{firstName
												? firstName.split("").shift()
												: email.split("").shift()}
										</div>
									)}
								</Avatar>
							)}
							{isChannel && (
								<div className='bg-[#ffffff22] h-10 w-10 flex items-center justify-center rounded-full '>
									#
								</div>
							)}
							{isChannel ? (
								<span>{contact.name}</span>
							) : (
								<span>
									{contact.firstName} {contact.lastName}
								</span>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ContactList;
