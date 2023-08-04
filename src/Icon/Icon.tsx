/*
This code defines a React functional component named Icon. The component
is used to render icons on a webpage. The Icon component accepts a set
of props that include: children: A prop that represents the name or
content of the icon. The default value is "search" if not provided. id: A
string prop that provides a unique identifier for the icon. className: A
string prop that allows adding custom CSS classes to the icon. onClick,
onMouseEnter, onMouseLeave, onMouseMove: Props for event handlers related
to mouse interactions with the icon. filled: A boolean prop that determines
whether the icon should be rendered as filled or outlined. The default value
is false. The component uses React's useState hook to manage the internal
state for the provided props. The '_theme' variable is determined based on
the localStorage "theme" value or a default value if not present. The
'_computedComponentClassName' variable is constructed using the StringBuilder
utility, combining multiple class names to style the icon based on the
selected theme and any custom classes passed as props.The 
'_computedComponentIconClassName' variable is constructed to style the actual
icon element, including whether it should be filled or outlined based on the
'filled' prop.
*/

import React, {useState} from "react";
import {StringBuilder} from "../Gizmos/StringBuilder";
import {IIconProps} from "./IIconProps";

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
	const [_id] = useState(id || undefined);
	const [_className] = useState(className || "");
	const [_filled] = useState(filled || false);

	const _computedComponentClassName = new StringBuilder()
		.add("icon")
		.add("icon-light-theme")
		.add(_className)
		.toString();

	const _computedComponentIconClassName = new StringBuilder()
		.add("material-symbols")
		.add("material-symbols-outlined")
		.add(_filled ? "material-symbols-filled" : "")
		.toString();

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

export default Icon;
