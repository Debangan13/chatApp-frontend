import React, { useEffect } from "react";
import { Logo } from "./svg/Logo";
import Title from "./Title/Title";
import ProfileInfo from "./component/profile-info";
import NewDM from "./component/new-dm";
import ContactList from "./component/contact-list";
import { apiClient } from "@/lib/api-client";
import { GET_DM_CONTACTS_ROUTE } from "@/utils/constants";
import { useAppStore } from "@/store";

const ContactsContainer = () => {
    const {setDirectMessagesContacts,directMessagesContacts} = useAppStore()
	useEffect(() => {
		const getDmContacts = async () => {
			const response = await apiClient.get(GET_DM_CONTACTS_ROUTE);
            if(response.data.contacts){
                setDirectMessagesContacts(response.data.contacts)
            }
		};
		getDmContacts();
	}, []);
	return (
		<div className='relative md:w-[35vw] lg:w-[30vw] lx:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full '>
			<div className='pt-3'>
				<Logo />
			</div>
			<div className='my-5'>
				<div className='flex items-center justify-between pr-10'>
					<Title text='Direct Messages' />
					<NewDM />
				</div>
                <div className="max-h-[38vh] overflow-y-auto scrollbar-hidden ">
                    <ContactList contacts={directMessagesContacts}/>
                </div>
			</div>
			<div className='my-5'>
				<div className='flex items-center justify-between pr-10'>
					<Title text='channels' />
				</div>
			</div>
			<ProfileInfo />
		</div>
	);
};

export default ContactsContainer;
