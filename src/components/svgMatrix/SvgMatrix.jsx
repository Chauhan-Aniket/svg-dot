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

	const svgText = origin.map(({ tx, ty }, index) => {
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

	const svgLine = origin.map(({ tx, ty }, index) => {
		return (
			index > 0 && (
				<Line
					key={index}
					x1={origin[index - 1].tx}
					y1={origin[index - 1].ty}
					x2={tx}
					y2={ty}
				/>
			)
		);
	});

	return (
		<Svg
			width={svgWidth}
			height={svgHeight}
			viewBox={`-${radius * columnGap} -${
				radius * rowGap
			} ${svgWidth} ${svgHeight}`}
			darkToggle={darkToggle}
		>
			<g stroke={darkToggle ? "#fafafa" : "#18181b"} strokeWidth={2}>
				{svgLine}
			</g>
			<g fill="#2563EB" stroke={darkToggle ? "#fafafa" : "#18181b"}>
				{svgCircle}
				{svgText}
			</g>
		</Svg>
	);
};

export default SvgMatrix;
