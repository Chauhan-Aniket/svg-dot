import React from "react";
import Svg from "../svg/Svg";
import Circle from "../svg/Circle";
import Text from "../svg/Text";
import Line from "../svg/Line";

import { MakerSvg } from "../Params";

const SvgRadial = ({
	radius,
	radialCount,
	verticleCount,
	centerDistance,
	edgeDistance,
	offset,
	textOrigin,
	createTextOrigin,
	handleRemove,
	darkToggle,
	svgRef,
}) => {
	const circleRadius = 1 * radius;

	const radialCounts = [];
	for (let i = 1; i <= radialCount; i++) {
		const edgeDiameter = i * circleRadius * edgeDistance;

		const centerPadding = centerDistance * 2;
		radialCounts.push(edgeDiameter + centerPadding);
	}

	const radials = [];
	radialCounts.map((radialCount) => {
		return radials.push(
			new MakerSvg(circleRadius, radialCount, verticleCount, offset)
		);
	});

	const svgCircle = radials.map((radial) => {
		return radial.map(({ x, y }, index) => {
			return (
				<Circle
					key={index}
					cx={x}
					cy={y}
					r={circleRadius}
					event={createTextOrigin}
				/>
			);
		});
	});

	const svgText = textOrigin.map(({ tx, ty }, index) => {
		return (
			<Text
				key={index}
				x={tx}
				y={ty}
				r={circleRadius}
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

	// SVG width height boundary
	const svgRectBound = Math.max(...radialCounts) * 2 + circleRadius * 2;

	return (
		<div id="svgContainer" className="relative w-full h-full">
			<Svg
				id="svgImage"
				svgRef={svgRef}
				width={svgRectBound}
				height={svgRectBound}
				viewBox={`-${svgRectBound / 2} -${
					svgRectBound / 2
				} ${svgRectBound} ${svgRectBound}`}
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

export default SvgRadial;
