import React, { useState, useEffect } from "react";
import SvgMatrix from "./SvgMatrix";
import MatrixSettings from "./MatrixSettings";

import { matrixParams } from "../Params";
import { SectionSvg, SectionSetting } from "../Style";

const Matrix = ({ svgRef, darkToggle, resetFunc }) => {
	const [radius, setRadius] = useState(matrixParams.radius);
	const [rows, setRows] = useState(matrixParams.rows);
	const [columns, setColumns] = useState(matrixParams.columns);
	const [rowGap, setRowGap] = useState(matrixParams.rowGap);
	const [columnGap, setColumnGap] = useState(matrixParams.columnGap);

	const radiusValue = (e) => {
		setRadius(e.target.value);
	};
	const rowValue = (e) => {
		setRows(e.target.value);
	};
	const columnValue = (e) => {
		setColumns(e.target.value);
	};
	const rowGapValue = (e) => {
		setRowGap(e.target.value);
	};
	const columnGapValue = (e) => {
		setColumnGap(e.target.value);
	};

	// TODO: reset params
	const resetSvgParams = () => {
		setRadius(matrixParams.radius);
		setRows(matrixParams.rows);
		setColumns(matrixParams.columns);
		setRowGap(matrixParams.rowGap);
		setColumnGap(matrixParams.columnGap);
	};

	// TODO: get circle position to create dynamic text & line
	const [origin, setOrigin] = useState([]);

	const createOrigin = (e) => {
		e.target.style.pointerEvents = "none";
		setOrigin([
			...origin,
			{
				tx: e.target.cx.baseVal.value,
				ty: e.target.cy.baseVal.value,
			},
		]);
	};

	// TODO: remove text element
	const handleRemove = (e) => {
		const newItems = origin.slice(0, Number(e.target.textContent));
		setOrigin(newItems);

		const newTextOrigin = [...origin];
		removeTexts(newTextOrigin, Number(e.target.textContent));
		e.shiftKey && setOrigin(newTextOrigin);

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

	// TODO: reset text and line
	useEffect(() => {
		const resetSvg = () => {
			setOrigin([]);

			const circles = svgRef.current.querySelectorAll("circle");
			circles &&
				circles.forEach((circle) => (circle.style.pointerEvents = "all"));
		};
		resetFunc.current = resetSvg;
	}, [resetFunc, svgRef]);

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
			x: -radius * 2,
			y: -radius * 2,
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
	}, [radius]);

	return (
		<>
			<SectionSvg>
				<SvgMatrix
					svgRef={svgRef}
					radius={radius}
					rows={rows}
					columns={columns}
					rowGap={rowGap}
					columnGap={columnGap}
					origin={origin}
					createOrigin={createOrigin}
					handleRemove={handleRemove}
					darkToggle={darkToggle}
				/>
			</SectionSvg>
			<SectionSetting resetSvgParams={resetSvgParams}>
				<MatrixSettings
					radius={radius}
					radiusValue={radiusValue}
					rows={rows}
					rowValue={rowValue}
					columns={columns}
					columnValue={columnValue}
					rowGap={rowGap}
					rowGapValue={rowGapValue}
					columnGap={columnGap}
					columnGapValue={columnGapValue}
				/>
			</SectionSetting>
		</>
	);
};

export default Matrix;
