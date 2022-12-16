import React, { useEffect } from "react";

const CustomSettings = ({ fileRef, innerHTML, getSvg, handleFileChange }) => {
	const svgEle = fileRef.current;

	useEffect(() => {
		svgEle === null
			? console.log("Upload SVG")
			: svgEle.children[0].addEventListener("click", getSvg);
	});

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
				<div ref={fileRef} className="uploaded-svg text-sm tracking-[0.5px]">
					Click here after SVG Uploaded
				</div>
			) : (
				<div
					ref={fileRef}
					dangerouslySetInnerHTML={innerHTML}
					className="uploaded-svg"
				></div>
			)}
		</>
	);
};

export default CustomSettings;
