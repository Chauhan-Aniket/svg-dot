export const SectionSvg = ({ svgRef, children }) => {
	return (
		<section
			ref={svgRef}
			id="section-svg"
			className="flex justify-center items-center h-screen col-span-3 overflow-hidden bg-zinc-50 dark:bg-[rgba(22,22,25,1)]"
		>
			{children}
		</section>
	);
};

export const SectionSetting = ({ children, resetSvgParams }) => {
	return (
		<section id="section-setting" className="h-screen grid">
			<div className="w-full h-full p-5 bg-white dark:bg-zinc-900 border-l border-l-zinc-200 dark:border-l-zinc-800 dark:text-gray-50 overflow-auto">
				<div className="pb-4 flex flex-row justify-between items-center">
					<h3 className="font-medium tracking-[0.5px]">Options</h3>
					<button
						onClick={resetSvgParams}
						className="px-3 py-1 text-xs font-medium tracking-wider hover:bg-zinc-200 dark:hover:bg-zinc-800 dark:text-gray-50 rounded border border-zinc-200 dark:border-zinc-800 ease-in-out duration-100"
					>
						Reset
					</button>
				</div>
				{children}
			</div>
		</section>
	);
};
