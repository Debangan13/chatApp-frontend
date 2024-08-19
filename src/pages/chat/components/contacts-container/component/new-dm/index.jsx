import React from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { FaPlus } from "react-icons/fa";

const NewDM = () => {
	return (
		<>
			<TooltipProvider>
				<Tooltip>
					<TooltipTrigger>
					</TooltipTrigger>
					<TooltipContent >
						<FaPlus/>
					</TooltipContent>
				</Tooltip>
			</TooltipProvider>
		</>
	);
};

export default NewDM;
