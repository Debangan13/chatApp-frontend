import React from "react";
import { Logo } from "./svg/Logo";
import Title from "./Title/Title";

const ContactsContainer = () => {
	return (
		<div className='relative md:w-[35vw] lg:w-[30vw] lx:w-[20vw] bg-[#1b1c24] border-r-2 border-[#2f303b] w-full '>
			<div className="pt-3"> 
				<Logo />
			</div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="Direct Messages"/>
                </div>
            </div>
            <div className="my-5">
                <div className="flex items-center justify-between pr-10">
                    <Title text="channels"/>
                </div>
            </div>
		</div>
	);
};

export default ContactsContainer;
