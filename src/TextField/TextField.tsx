// Import necessary dependencies
import React, {useRef, useState} from "react";
import {StringBuilder} from "../Gizmos/StringBuilder";
import {ITextFieldProps} from "./ITextFieldProps";
import Typography from "../Typography/Typography";
import Icon from "../Icon/Icon";
import IconButton from "../IconButton/IconButton";

// Define the TextField component
const TextField: React.FC<ITextFieldProps> = ({
	disabled,
	className,
	children,
	onMouseEnter,
	onMouseLeave,
	onMouseMove,
	onClick,
	configuration = "filled",
	textConfiguration = "label-input",
	leadingIconName,
	trailingIcon = true,
	label = "Label",
	placeholder = textConfiguration === "label-placeholder" ? "Placeholder" : "",
	input = textConfiguration !== "label-placeholder" ? "Input" : "",
	validRegex = "^*$",
	onChange,
}) => {
	// Create refs for the input and component
	const inputRef = useRef<HTMLInputElement>(null);
	const componentRef = useRef<HTMLDivElement>(null);

	// Define state variables
	const [_disabled] = useState(disabled || false);
	const [_className] = useState(className || "");
	const [_configuration] = useState(configuration);
	const [_textConfiguration] = useState(textConfiguration);
	const [_leadingIconName] = useState(leadingIconName || undefined);
	const [_trailingIcon] = useState(trailingIcon);
	const [_label] = useState(label);
	const [_placeholder] = useState(placeholder);
	const [_input] = useState(input);
	const [_defaultValueResetted, setDefaultValueReseted] = useState(false);
	const [_isFocused, setIsFocused] = useState(false);
	const [_isValidInput, setIsValidInput] = useState(true);
	const [_children] = useState(children || undefined);

	// Compute the component class name
	const _computedComponentClassName = new StringBuilder()
		.add("text-field")
		.add("text-field-light-theme")
		.add(_disabled ? "text-field-disabled" : "")
		.add("text-field-" + _configuration)
		.add("text-field-with-" + _textConfiguration)
		.add(_leadingIconName ? "text-field-with-leading-icon" : "")
		.add(_className)
		.toString();

	// Reset the text field value
	const handleResetTextFieldValue = () => {
		if (inputRef.current) {
			inputRef.current.value = "";
		}
	};

	// Handle focus on the text field
	const handleFocus = () => {
		if (!_defaultValueResetted) {
			handleResetTextFieldValue();
			setDefaultValueReseted(true);
		}
		setIsFocused(true);
		componentRef.current?.classList.add("text-field-active");
	};

	// Handle blur on the text field
	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(false);
		componentRef.current?.classList.remove("text-field-active");
		const isValidInput = validateInput(event.target.value, validRegex);
		setIsValidInput(isValidInput);
		componentRef.current?.classList.toggle("text-field-error", !isValidInput);
	};

	// Handle key down on the text field
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			inputRef.current?.blur();
		}
	};

	// Validate the input value
	const validateInput = (value: string, regex: string): boolean => {
		const pattern = new RegExp(regex);
		return pattern.test(value);
	};

	// Render the TextField component
	return (
		<div>
			<div
				ref={componentRef}
				className={_computedComponentClassName}
				onKeyDown={handleKeyDown}>
				{_configuration === "outlined" &&
					(_textConfiguration === "label-input" ||
						_textConfiguration === "label-placeholder") && (
						<Typography
							variant="text-body-small"
							className={"label-on-text-field label-on-text-field-outlined"}>
							{(_textConfiguration === "label-input" ||
								_textConfiguration === "label-placeholder") &&
								_label}
						</Typography>
					)}
				<div className="text-field-container">
					{_leadingIconName && (
						<div>
							<Icon className="icon-on-text-field">{_leadingIconName}</Icon>
						</div>
					)}
					<div className="text-field-content">
						{_configuration === "filled" &&
							(_textConfiguration === "label-input" ||
								_textConfiguration === "label-placeholder") && (
								<Typography
									variant="text-body-small"
									className={"label-on-text-field label-on-text-field-filled"}>
									{(_textConfiguration === "label-input" ||
										_textConfiguration === "label-placeholder") &&
										_label}
								</Typography>
							)}
						<input
							className="text-field-input"
							ref={inputRef}
							onMouseEnter={onMouseEnter}
							onMouseLeave={onMouseLeave}
							onMouseMove={onMouseMove}
							onClick={onClick}
							defaultValue={_input}
							placeholder={_placeholder}
							onFocus={handleFocus}
							onBlur={handleBlur}
							onChange={onChange}></input>
					</div>
					{_trailingIcon && (
						<IconButton
							onClick={handleResetTextFieldValue}
							className="trailing-icon-on-text-field">
							{!_isValidInput ? "error" : "cancel"}
						</IconButton>
					)}
				</div>
			</div>
			{_configuration == "filled" && (
				<div
					className={
						"text-field-active-indicator" +
						(_isFocused ? " text-field-active-indicator-active" : "") +
						" " +
						"text-field-active-indicator-light-theme" +
						(!_isValidInput ? " " + "text-field-active-indicator-error" : "")
					}></div>
			)}
			<Typography
				className={
					"text-field-supporting-text text-field-supporting-text-light-theme"
				}
				variant="text-body-small">
				{_children}
			</Typography>
		</div>
	);
};

// Export the TextField component
export default TextField;
