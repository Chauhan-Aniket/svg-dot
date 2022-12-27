import React, { useState, useRef, useCallback } from "react";
import { FiCircle, FiUpload } from "react-icons/fi";
import { MdWindow } from "react-icons/md";

import Radial from "./components/svgRadial/Radial";
import Matrix from "./components/svgMatrix/Matrix";
import Custom from "./components/svgCustom/Custom";
import Tabs from "./components/utils/Tabs";
import Alert from "./components/utils/Alert";

const App = () => {
	const [visible, setVisible] = useState(false); // alert

	// TODO: Dark Mode
	const [darkToggle, setDarkToggle] = useState(true);
	const toggleTheme = () => setDarkToggle(!darkToggle);

	// TODO: Dowload SVG
	const svgRef = useRef();
	const downloadSVG = useCallback(() => {
		const dummy = document.createElement("div");
		// const svg = svgRef.current.innerHTML; // this gives &nbsp; error
		/* find all html entities and replace them with real value */
		var svg = svgRef.current.outerHTML.replace(
			/(&(?!(amp|gt|lt|quot|apos))[^;]+;)/g,
			(a) => {
				dummy.innerHTML = a;
				return dummy.textContent;
			}
		);
		const blob = new Blob([svg], { type: "image/svg+xml" });

		//TODO: Get empty circles, no text on circle
		const circles = svgRef.current.querySelectorAll("circle");
		const texts = svgRef.current.querySelectorAll("text");

		// make pointerEvents none to all circle
		if (circles.length === texts.length) {
			circles.forEach(
				(circle) =>
					circle.style.pointerEvents === "all" &&
					(circle.style.pointerEvents = "none")
			);
		}

		const circleArr = Array.from(circles); // convert Nodelist/array-like-object to array
		// run the condition only once, for the first item in the circles array that has a style different from 'none'/'all'.
		if (circleArr.some((circle) => circle.style.pointerEvents !== "none")) {
			showAlert();
			// remove alert after 3s
			setTimeout(() => {
				hideAlert();
			}, 3000);
			return;
		}

		if (circleArr.some((circle) => circle.style.pointerEvents !== "all")) {
			downloadBlob(blob, `exported-file.svg`);
			hideAlert();
			return;
		}
	}, []);

	const downloadBlob = (blob, filename) => {
		const objectUrl = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = objectUrl;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
	};

	//  TODO: Custom alert pop-up
	const showAlert = () => {
		setVisible(true);
	};
	const hideAlert = () => {
		setVisible(false);
	};

	const resetFunc = useRef(null);

	return (
		<div className={darkToggle ? "dark relative" : "relative"}>
			<Tabs
				downloadSVG={downloadSVG}
				darkToggle={darkToggle}
				toggleTheme={toggleTheme}
				resetFunc={resetFunc}
			>
				<Radial
					title="Radial SVG"
					label={FiCircle}
					svgRef={svgRef}
					darkToggle={darkToggle}
					resetFunc={resetFunc}
				/>
				<Matrix
					title="Matrix SVG"
					label={MdWindow}
					svgRef={svgRef}
					darkToggle={darkToggle}
					resetFunc={resetFunc}
				/>
				<Custom
					title="Custom SVG"
					label={FiUpload}
					svgRef={svgRef}
					darkToggle={darkToggle}
					resetFunc={resetFunc}
				/>
			</Tabs>
			{visible && <Alert hideAlert={hideAlert} />}
		</div>
	);
};

export default App;
