import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColor } from "@/lib/utils";
import { useAppStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { FaTrash, FaPlus } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
	REMOVE_PROFILE_IMAGE,
	UPDATE_PROFILE_ROUTE,
	UPLOAD_PROFILE_IMAGE,
} from "@/utils/constants";
import { useNavigate } from "react-router-dom";

const Profile = () => {
	const { userInfo, setUserInfo } = useAppStore();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [image, setImage] = useState(null);
	const [hovered, setHovered] = useState(false);
	const [selectedColor, setSelectedColor] = useState(0);
	const navigate = useNavigate();
	const fileInputRef = useRef(null);

	useEffect(() => {
		const {
			profileSetup,
			firstName,
			lastName,
			color,
			image: profileImage,
		} = userInfo;
		if (profileSetup) {
			setFirstName(firstName);
			setLastName(lastName);
			setSelectedColor(color);
			if (profileImage) {
				setImage(profileImage);
			}
		}
	}, [userInfo]);

	const validateProfile = () => {
		if (!firstName) {
			toast.error("First name is required");
			return false;
		}
		if (!lastName) {
			toast.error("Last name is required");
			return false;
		}
		return true;
	};
	const saveChanges = async () => {
		if (validateProfile()) {
			try {
				const response = await apiClient.post(UPDATE_PROFILE_ROUTE, {
					firstName,
					lastName,
					color: selectedColor,
				});
				console.log("RESPONSE",response.data.user)
				if (response.status === 200 && response.data.user) {
					// setUserInfo({ ...response.data.user });
					setUserInfo({ ...userInfo, profileSetup: true, firstName, lastName, color: selectedColor, image });
  
					toast.success("Profile updated successfully");
					navigate("/chat");
				}
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
	};

	const handleNavigate = () => {
		userInfo.profileSetup
			? navigate("/chat")
			: toast("Please setup profile first");
	};

	const handledFileInputClick = () => {
		fileInputRef.current.click();
	};
	const handledImageChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			try {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", "upload_image"); // replace with your actual preset
				formData.append("cloud_name", "duckmy6re");
				formData.append("folder", "profileImage");
				// uploading the ProfileImage to cloudinary
				const response = await apiClient.post(
					`https://api.cloudinary.com/v1_1/duckmy6re/image/upload`,
					formData,
					{ withCredentials: false }
				);
				const profileImageUrl = response.data.secure_url;

				profileImageUrl
					? setImage(profileImageUrl)
					: console.error("upload falied:", data);
				// uploading the profileimage to the backend
				const uploadImage = await apiClient.post(UPLOAD_PROFILE_IMAGE, {
					image: profileImageUrl
				});
				if (uploadImage.status === 200 && uploadImage.data.user.image) {
					setUserInfo({
						...userInfo,
						image: profileImageUrl,
						publicID: response.data.public_id,
					});
					toast.success("Image uploaded successfully");
				}
			} catch (error) {
				console.error("Error uploading image:", error);
			}
		}
	};
	const handledDeleteImage = async () => {
		try {
			const publicID =userInfo.publicID 
			const response = await apiClient.delete(REMOVE_PROFILE_IMAGE, {
				data:{publicID} 
			});
			if (response.status === 200) {
				setUserInfo({ ...userInfo, image: null });
				toast.success("Image removed successfully");
				setImage(null);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10 '>
			<div className='flex flex-col gap-10 w-[80vw] md:w-max '>
				<div>
					<IoArrowBack
						className='text-4xl lg:text-6xl text-white/90 cursor-pointer '
						onClick={handleNavigate}
					/>
				</div>
				<div className='grid grid-cols-2'>
					<div
						className='h-full w-32 md:w-48 md:h-48 relative flex items-center justify-center'
						onMouseEnter={() => setHovered(true)}
						onMouseLeave={() => setHovered(false)}
					>
						<Avatar className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'>
							{image ? (
								<AvatarImage
									src={image}
									alt='profile'
									className='object-cover w-full h-full bg-black'
								/>
							) : (
								<div
									className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
										selectedColor
									)} `}
								>
									{firstName
										? firstName.split("").shift()
										: userInfo.email.split("").shift()}
								</div>
							)}
						</Avatar>
						{hovered && (
							<div
								className='absolute inset-0 flex items-center justify-center bg-black/50  rounded-full'
								onClick={image ? handledDeleteImage : handledFileInputClick}
							>
								{image ? (
									<FaTrash className='text-white text-3xl cursor-pointer' />
								) : (
									<FaPlus className='text-white text-3xl cursor-pointer' />
								)}
							</div>
						)}
						<input
							type='file'
							ref={fileInputRef}
							className='hidden'
							onChange={handledImageChange}
							name='profile-image'
							accept='.jpg,.png,.svg,.jpeg,.webp'
						/>
					</div>
					<div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center'>
						<div className='w-full'>
							<Input
								placeholder='Email'
								type='email'
								disabled
								value={userInfo.email}
								className='rounded-lg p-6 bg-[#2c2e3b] border-none '
							/>
						</div>
						<div className='w-full'>
							<Input
								placeholder='First name'
								type='text'
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className='rounded-lg p-6 bg-[#2c2e3b] border-none '
							/>
						</div>
						<div className='w-full'>
							<Input
								placeholder='Last name'
								type='text'
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className='rounded-lg p-6 bg-[#2c2e3b] border-none '
							/>
						</div>
						{/* seatting up the color here */}
						<div className='w-full flex gap-5'>
							{colors.map((color, index) => {
								return (
									<div
										className={`h-8 w-8 ${color} rounded-full cursor-pointer transition-all duration-300 
											${selectedColor === index ? "outline outline-white outline-1" : ""}
										`}
										onClick={() => setSelectedColor(index)}
										key={index}
									></div>
								);
							})}
						</div>
					</div>
				</div>
				<div className='w-full'>
					<Button
						className='h-16 w-full bg-purple-700 hover:bg-purple-900 '
						onClick={saveChanges}
					>
						save Changes
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Profile;
