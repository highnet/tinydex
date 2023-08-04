/*
This is a React functional component representing a customizable Button element.
It receives props such as 'disabled', 'children', 'id', 'className', 'onClick',
'configuration', 'iconName', 'onMouseEnter', 'onMouseLeave', and 'onMouseMove'.
It uses the 'useState' hook from React to set internal state variables for
'disabled', 'id', 'className', 'configuration', 'iconName', and 'children'.
The button's appearance and behavior are determined based on these props
and internal states. It also utilizes the 'StringBuilder' class from 
"../Gizmos/StringBuilder" to construct a CSS class string for the button element.
The button's theme is derived from the 'localStorage' or a default theme based
on the user's preference and is used to determine the button's appearance. The
final button element is created with the calculated class name and
includes optional rendering of an 'Icon' component and 'Typography' component
for icon and text content, respectively.
*/

import React, {useState} from "react";
import {IButtonProps} from "./IButtonProps";
import {StringBuilder} from "../Gizmos/StringBuilder";
import Icon from "../Icon/Icon";
import Typography from "../Typography/Typography";

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
	const [_disabled] = useState(disabled || false);
	const [_id] = useState(id || undefined);
	const [_className] = useState(className || "");
	const [_config] = useState(configuration || "filled");
	const [_iconName] = useState(iconName || undefined);
	const [_children] = useState(children || "Label");

	const _computedComponentClassName = new StringBuilder()
		.add("button")
		.add("button-" + _config)
		.add(_iconName ? "button-with-icon" : "")
		.add(_disabled ? "button-disabled" : "")
		.add("button-light-theme")
		.add(_className)
		.toString();

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

export default Button;
