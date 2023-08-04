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
