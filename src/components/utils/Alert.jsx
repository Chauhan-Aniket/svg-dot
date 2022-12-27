import React from "react";
import { MdCancel } from "react-icons/md";

const Alert = ({ hideAlert }) => {
	return (
		<div className="px-4 py-4 w-1/4 absolute top-10 left-2/4 translate-x-[-50%] translate-y-[-50%] border bg-red-50 text-red-500 border-red-500 dark:bg-red-900 dark:text-red-300 dark:border-red-300 tracking-[0.85px] rounded">
			<div className="relative flex items-center justify-between">
				<p className="flex items-center">
					You have an empty&nbsp;
					<span className="font-medium">Circle</span>
				</p>
				<button onClick={hideAlert}>
					<MdCancel className="scale-110 hover:fill-red-200 transition ease-in-out duration-200" />
				</button>
			</div>
		</div>
	);
};

export default Alert;
