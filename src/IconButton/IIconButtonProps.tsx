/*
The component can receive several props: configuration: A string prop that
represents the configuration of the icon. toggleAble: A boolean prop
indicating if the button can be toggled on and off. selected: A boolean
prop to indicate whether the button is currently selected or not.
onValueChange: A callback function that gets called when the button's value
changes, receiving a boolean value as an argument.
*/

import {IComponentProps} from "../Component/IComponentProps";

export interface IIconButtonProps extends IComponentProps {
	configuration?: string;
	toggleAble?: boolean;
	selected?: boolean;
	onValueChange?: (value: boolean) => void;
}
