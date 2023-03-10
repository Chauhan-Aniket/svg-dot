import Svg from "../svg/Svg";
import Circle from "../svg/Circle";
import Text from "../svg/Text";
import Line from "../svg/Line";

const SvgMatrix = ({
	radius,
	rows: matrixRows,
	columns: matrixColumns,
	rowGap,
	columnGap,
	origin,
	createOrigin,
	handleRemove,
	darkToggle,
	svgRef,
}) => {
	const grid = [];
	const diameter = radius * 2;

	for (let columns = 0; columns < matrixRows; columns += 1) {
		for (let rows = 0; rows < matrixColumns; rows += 1) {
			grid.push({
				x: rows * diameter * columnGap,
				y: columns * diameter * rowGap,
			});
		}
	}

	const svgWidth = matrixColumns * diameter * columnGap;
	const svgHeight = matrixRows * diameter * rowGap;

	const svgCircle = grid.map(({ x, y }, index) => (
		<Circle key={index} cx={x} cy={y} r={radius} event={createOrigin} />
	));

	const svgText = origin.map(({ x, y }, index) => {
		return (
			<Text
				key={index}
				x={x}
				y={y}
				r={radius}
				children={index + 1}
				handleRemove={handleRemove}
			/>
		);
	});

	const svgLine = origin.map(({ x, y }, index) => {
		return (
			index > 0 && (
				<Line
					key={index}
					x1={origin[index - 1].x}
					y1={origin[index - 1].y}
					x2={x}
					y2={y}
				/>
			)
		);
	});

	return (
		<div id="svgContainer" className="relative w-full h-full">
			<Svg
				id="svgImage"
				svgRef={svgRef}
				width={svgWidth}
				height={svgHeight}
				viewBox={`-${radius * columnGap} -${
					radius * rowGap
				} ${svgWidth} ${svgHeight}`}
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

export default SvgMatrix;
