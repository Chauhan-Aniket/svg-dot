const InputNumber = ({ id, value, event }) => (
	<input
		type="number"
		value={value}
		id={`${id}-num`}
		name={`${id}Num`}
		onChange={event}
		className="w-full mb-[-5px] py-1 text-center text-sm font-medium bg-transparent border border-zinc-200 dark:border-zinc-800 rounded appearance-none outline-none tracking-[0.75px]"
	/>
);

export default InputNumber;
