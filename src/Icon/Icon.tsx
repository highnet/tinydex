import React, {useState} from "react";
import {StringBuilder} from "../Gizmos/StringBuilder";
import {IIconProps} from "./IIconProps";

// Define the Icon component
const Icon: React.FC<IIconProps> = ({
	children = "search",
	id,
	className,
	onClick,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
	filled,
}) => {
	// Define state variables for ID, class name, and filled props
	const [_id] = useState(id || undefined);
	const [_className] = useState(className || "");
	const [_filled] = useState(filled || false);

	// Compute the class name for the component
	const _computedComponentClassName = new StringBuilder()
		.add("icon")
		.add("icon-light-theme")
		.add(_className)
		.toString();

	// Compute the class name for the icon
	const _computedComponentIconClassName = new StringBuilder()
		.add("material-symbols")
		.add("material-symbols-outlined")
		.add(_filled ? "material-symbols-filled" : "")
		.toString();

	// Render the component
	return (
		<div
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			onClick={onClick}
			className={_computedComponentClassName}>
			<span id={_id} className={_computedComponentIconClassName}>
				{children}
			</span>
		</div>
	);
};

// Export the Icon component as the default export
export default Icon;
