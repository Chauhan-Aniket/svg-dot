import MakerJs from "makerjs";

export function MakerSvg(
	hole_radius,
	bolt_circle_radius,
	bolt_count,
	offset_angle
) {
	const boltCircle = new MakerJs.models.BoltCircle(
		bolt_circle_radius,
		hole_radius,
		bolt_count,
		offset_angle
	);

	const origin = [];
	for (const key in boltCircle.paths) {
		origin.push({
			id: key,
			x: boltCircle.paths[key].origin[0],
			y: boltCircle.paths[key].origin[1],
		});
	}

	return origin;
}

export const radialParams = {
	radius: 10,
	radialCount: 6,
	verticleCount: 8,
	centerDistance: 10,
	edgeDistance: 3,
	offset: 0,
};

export const matrixParams = {
	radius: 10,
	rows: 10,
	columns: 10,
	rowGap: 2,
	columnGap: 2,
};
