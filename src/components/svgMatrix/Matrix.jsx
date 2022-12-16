import React, { useState } from "react";
import SvgMatrix from "./SvgMatrix";
import MatrixSettings from "./MatrixSettings";

import { matrixParams } from "../Params";
import { SectionSvg, SectionSetting } from "../Style";

const Matrix = ({ svgRef, darkToggle }) => {
	const [radius, setRadius] = useState(matrixParams.radius);
	const [rows, setRows] = useState(matrixParams.rows);
	const [columns, setColumns] = useState(matrixParams.columns);
	const [rowGap, setRowGap] = useState(matrixParams.rowGap);
	const [columnGap, setColumnGap] = useState(matrixParams.columnGap);

	const radiusValue = (e) => {
		setRadius(e.target.value);
	};
	const rowValue = (e) => {
		setRows(e.target.value);
	};
	const columnValue = (e) => {
		setColumns(e.target.value);
	};
	const rowGapValue = (e) => {
		setRowGap(e.target.value);
	};
	const columnGapValue = (e) => {
		setColumnGap(e.target.value);
	};

	// TODO: get circle position to create dynamic text & line
	const [origin, setOrigin] = useState([]);

	const createOrigin = (e) => {
		e.target.style.pointerEvents = "none";
		setOrigin([
			...origin,
			{
				tx: e.target.cx.baseVal.value,
				ty: e.target.cy.baseVal.value,
			},
		]);
	};

	// TODO: remove text element
	const handleRemove = (e) => {
		const newItems = origin.slice(0, Number(e.target.textContent));
		setOrigin(newItems);

		const newTextOrigin = [...origin];
		removeTexts(newTextOrigin, Number(e.target.textContent));
		e.shiftKey && setOrigin(newTextOrigin);

		// TODO: apply pointer events to all circle
		for (let i = 0; i < e.target.parentElement.children.length; i++) {
			const { pointerEvents } = getComputedStyle(
				e.target.parentElement.children[i]
			);
			(e.shiftKey && e.ctrlKey) ||
				(pointerEvents === "none" &&
					(e.target.parentElement.children[i].style.pointerEvents = "all"));
		}
	};

	// TODO: remove element from selected element index
	function removeTexts(arr, element) {
		const startIndex = arr.indexOf(element);
		const numElements = arr.length - startIndex;
		arr.splice(startIndex, numElements);
	}

	return (
		<>
			<SectionSvg svgRef={svgRef}>
				<SvgMatrix
					radius={radius}
					rows={rows}
					columns={columns}
					rowGap={rowGap}
					columnGap={columnGap}
					origin={origin}
					createOrigin={createOrigin}
					handleRemove={handleRemove}
					darkToggle={darkToggle}
				/>
			</SectionSvg>
			<SectionSetting>
				<MatrixSettings
					radius={radius}
					radiusValue={radiusValue}
					rows={rows}
					rowValue={rowValue}
					columns={columns}
					columnValue={columnValue}
					rowGap={rowGap}
					rowGapValue={rowGapValue}
					columnGap={columnGap}
					columnGapValue={columnGapValue}
				/>
			</SectionSetting>
		</>
	);
};

export default Matrix;
