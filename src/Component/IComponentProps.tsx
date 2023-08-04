/* 
This code defines an interface named IComponentProps, which extends the
React.HTMLAttributes<HTMLElement> interface. The interface serves as a
blueprint for defining the props that can be used by various React
components. The IComponentProps interface includes the following optional
props: disabled: A boolean prop that determines whether the component
should be in a disabled state or not. children: A prop that allows
developers to pass child components or content to the component. id: A
string prop that provides a unique identifier for the component. className:
A string prop that allows adding custom CSS classes to the component.
These props are intended to be used as a general set of props that can
be applied to multiple React components, providing consistent behavior
and appearance across the application. By extending the
React.HTMLAttributes<HTMLElement> interface, it allows the IComponentProps
interface to include standard HTML attributes like 'id' and 'className'
that can be applied to any HTML element. By making these props optional,
it provides flexibility in using the IComponentProps interface with
different components and allows developers to customize the behavior
and appearance of components based on specific use cases and design
requirements.
*/

export interface IComponentProps extends React.HTMLAttributes<HTMLElement> {
	disabled?: boolean;
	children?: React.ReactNode;
	id?: string;
	className?: string;
}
