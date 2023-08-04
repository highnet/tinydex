/*
The TextField component represents a user interface element used for inputting 
text or data, allowing users to enter and edit text. The interface defines
optional properties for the TextField, including: "configuration": A string
property used for styling or customization purposes. "textConfiguration": A
string property for additional text-related configurations. "leadingIconName":
A string property representing the name of an icon to be displayed at the
beginning (leading) of the text field. "trailingIcon": A boolean property
indicating whether the TextField has a trailing icon. "label": A string property
representing the label or placeholder for the TextField. "placeholder": A string
property representing the temporary text that appears in the TextField when it is
empty, providing a hint to users about the expected input. "input": A string
property representing the input value of the TextField. "validRegex": A string
property representing a regular expression pattern that can be used to validate
the input value of the TextField.
*/

import {IComponentProps} from "../Component/IComponentProps";

export interface ITextFieldProps extends IComponentProps {
	configuration?: string;
	textConfiguration?: string;
	leadingIconName?: string;
	trailingIcon?: boolean;
	label?: string;
	placeholder?: string;
	input?: string;
	validRegex?: string;
}
