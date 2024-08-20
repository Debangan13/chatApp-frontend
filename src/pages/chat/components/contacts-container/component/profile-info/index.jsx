import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import React from "react";
import {FiEdit2} from 'react-icons/fi'
import { useNavigate } from "react-router-dom";
import { IoPowerSharp } from "react-icons/io5";
import { apiClient } from "@/lib/api-client";
import { LOGOUT_ROUTE } from "@/utils/constants";
import { toast } from "sonner";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"


const ProfileInfo = () => {
	const { userInfo,setUserInfo } = useAppStore();
	const { image, firstName, lastName, email, color } = userInfo;
	const navigate = useNavigate()

    const handledLogout = async () => {
        try {
            const response = await apiClient.post(LOGOUT_ROUTE);
            if (response.status === 200) {
                setUserInfo(null);  
                toast.success("Logout successfully");
                navigate("/auth");
            }
        } catch (error) {
            console.error("Logout failed:", error);
            toast.error("Logout failed");
        }
    };
    

	return (
		<div className='absolute bottom-0 h-16 flex justify-between items-center px-10 w-full bg-[#2a2b33]'>
			<div className='flex gap-3 items-center justify-center'>
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
			<div>{firstName && lastName ? `${firstName}` : ""}</div>
			<div>
				<div className='flex gap-5'>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
                                <FiEdit2 className="text-purple-500" onClick={()=> navigate("/profile")}/>
                            </TooltipTrigger>
							<TooltipContent className="bg-[#1c1b1e] border-none text-white' " >
								Edit Profile
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
                               <IoPowerSharp className="text-red-500" onClick={handledLogout}/>
                            </TooltipTrigger>
							<TooltipContent className="bg-[#1c1b1e] border-none text-white' " >
								Logout
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
