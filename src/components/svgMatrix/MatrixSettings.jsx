import Input from "../svgInput/Input";

const RadialSettings = (props) => (
	<>
		<Input
			min={1}
			max={50}
			id="rows"
			label="Rows"
			value={props.rows}
			event={props.rowValue}
		/>
		<Input
			min={1}
			max={50}
			id="columns"
			label="Columns"
			value={props.columns}
			event={props.columnValue}
		/>
		<Input
			min={1}
			max={50}
			id="radius"
			label="Radius"
			value={props.radius}
			event={props.radiusValue}
		/>
		<Input
			min={1}
			max={50}
			id="rowGap"
			label="Row Gap"
			value={props.rowGap}
			event={props.rowGapValue}
		/>
		<Input
			min={1}
			max={50}
			id="columnGap"
			label="Column Gap"
			value={props.columnGap}
			event={props.columnGapValue}
		/>
	</>
);

export default RadialSettings;
