const Circle = ({ cx, cy, r, event }) => (
	<circle cx={cx} cy={cy} r={r} onMouseEnter={event} />
);

export default Circle;
