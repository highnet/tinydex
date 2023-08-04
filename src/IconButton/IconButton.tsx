/*
This code defines a React functional component named IconButton. The
component is used to render an interactive button with an icon on a
webpage. The IconButton component accepts a set of props that include:
className: A string prop that allows adding custom CSS classes to the
IconButton. id: A string prop that provides a unique identifier for the
IconButton. children: A prop that represents the name or content of the
icon to be displayed on the IconButton. onMouseEnter, onMouseLeave,
onMouseMove: Props for event handlers related to mouse interactions with
the IconButton. onClick: A prop for the click event handler. configuration:
A string prop that represents the configuration of the IconButton, which may
define its appearance or behavior. The default value is "standard" if not
provided. disabled: A boolean prop that determines whether the IconButton
is in a disabled state or not. toggleAble: A boolean prop that determines
whether the IconButton can be toggled on/off, similar to a checkbox.
selected: A boolean prop that indicates whether the IconButton is selected
(used for toggleAble buttons). onValueChange: A prop for the callback
function to handle value changes (used for toggleAble buttons).
The component uses React's useState hook to manage the internal state
for the provided props, including the selected state for toggleAble buttons.
The '_theme' variable is determined based on the localStorage "theme"
value or a default value if not present. The '_computedComponentClassName'
variable is constructed using the StringBuilder utility, combining multiple
class names to style the IconButton based on the selected theme,
configuration, and its state (selected, deselected, disabled, etc.).
The handleClick function is used to handle click events on the IconButton,
updating the selected state for toggleAble buttons and triggering the
onValueChange callback if provided.
*/

import React, {useState} from "react";
import {StringBuilder} from "../Gizmos/StringBuilder";
import {IIconButtonProps} from "./IIconButtonProps";
import Icon from "../Icon/Icon";

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
	const [_className] = useState(className || "");
	const [_id] = useState(id || undefined);
	const [_configuration] = useState(configuration || "standard");
	const [_toggleAble] = useState(toggleAble || false);
	const [_selected, setSelected] = useState(selected || false);

	const _computedComponentClassName = new StringBuilder()
		.add("icon-button")
		.add("icon-button-light-theme")
		.add("icon-button-" + _configuration)
		.add(_toggleAble && _selected ? "icon-button-selected" : "")
		.add(_toggleAble && !_selected ? "icon-button-deselected" : "")
		.add(disabled ? "icon-button-disabled" : "")
		.add(_className)
		.toString();

	const handleClick = () => {
		if (_toggleAble) {
			setSelected(!_selected);
			if (onValueChange) {
				onValueChange(_selected);
			}
		}
	};

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
			}}>
			{!_selected && <Icon>{children}</Icon>}
			{_selected && <Icon filled={true}>{children}</Icon>}
		</div>
	);
};

export default IconButton;
