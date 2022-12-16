const InputRange = ({ id, label, value, min, max, event }) => (
	<div>
		<label
			htmlFor={id}
			className="block mb-1 text-sm font-medium tracking-[0.6px]"
		>
			{label}
		</label>
		<input
			min={min}
			max={max}
			type="range"
			value={value}
			id={`${id}-range`}
			name={`${id}Range`}
			onChange={event}
			className="slider-thumb"
		/>
	</div>
);

export default InputRange;
