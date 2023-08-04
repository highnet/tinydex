export interface IComponentProps extends React.HTMLAttributes<HTMLElement> {
	disabled?: boolean;
	children?: React.ReactNode;
	id?: string;
	className?: string;
}
