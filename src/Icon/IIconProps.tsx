/*
This code defines an interface called IIconProps, extending IComponentProps.
It includes an optional boolean property 'filled' to determine if the icon
should be filled.
*/

import {IComponentProps} from "../Component/IComponentProps";

export interface IIconProps extends IComponentProps {
	filled?: boolean;
}
