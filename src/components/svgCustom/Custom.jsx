import React, { useState, useRef } from "react";
import SvgCustom from "./SvgCustom";
import CustomSettings from "./CustomSettings";

import { SectionSvg, SectionSetting } from "../Style";

const Custom = ({ svgRef, darkToggle }) => {
	const [innerHTML, setInnerHTML] = useState({ __html: "" });
	const fileRef = useRef(null);

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
	const origin = [];

	const getSvg = (e) => {
		const paths = e.target.querySelectorAll("path");
		const circles = e.target.querySelectorAll("circle");

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
		e.target.style.pointerEvents = "none";
		setTextOrigin([
			...textOrigin,
			{
				tx: e.target.cx.baseVal.value,
				ty: e.target.cy.baseVal.value,
			},
		]);
	};

	// TODO: remove text element
	const handleRemove = (e) => {
		const newItems = textOrigin.slice(0, Number(e.target.textContent));
		setTextOrigin(newItems);

		const newTextOrigin = [...textOrigin];
		removeTexts(newTextOrigin, Number(e.target.textContent));
		e.shiftKey && setTextOrigin(newTextOrigin);

		// TODO: apply pointer events to all circle
		for (let i = 0; i < e.target.parentElement.children.length; i++) {
			const { pointerEvents } = getComputedStyle(
				e.target.parentElement.children[i]
			);
			(e.shiftKey && e.ctrlKey) ||
				(pointerEvents === "none" &&
					(e.target.parentElement.children[i].style.pointerEvents = "all"));
		}
	};

	// TODO: remove element from selected element index
	function removeTexts(arr, element) {
		const startIndex = arr.indexOf(element);
		const numElements = arr.length - startIndex;
		arr.splice(startIndex, numElements);
	}

	return (
		<>
			<SectionSvg>
				<SvgCustom
					svgRef={svgRef}
					viewBox={viewBox}
					originArr={originArr}
					textOrigin={textOrigin}
					handleRemove={handleRemove}
					createTextOrigin={createTextOrigin}
					darkToggle={darkToggle}
				/>
			</SectionSvg>
			<SectionSetting>
				<CustomSettings
					fileRef={fileRef}
					innerHTML={innerHTML}
					getSvg={getSvg}
					handleFileChange={handleFileChange}
				/>
			</SectionSetting>
		</>
	);
};

export default Custom;
