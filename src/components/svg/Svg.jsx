const Svg = ({
	id,
	className,
	width,
	height,
	viewBox,
	children,
	darkToggle,
	svgRef,
}) => (
	<svg
		id={id}
		ref={svgRef}
		className={className}
		version="1.1"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
		xmlSpace="preserve"
		width={width}
		height={height}
		viewBox={viewBox}
		style={{ background: darkToggle ? "#161619" : "#fafafa" }}
	>
		{children}
	</svg>
);

export default Svg;
