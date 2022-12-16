import React, { useState } from "react";
import SvgRadial from "./SvgRadial";
import RadialSettings from "./RadialSettings";

import { radialParams } from "../Params";
import { SectionSvg, SectionSetting } from "../Style";

const Radial = ({ svgRef, darkToggle }) => {
	const [radius, setRadius] = useState(radialParams.radius);
	const [radialCount, setRadialCount] = useState(radialParams.radialCount);
	const [verticleCount, setVerticleCount] = useState(
		radialParams.verticleCount
	);
	const [centerDistance, setCenterDistance] = useState(
		radialParams.centerDistance
	);
	const [edgeDistance, setEdgeDistance] = useState(radialParams.edgeDistance);
	const [offset, setOffset] = useState(radialParams.offset);

	const radiusValue = (e) => {
		setRadius(e.target.value);
	};
	const radialCountValue = (e) => {
		setRadialCount(e.target.value);
	};
	const verticleCountValue = (e) => {
		setVerticleCount(e.target.value);
	};
	const centerDistanceValue = (e) => {
		setCenterDistance(e.target.value);
	};
	const edgeDistanceValue = (e) => {
		setEdgeDistance(e.target.value);
	};
	const offsetValue = (e) => {
		setOffset(e.target.value);
	};

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
				<SvgRadial
					svgRef={svgRef}
					radius={radius}
					radialCount={radialCount}
					verticleCount={verticleCount}
					centerDistance={centerDistance}
					edgeDistance={edgeDistance}
					offset={offset}
					textOrigin={textOrigin}
					handleRemove={handleRemove}
					createTextOrigin={createTextOrigin}
					darkToggle={darkToggle}
				/>
			</SectionSvg>
			<SectionSetting>
				<RadialSettings
					radius={radius}
					radiusValue={radiusValue}
					radialCount={radialCount}
					radialCountValue={radialCountValue}
					verticleCount={verticleCount}
					verticleCountValue={verticleCountValue}
					centerDistance={centerDistance}
					centerDistanceValue={centerDistanceValue}
					edgeDistance={edgeDistance}
					edgeDistanceValue={edgeDistanceValue}
					offset={offset}
					offsetValue={offsetValue}
				/>
			</SectionSetting>
		</>
	);
};

export default Radial;
