import React, { useState, useEffect } from "react";
import SvgCustom from "./SvgCustom";
import CustomSettings from "./CustomSettings";

import { SectionSvg, SectionSetting } from "../Style";

const Custom = ({ svgRef, darkToggle, resetFunc }) => {
	const [innerHTML, setInnerHTML] = useState({ __html: "" });

	const handleFileChange = (e) => {
		// Use the FileReader API to read the contents of the file
		const reader = new FileReader();
		reader.readAsText(e.target.files[0], "UTF-8");
		reader.onload = () => {
			// Set the SVG file as the inner HTML of the component
			setInnerHTML({ __html: reader.result });
		};
	};

	// TODO: get origin from uploaded file to create svg dynamically
	const [viewBox, setViewBox] = useState({});
	const [originArr, setOriginArr] = useState([]);
	const [circleRadius, setCircleRadius] = useState(10);
	const origin = [];

	const getSvg = (e) => {
		const paths = e.target.querySelectorAll("path");
		const circles = e.target.querySelectorAll("circle");
		const ellipses = e.target.querySelectorAll("ellipse");

		paths &&
			paths.forEach((path) => {
				const pathOrigin = betweenChar(path.getAttribute("d"), "M", "c").split(
					" "
				);
				origin.push({
					x: parseFloat(pathOrigin[0]),
					y: parseFloat(pathOrigin[1]),
				});
			});

		circles &&
			circles.forEach((circle) => {
				origin.push({
					x: circle.getAttribute("cx"),
					y: circle.getAttribute("cy"),
				});
				setCircleRadius(circle.getAttribute("r"));
			});

		ellipses &&
			ellipses.forEach((ellipse) => {
				origin.push({
					x: ellipse.getAttribute("cx"),
					y: ellipse.getAttribute("cy"),
				});
			});

		setOriginArr(origin);
		setViewBox(e.target.viewBox.baseVal);
	};

	// TODO: find string between two character
	function betweenChar(text, begin, end) {
		var firstChar = text.indexOf(begin) + begin.length;
		var lastChar = text.indexOf(end);
		var newText = text.substring(firstChar, lastChar);
		return newText.trim();
	}

	// TODO: create dynamic text position
	const [textOrigin, setTextOrigin] = useState([]);

	const createTextOrigin = (e) => {
		const x = e.target.cx.baseVal.value;
		const y = e.target.cy.baseVal.value;

		if (!textOrigin.some((origin) => origin.x === x && origin.y === y)) {
			setTextOrigin((prev) => [...prev, { x, y }]);
		}
	};

	// TODO: reset text and line
	useEffect(() => {
		const resetSvg = () => {
			setTextOrigin([]);

			const circles = svgRef.current.querySelectorAll("circle");
			circles &&
				circles.forEach((circle) => (circle.style.pointerEvents = "all"));
		};

		resetFunc.current = resetSvg;
	}, [resetFunc, svgRef]);

	// TODO: remove text element
	const handleRemove = (e) => {
		const newItems = textOrigin.slice(0, Number(e.target.textContent));
		setTextOrigin(newItems);

		const newTextOrigin = [...textOrigin];
		removeTexts(newTextOrigin, Number(e.target.textContent));
		e.shiftKey && setTextOrigin(newTextOrigin);
	};

	// TODO: remove element from selected element index
	function removeTexts(arr, element) {
		const startIndex = arr.indexOf(element);
		const numElements = arr.length - startIndex;
		arr.splice(startIndex, numElements);
	}

	useEffect(() => {
		const miniSvg = document.getElementById("miniSvg");
		miniSvg && miniSvg.addEventListener("click", getSvg);
	});

	return (
		<>
			<SectionSvg>
				<SvgCustom
					svgRef={svgRef}
					viewBox={viewBox}
					originArr={originArr}
					textOrigin={textOrigin}
					handleRemove={handleRemove}
					circleRadius={circleRadius}
					createTextOrigin={createTextOrigin}
					darkToggle={darkToggle}
				/>
			</SectionSvg>
			<SectionSetting>
				<CustomSettings
					innerHTML={innerHTML}
					handleFileChange={handleFileChange}
				/>
			</SectionSetting>
		</>
	);
};

export default Custom;
