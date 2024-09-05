import React, { useState } from "react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaPlus } from "react-icons/fa";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Lottie from "react-lottie";
import { ainmationDefaultOptions, getColor } from "@/lib/utils";
import { apiClient } from "@/lib/api-client";
import { SEARCH_CONTACTS_ROUTE } from "@/utils/constants";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

const NewDM = () => {
	const [opneNewContactModal, setopneNewContactModal] = useState(false);
	const { setSelectedChatType, setSelectedChatData } = useAppStore();
	const [searchedContact, setSearchedContact] = useState([]);

	const selectNewContact = (contact) => {
		console.log("in selectNewContact:",contact)
		setopneNewContactModal(false);
		setSelectedChatType("contact");
		setSelectedChatData(contact);
		setSearchedContact([]);
	};

	const searchContact = async (searchTerm) => {
		try {
			if (searchTerm.length > 0) {
				const response = await apiClient.post(SEARCH_CONTACTS_ROUTE, {
					searchTerm,
				});

				if (response.status === 200 && response.data.contacts) {
					setSearchedContact(response.data.contacts);
				}
			} else {
				setSearchedContact([]);
			}
		} catch (error) {
			console.log(error);
		}
	};

	// This is for delaying the request when user typing fast
	const debounce = (func, delay) => {
		let timer;
		return function (...args) {
			clearTimeout(timer);
			timer = setTimeout(() => func.apply(this, args), delay);
		};
	};

	const searchContactDebounced = debounce(searchContact, 300);

	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
						<FaPlus
							className='text-neutral-400 font-light text-opacity-90 text-start hover:text-neutral-100 cursor-pointer'
							onClick={() => setopneNewContactModal(true)}
						/>
					</TooltipTrigger>
					<TooltipContent className='bg-[#1c1b1e] border-none md-2 p-3 text-white'>
						Select New Contact
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
			<Dialog open={opneNewContactModal} onOpenChange={setopneNewContactModal}>
				<DialogContent className='bg-[#181920] border-none text-white w-[400px] h-[400px] flex flex-col items-center '>
					<DialogHeader>
						<DialogTitle>Please select a contact</DialogTitle>
					</DialogHeader>
					<Input
						placeholder='Search Contact'
						className='rounded-lg p-6 bg-[#2c2e3b] border-none '
						onChange={(e) => searchContactDebounced(e.target.value)}
					/>
					{searchedContact.length > 0 && (
						<ScrollArea className='h-[250px] w-full '>
							<div className='flex flex-col gap-5 '>
								{searchedContact.map((contact) => {
									const { image, firstName, lastName, email, color, _id } =
										contact;
									return (
										<div
											key={_id}
											className='flex items-center gap-3 cursor-pointer'
											onClick={() => selectNewContact(contact)}
										>
											<div className='w-12 h-12 relative'>
												<Avatar className='h-12 w-12 rounded-full overflow-hidden'>
													{image ? (
														<AvatarImage
															src={image}
															alt='profile'
															className='object-cover w-full h-full bg-black'
														/>
													) : (
														<div
															className={`uppercase h-12 w-12 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
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
													{firstName && lastName
														? `${firstName} ${lastName}`
														: ""}
												</span>
												<span className='text-xs'>{email}</span>
											</div>
										</div>
									);
								})}
							</div>
						</ScrollArea>
					)}

					{searchedContact.length <= 0 && (
						<div>
							<div className='flex-1 mt-5 md:flex flex-col justify-center items-center duration-1000 transition-all '>
								<Lottie
									isClickToPauseDisabled={true}
									height={100}
									width={100}
									options={ainmationDefaultOptions}
								/>
								<div className='text-opacity-80 flex flex-col gap-5 items-center justify-center mt-5 lg:text-2xl text-xl transition-all duration300 text-center'>
									<h3 className='poppins-medium'>
										Search New
										<span className='text-purple-500'> Contact</span>
										<span className='text-purple-500'>.</span>
									</h3>
								</div>
							</div>
						</div>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

export default NewDM;
