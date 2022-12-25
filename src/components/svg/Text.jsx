const Text = ({ x, y, r, children, handleRemove }) => {
	return (
		<text
			x={x}
			y={y}
			fill="#fafafa"
			stroke="none"
			fontSize={`${r / 10}rem`}
			textAnchor="middle"
			alignmentBaseline="central"
			onClick={handleRemove}
			className="select-none"
			style={{ cursor: "default" }}
		>
			&nbsp;&nbsp;{children}&nbsp;&nbsp;
		</text>
	);
};

export default Text;
