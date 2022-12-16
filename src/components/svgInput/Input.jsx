import InputRange from "./InputRange";
import InputNumber from "./InputNumber";

const Input = ({ id, label, value, min, max, event }) => (
	<div className="grid grid-cols-4 py-5 border-t border-t-zinc-200 dark:border-t-zinc-800">
		<div className="col-span-3">
			<InputRange
				id={id}
				label={label}
				value={value}
				min={min}
				max={max}
				event={event}
			/>
		</div>
		<div className="flex items-end ml-3">
			<InputNumber id={id} value={value} event={event} />
		</div>
	</div>
);

export default Input;
