import React, {useState} from "react";
import {IButtonProps} from "./IButtonProps";
import {StringBuilder} from "../Gizmos/StringBuilder";
import Icon from "../Icon/Icon";
import Typography from "../Typography/Typography";

// Define a functional component called Button that takes in an object of props
const Button: React.FC<IButtonProps> = ({
	disabled,
	children,
	id,
	className,
	onClick,
	configuration,
	iconName,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
}) => {
	// Define state variables for each prop, with a default value if not provided
	const [_disabled] = useState(disabled || false);
	const [_id] = useState(id || undefined);
	const [_className] = useState(className || "");
	const [_config] = useState(configuration || "filled");
	const [_iconName] = useState(iconName || undefined);
	const [_children] = useState(children || "Label");

	// Build the class name for the button based on the state variables
	const _computedComponentClassName = new StringBuilder()
		.add("button")
		.add("button-" + _config)
		.add(_iconName ? "button-with-icon" : "")
		.add(_disabled ? "button-disabled" : "")
		.add("button-light-theme")
		.add(_className)
		.toString();

	// Return a button element with the appropriate props and children
	return (
		<button
			id={_id}
			className={_computedComponentClassName}
			disabled={_disabled}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}>
			{_iconName && <Icon>{_iconName}</Icon>}
			{_children && (
				<Typography variant="text-label-large">{_children}</Typography>
			)}
		</button>
	);
};

// Export the Button component as the default export of this module
export default Button;
