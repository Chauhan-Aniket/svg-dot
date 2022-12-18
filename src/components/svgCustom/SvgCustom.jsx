import React, { useEffect } from "react";
import Svg from "../svg/Svg";
import Circle from "../svg/Circle";
import Text from "../svg/Text";
import Line from "../svg/Line";

const SvgCustom = ({
	viewBox: vBox,
	originArr,
	textOrigin,
	createTextOrigin,
	handleRemove,
	circleRadius,
	darkToggle,
	svgRef,
}) => {
	const viewBoxWidth = vBox.width;
	const viewBoxHeight = vBox.height;
	const radius = circleRadius;

	useEffect(() => {
		const svgImage = document.getElementById("svgImage");
		const svgContainer = document.getElementById("svgContainer");
		var viewBox = {
			x: 0,
			y: 0,
			w: viewBoxWidth,
			h: viewBoxHeight,
		};
		svgImage.setAttribute(
			"viewBox",
			`${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
		);
		const svgSize = { w: svgImage.clientWidth, h: svgImage.clientHeight };
		var isPanning = false;
		var startPoint = { x: 0, y: 0 };
		var endPoint = { x: 0, y: 0 };
		var scale = 1;

		svgContainer.onmousewheel = function (e) {
			e.preventDefault();
			var w = viewBox.w;
			var h = viewBox.h;
			var mx = e.offsetX; //mouse x
			var my = e.offsetY;
			var dw = w * Math.sign(e.deltaY) * 0.05;
			var dh = h * Math.sign(e.deltaY) * 0.05;
			var dx = (dw * mx) / svgSize.w;
			var dy = (dh * my) / svgSize.h;
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
				var dx = (startPoint.x - endPoint.x) / scale;
				var dy = (startPoint.y - endPoint.y) / scale;
				var movedViewBox = {
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
				var dx = (startPoint.x - endPoint.x) / scale;
				var dy = (startPoint.y - endPoint.y) / scale;
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
	}, [viewBoxWidth, viewBoxHeight]);

	const svgCircle = originArr.map((origin, index) => (
		<Circle
			key={index}
			cx={origin.x}
			cy={origin.y}
			r={radius}
			event={createTextOrigin}
		/>
	));

	const svgText = textOrigin.map(({ tx, ty }, index) => {
		return (
			<Text
				key={index}
				x={tx}
				y={ty}
				r={radius}
				children={index + 1}
				handleRemove={handleRemove}
			/>
		);
	});

	const svgLine = textOrigin.map(({ tx, ty }, index) => {
		return (
			index > 0 && (
				<Line
					key={index}
					x1={textOrigin[index - 1].tx}
					y1={textOrigin[index - 1].ty}
					x2={tx}
					y2={ty}
				/>
			)
		);
	});

	return (
		<div id="svgContainer" className="relative w-full h-full">
			<Svg
				svgRef={svgRef}
				id="svgImage"
				viewBox={`0 0 ${viewBoxWidth === undefined ? 0 : viewBoxWidth} ${
					viewBoxHeight === undefined ? 0 : viewBoxHeight
				}`}
				darkToggle={darkToggle}
				className="absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] w-full h-full cursor-grab"
			>
				<g stroke={darkToggle ? "#fafafa" : "#18181b"} strokeWidth={2}>
					{svgLine}
				</g>
				<g fill="#2563EB" stroke={darkToggle ? "#fafafa" : "#18181b"}>
					{svgCircle}
					{svgText}
				</g>
			</Svg>
		</div>
	);
};

export default SvgCustom;
