import React, {useState} from "react";
import {ITypographyProps} from "./ITypographyProps";
import {StringBuilder} from "../Gizmos/StringBuilder";

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

const Typography: React.FC<ITypographyProps> = ({
	id,
	className,
	variant,
	children,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
}) => {
	const [_id] = useState(id || undefined);
	const [_className] = useState(className || "");
	const [_variant] = useState(variant || "text-body-small");
	const [_children] = useState(children || undefined);

	const _computedSplitVariants = splitVariants(_variant);

	const _computedComponentClassName = new StringBuilder()
		.add(_computedSplitVariants[0])
		.add(_computedSplitVariants[1])
		.add(_computedSplitVariants[2])
		.add("typography")
		.add("typography-light-theme")
		.add(_className)
		.toString();

	return (
		<div
			id={_id}
			className={_computedComponentClassName}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}>
			{_children}
		</div>
	);
};

export default Typography;
