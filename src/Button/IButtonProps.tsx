/* 
This code defines an interface named IButtonProps, which extends the
IComponentProps interface. The interface serves as a blueprint for defining
the props that can be passed to a Button component. The IButtonProps
interface includes the following optional props: configuration: A string
prop that represents the configuration of the button, which may define its
appearance or behavior. iconName: A string prop that specifies the
name of the icon to be displayed on the button. These props are intended to
be used to customize the appearance and behavior of the Button component.
The 'configuration' prop may define different styles or variations for the
button, while the 'iconName' prop allows adding an icon to the button if
needed.
*/

import {IComponentProps} from "../Component/IComponentProps";

export interface IButtonProps extends IComponentProps {
	configuration?: string;
	iconName?: string;
}
