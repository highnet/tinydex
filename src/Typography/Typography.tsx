import React, { useState } from "react";
import { ITypographyProps } from "./ITypographyProps";
import { StringBuilder } from "../Gizmos/StringBuilder";

// This function splits the variant string into an array of strings
// that represent each part of the variant
function splitVariants(props: string): string[] {
	const parts = props.split("-");
	const output: string[] = [];
	for (let i = 0; i < parts.length; i++) {
		if (i === 0) {
			output.push(parts[i]);
		} else {
			output.push(output[i - 1] + "-" + parts[i]);
		}
	}
	return output;
}

// This is the main Typography component
const Typography: React.FC<ITypographyProps> = ({
	id,
	className,
	variant,
	children,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
}) => {
	// Use state hooks to set default values for id, className, and variant
	const [_id] = useState(id || undefined);
	const [_className] = useState(className || "");
	const [_variant] = useState(variant || "text-body-small");

	// Split the variant string into an array of strings
	const _computedSplitVariants = splitVariants(_variant);

	// Build the class name for the component using StringBuilder
	const _computedComponentClassName = new StringBuilder()
		.add(_computedSplitVariants[0])
		.add(_computedSplitVariants[1])
		.add(_computedSplitVariants[2])
		.add("typography")
		.add("typography-light-theme")
		.add(_className)
		.toString();

	// Render the component with the computed class name and other props
	return (
		<div
			id={_id}
			className={_computedComponentClassName}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
		>
			{children}
		</div>
	);
};

export default Typography;
