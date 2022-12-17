import React from "react";

const TabButton = ({ title, children, clickEvent }) => {
	return (
		<button
			title={title}
			onClick={() => clickEvent.current()}
			className="w-full h-full flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-gray-50 rounded-lg border border-zinc-200 dark:border-zinc-800 ease-in-out duration-200"
		>
			{children}
		</button>
	);
};

export default TabButton;
