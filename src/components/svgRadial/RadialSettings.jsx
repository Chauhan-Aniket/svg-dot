import Input from "../svgInput/Input";

const RadialSettings = (props) => (
	<>
		<Input
			min={1}
			max={50}
			id="radialCount"
			label="Radial Count"
			value={props.radialCount}
			event={props.radialCountValue}
		/>
		<Input
			min={1}
			max={50}
			id="verticleCount"
			label="Verticle Count"
			value={props.verticleCount}
			event={props.verticleCountValue}
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
			id="centerDistance"
			label="Center Distance"
			value={props.centerDistance}
			event={props.centerDistanceValue}
		/>
		<Input
			min={2}
			max={50}
			id="edgeDistance"
			label="Edge Distance"
			value={props.edgeDistance}
			event={props.edgeDistanceValue}
		/>
		<Input
			min={0}
			max={360}
			id="offset"
			label="Offset"
			value={props.offset}
			event={props.offsetValue}
		/>
		{/* <input
			type="number"
			name="num"
			id="num"
			value={props.number}
			onChange={props.numberValue}
		/> */}
	</>
);

export default RadialSettings;
