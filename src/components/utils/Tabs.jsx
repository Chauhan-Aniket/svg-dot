import React, { useState } from "react";
import { FiDownload, FiSun, FiMoon } from "react-icons/fi";
import TabButton from "./TabButton";

const Tabs = ({
	children,
	downloadSVG,
	darkToggle,
	toggleTheme,
	resetFunc,
}) => {
	const [activeTab, setActiveTab] = useState(0);

	const btnClass =
		"w-full h-full flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-gray-50 rounded-lg border border-zinc-200 dark:border-zinc-800 ease-in-out duration-200";
	const btnActiveClass =
		"w-full h-full flex items-center justify-center text-zinc-50 bg-blue-600 hover:bg-blue-800 rounded-lg ease-in-out duration-200";

	return (
		<div className="grid grid-cols-12">
			<div className="w-full grid place-items-center dark:bg-zinc-900">
				<div className="flex flex-col justify-between gap-12 w-2/4 h-5/6 border border-zinc-200 dark:border-zinc-800 rounded-lg">
					<ul className="px-2 py-3 flex flex-col gap-3 items-center justify-between rounded-lg overflow-hidden">
						{children.map((child, index) => {
							return (
								<li key={index} className="w-full h-10">
									<button
										onClick={() => setActiveTab(index)}
										className={activeTab === index ? btnActiveClass : btnClass}
										title={child.props.title}
									>
										<child.props.label className="scale-125" />
									</button>
								</li>
							);
						})}
						<li className="w-full">
							<hr className="border-zinc-300 dark:border-zinc-800" />
						</li>
						<li className="w-full h-10">
							<TabButton title="Reset" clickEvent={resetFunc}>
								<svg
									fill="none"
									height="1em"
									width="1em"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg"
									className="scale-125"
								>
									<path d="M4.09 7.413A9.143 9.143 0 1 1 2.857 12"></path>
									<path d="M8.571 7.429H4V2.857"></path>
								</svg>
							</TabButton>
						</li>
					</ul>
					<div className="flex flex-col gap-3 px-2 py-3 rounded-lg">
						<div className="btn-theme h-10">
							<button
								onClick={toggleTheme}
								className={btnClass}
								title={darkToggle ? "Light Mode" : "Dark Mode"}
							>
								{darkToggle ? (
									<FiSun className="scale-125" />
								) : (
									<FiMoon className="scale-125" />
								)}
							</button>
						</div>
						<hr className="border-zinc-300 dark:border-zinc-800" />
						<div className="btn-download h-10">
							<button
								onClick={downloadSVG}
								className={btnActiveClass}
								title="Download SVG"
							>
								<FiDownload className="scale-125" />
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="col-span-11">
				<div className="grid grid-cols-4">{children[activeTab]}</div>
			</div>
		</div>
	);
};

export default Tabs;
