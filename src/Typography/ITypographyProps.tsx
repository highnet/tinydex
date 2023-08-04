/*
The Typography component represents a user interface element used for displaying
text with various styles and formats. The interface defines an optional property
for the Typography component: "variant": A string property representing the
typography variant or style to be applied to the text, such as
"text-title-large", "text-label-small", etc.
*/

import {IComponentProps} from "../Component/IComponentProps";

export interface ITypographyProps extends IComponentProps {
	variant?: string;
}
