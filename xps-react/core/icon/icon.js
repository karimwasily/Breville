import React from "react";
import { icons, themes, copyTheme } from "./icon-map";

export default function SvgIcon(props) {
	const theme = copyTheme(themes[props.theme || 'primary']);
	if (props.size !== "") {
		theme.size = props.size;
	}

	if (props.colorOneOverride !== "") {
		theme.primary = props.colorOneOverride;
	}
	if (props.colorTwoOverride !== "") {
		theme.secondary = props.colorTwoOverride;
	}
	if (props.colorThreeOverride !== "") {
		theme.tertiary = props.colorThreeOverride;
	}

	let icon;
	if (props.iconName === undefined || (icon = icons(theme)[props.iconName]) === undefined) {
		return <div>Error no icon found</div>;
	}

	return icon();
}
