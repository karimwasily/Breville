import React from "react";
// import { Link } from "react-router-dom";
// import { bool, string, node, oneOfType } from 'prop-types';
import classnames from "classnames";
import { addPropertyControls, ControlType } from "framer";
import { SvgIcon } from "../icons";

/**
 * Button Component
 * @param {{
 * className?: string,
 * children?: string,
 * label?: string,
 * type?: string,
 * size?: string,
 * colorScheme?: string,
 * icon?: string,
 * disabled?: boolean,
 * href: [boolean|string],
 * onClick?: function,
 * isActive?: boolean
 * }}  args
 * @returns
 */

export const Button = ({ className, children, label, type, size, colorScheme, icon, disabled, href, textType, isActive, ...rest }) => {
	const classNames = classnames(className, `react-button react-button--size-${size}`, `react-button react-button--textType-${textType}`, `react-button--type-${type}`, {
		[`react-button--color-scheme-${colorScheme}`]: !disabled,
		[`react-button__icon--${icon}`]: icon,
		"react-button--active": isActive,
	});

	function getButton() {
		return (
			<button className={classNames} disabled={disabled} type={type} {...rest}>
				{label || children}
				<SvgIcon iconName="arrowRightWeb" size="12px" theme="oneFillBlack" colorOneOverride={iconColor} />
			</button>
		);
	}

	function getLink() {
		const isExternal = href.includes("https");
		return isExternal ? (
			<a className={classNames} href={href} {...rest}>
				{children}
			</a>
		) : (
			// <Link className={classNames} to={href} {...rest}>
			{ children }
			// </Link>
		);
	}

	return href ? getLink() : getButton();
};

// Button.propTypes = {
//   className: string,
//   children: node.isRequired,
//   type: string, // "button" (default) or "link"
//   size: string, // large, medium (default), small
//   textType: string, // text bold, normal
//   icon: string,
//   href: oneOfType([bool, string]),
//   disabled: bool, // refer to _cs-svgs.scss, default is none/empty
//   colorScheme: string, // black (default), purple, inverted
//   isActive: bool
// }

export default Button;

Button.defaultProps = {
	className: "",
	//   children: [],
	label: "label",
	type: "button",
	size: "medium",
	textType: "normal",
	icon: "",
	href: false,
	disabled: false,
	colorScheme: "green",
	isActive: true,

	// reactButton: "reactButton",
	// textType: "bold",
	// iconColor: "white",
	// showIcon: false,
};

addPropertyControls(Button, {
	// className,
	// children,
	label: {
		type: ControlType.String,
		title: "Label",
		defaultValue: "Button",
	},
	type: {
		type: ControlType.Enum,
		title: "type",
		defaultValue: "link-normal",
		options: ["link", "link-normal", "disabled"],
		optionTitles: ["link", "link-normal", "disabled"],
	},
	size: {
		type: ControlType.Enum,
		title: "size",
		defaultValue: "medium",
		options: ["small", "medium", "large"],
		optionTitles: ["small", "medium", "large"],
	},
	textType: {
		type: ControlType.Enum,
		title: "textType",
		defaultValue: "normal",
		options: ["normal", "bold"],
		optionTitles: ["normal", "bold"],
	},
	showIcon: {
		type: ControlType.Boolean,
		title: "showIcon",
		defaultValue: true,
	},
	icon: {
		type: ControlType.Enum,
		title: "icon",
		defaultValue: "",
		options: ["compare", "arrow-right"],
		optionTitles: ["compare", "arrow-right"],
		hidden(props) {
			return props.showIcon === false;
		},
	},
	// href: {
	// 	type: ControlType.Boolean, // or string?
	// 	title: "disabled",
	// 	defaultValue: true,
	// },
	disabled: {
		type: ControlType.Boolean,
		title: "disabled",
		defaultValue: false,
	},
	colorScheme: {
		type: ControlType.Enum,
		title: "colorScheme",
		defaultValue: "purple",
		options: ["green", "purple", "black", "purpleFill", "none"],
		optionTitles: ["green", "purple", "black", "purpleFill", "none"],
	},
	isActive: {
		type: ControlType.Boolean,
		title: "isActive",
		defaultValue: true,
	},
	iconColor: {
		type: ControlType.Color,
		title: "iconColor",
		defaultValue: "transparent",
		hidden(props) {
			return props.showIcon === false;
		},
	},
});
