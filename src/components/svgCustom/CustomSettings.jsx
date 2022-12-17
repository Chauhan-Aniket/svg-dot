import React from "react";

const CustomSettings = ({ innerHTML, getSvg, handleFileChange }) => {
	return (
		<>
			<form className="w-full py-5 border-t border-t-zinc-200 dark:border-t-[rgba(42,42,45,1)]">
				<input
					type="file"
					accept="image/svg+xml"
					onChange={handleFileChange}
					className="w-full cursor-pointer text-sm tracking-[0.5px]"
					title="Upload SVG File"
				/>
			</form>

			{innerHTML.__html === "" ? (
				<div className="uploaded-svg text-sm tracking-[0.5px]">
					Click here after SVG Uploaded
				</div>
			) : (
				<div
					id="miniSvg"
					dangerouslySetInnerHTML={innerHTML}
					className="uploaded-svg"
				></div>
			)}
		</>
	);
};

export default CustomSettings;
