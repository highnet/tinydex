import React, {useState} from "react";
import {StringBuilder} from "../Gizmos/StringBuilder";
import {IComponentProps} from "./IComponentProps";

const Component: React.FC<IComponentProps> = ({
	className,
	id,
	children,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
	onClick,
}) => {
	const [_className] = useState(className || "");
	const [_id] = useState(id || undefined);

	const _computedComponentClassName = new StringBuilder()
		.add("component")
		.add("component-light-theme")
		.add(_className)
		.toString();

	return (
		<div
			id={_id}
			className={_computedComponentClassName}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			onClick={onClick}>
			{children}
		</div>
	);
};

export default Component;
