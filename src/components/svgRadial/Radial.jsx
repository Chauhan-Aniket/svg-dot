import React, { useState, useEffect } from "react";
import SvgRadial from "./SvgRadial";
import RadialSettings from "./RadialSettings";

import { radialParams } from "../Params";
import { SectionSvg, SectionSetting } from "../Style";

const Radial = ({ svgRef, darkToggle, resetFunc }) => {
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

	// TODO: reset params
	const resetSvgParams = () => {
		setRadius(radialParams.radius);
		setRadialCount(radialParams.radialCount);
		setVerticleCount(radialParams.verticleCount);
		setCenterDistance(radialParams.centerDistance);
		setEdgeDistance(radialParams.edgeDistance);
		setOffset(radialParams.offset);
	};

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

	// TODO: zoom and pan effect
	useEffect(() => {
		const svgImage = document.getElementById("svgImage");
		const svgContainer = document.getElementById("svgContainer");
		let viewBox = {
			x: -svgImage.viewBox.baseVal.width / 2,
			y: -svgImage.viewBox.baseVal.height / 2,
			w: svgImage.viewBox.baseVal.width,
			h: svgImage.viewBox.baseVal.height,
		};

		svgImage.setAttribute(
			"viewBox",
			`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
		);
		const svgSize = { w: svgImage.clientWidth, h: svgImage.clientHeight };
		let isPanning = false;
		let startPoint = { x: 0, y: 0 };
		let endPoint = { x: 0, y: 0 };
		let scale = 1;

		svgContainer.onmousewheel = function (e) {
			e.preventDefault();
			let w = viewBox.w;
			let h = viewBox.h;
			let mx = e.offsetX; //mouse x
			let my = e.offsetY;
			let dw = w * Math.sign(e.deltaY) * 0.05;
			let dh = h * Math.sign(e.deltaY) * 0.05;
			let dx = (dw * mx) / svgSize.w;
			let dy = (dh * my) / svgSize.h;
			viewBox = {
				x: viewBox.x + dx,
				y: viewBox.y + dy,
				w: viewBox.w - dw,
				h: viewBox.h - dh,
			};
			scale = svgSize.w / viewBox.w;
			svgImage.setAttribute(
				"viewBox",
				`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
			);
		};

		svgContainer.onmousedown = function (e) {
			isPanning = true;
			startPoint = { x: e.x, y: e.y };
			e.target.classList.add("cursor-grabbing");
			e.target.classList.remove("cursor-grab");
		};

		svgContainer.onmousemove = function (e) {
			if (isPanning) {
				endPoint = { x: e.x, y: e.y };
				let dx = (startPoint.x - endPoint.x) / scale;
				let dy = (startPoint.y - endPoint.y) / scale;
				let movedViewBox = {
					x: viewBox.x + dx,
					y: viewBox.y + dy,
					w: viewBox.w,
					h: viewBox.h,
				};
				svgImage.setAttribute(
					"viewBox",
					`${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`
				);
				e.target.classList.add("cursor-grabbing");
				e.target.classList.remove("cursor-grab");
			}
		};

		svgContainer.onmouseup = function (e) {
			if (isPanning) {
				endPoint = { x: e.x, y: e.y };
				let dx = (startPoint.x - endPoint.x) / scale;
				let dy = (startPoint.y - endPoint.y) / scale;
				viewBox = {
					x: viewBox.x + dx,
					y: viewBox.y + dy,
					w: viewBox.w,
					h: viewBox.h,
				};
				svgImage.setAttribute(
					"viewBox",
					`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
				);
				isPanning = false;
				e.target.classList.add("cursor-grab");
				e.target.classList.remove("cursor-grabbing");
			}
		};

		svgContainer.onmouseleave = function (e) {
			isPanning = false;
			e.target.classList.add("cursor-grab");
			e.target.classList.remove("cursor-grabbing");
		};
	}, []);

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
			<SectionSetting resetSvgParams={resetSvgParams}>
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
