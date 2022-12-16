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

export const SectionSetting = ({ children }) => {
	return (
		<section id="section-setting" className="h-screen grid">
			<div className="w-full h-full p-5 bg-white dark:bg-zinc-900 border-l border-l-zinc-200 dark:border-l-zinc-800 dark:text-gray-50 overflow-auto">
				<div>
					<h3 className="mb-4 font-medium tracking-[0.5px]">Options</h3>
				</div>
				{children}
			</div>
		</section>
	);
};
