/*
React component for a customizable Component wrapper.
Props: className: Additional CSS class to customize the component's appearance.
id: Unique identifier for the component.
children: React nodes representing the content within the component.
onMouseEnter: Function to handle the mouse enter event on the component.
onMouseLeave: Function to handle the mouse leave event on the component.
onMouseMove: Function to handle the mouse move event on the component.
onClick: Function to handle the click event on the component.
This Component is a wrapper that allows for flexible customization.
It accepts various props to customize its behavior and appearance.
The 'className' prop is used to apply additional CSS classes for styling.
The 'id' prop can be provided to give the component a unique identifier.
The 'children' prop accepts content to be rendered inside the component.
The 'onMouseEnter', 'onMouseLeave', 'onMouseMove', and 'onClick' props allow
event handling functions to be attached to the corresponding events on the component.
The component also dynamically computes its className based on the given props
and the current theme obtained from local storage or the preferred scheme from "Gizmos/Themeing".
*/

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
