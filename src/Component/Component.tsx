import React, {useState} from "react";
import {StringBuilder} from "../Gizmos/StringBuilder";
import {IComponentProps} from "./IComponentProps";

// Define a functional component called Component that takes in an object of props
const Component: React.FC<IComponentProps> = ({
	className,
	id,
	children,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
	onClick,
}) => {
	// Define state variables for each prop, with a default value if not provided
	const [_className] = useState(className || "");
	const [_id] = useState(id || undefined);

	// Build the class name for the component based on the state variables
	const _computedComponentClassName = new StringBuilder()
		.add("component")
		.add("component-light-theme")
		.add(_className)
		.toString();

	// Return a div element with the appropriate props and children
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

// Export the Component component as the default export of this module
export default Component;
