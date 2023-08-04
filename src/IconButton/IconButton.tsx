import React, { useState } from "react";
import { StringBuilder } from "../Gizmos/StringBuilder";
import { IIconButtonProps } from "./IIconButtonProps";
import Icon from "../Icon/Icon";

// Define the IconButton component
const IconButton: React.FC<IIconButtonProps> = ({
	className,
	id,
	children,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
	onClick,
	configuration,
	disabled,
	toggleAble,
	selected,
	onValueChange,
}) => {
	// Define state variables for class name, ID, configuration, toggle able, and selected props
	const [_className] = useState(className || "");
	const [_id] = useState(id || undefined);
	const [_configuration] = useState(configuration || "standard");
	const [_toggleAble] = useState(toggleAble || false);
	const [_selected, setSelected] = useState(selected || false);

	// Compute the class name for the component
	const _computedComponentClassName = new StringBuilder()
		.add("icon-button")
		.add("icon-button-light-theme")
		.add("icon-button-" + _configuration)
		.add(_toggleAble && _selected ? "icon-button-selected" : "")
		.add(_toggleAble && !_selected ? "icon-button-deselected" : "")
		.add(disabled ? "icon-button-disabled" : "")
		.add(_className)
		.toString();

	// Define the click event handler
	const handleClick = () => {
		if (_toggleAble) {
			setSelected(!_selected);
			if (onValueChange) {
				onValueChange(_selected);
			}
		}
	};

	// Render the component
	return (
		<div
			id={_id}
			tabIndex={0}
			className={_computedComponentClassName}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
			onMouseMove={onMouseMove}
			onClick={(e) => {
				onClick?.(e);
				handleClick();
			}}
		>
			{!_selected && <Icon>{children}</Icon>}
			{_selected && <Icon filled={true}>{children}</Icon>}
		</div>
	);
};

// Export the IconButton component as the default export
export default IconButton;
