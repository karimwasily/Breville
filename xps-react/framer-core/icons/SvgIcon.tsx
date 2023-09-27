import * as React from "react";
import { icons, Theme, themes, sizes, colors, copyTheme } from "./SvgIcons";
import { addPropertyControls, ControlType, Frame } from "framer";

// Getting errors in console
export default function SvgIcon(props) {
	var theme: Theme = copyTheme(themes[props.theme]);
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

	var icon;
	if (props.iconName === undefined || (icon = icons(theme)[props.iconName]) === undefined) {
		return <div>Error no icon found</div>;
	}

	return icon();
}

var sizeOptions = [];
var sizeValues = [];
for (var sizeName in sizes) {
	sizeOptions.push(sizeName);
	sizeValues.push(sizes[sizeName]);
}

var colorOptions = [];
var colorValues = [];
for (var colorName in colors) {
	colorOptions.push(colorName);
	colorValues.push(colors[colorName]);
}

var themeOptions = [];
for (var themeName in themes) {
	themeOptions.push(themeName);
}

var iconOptions = [];
// Billy say change to let as won't be global variables?
for (var iconName in icons(themes[themeOptions[0]])) {
	iconOptions.push(iconName);
}
const sortedList = iconOptions.sort();

addPropertyControls(SvgIcon, {
	iconName: {
		title: "Icon",
		type: ControlType.Enum,
		defaultValue: iconOptions[0],
		options: iconOptions,
		optionTitles: sortedList,
	},
	size: {
		type: ControlType.Enum,
		title: "Size",
		defaultValue: sizeOptions[0],
		options: sizeValues,
		optionTitles: sizeOptions,
	},
	theme: {
		type: ControlType.Enum,
		title: "Theme",
		defaultValue: themeOptions[0],
		options: themeOptions,
		optionTitles: themeOptions,
	},
	colorOneOverride: {
		type: ControlType.Enum,
		title: "1st color override",
		defaultValue: colorOptions[0],
		options: colorValues,
		optionTitles: colorOptions,
	},
	colorTwoOverride: {
		type: ControlType.Enum,
		title: "2nd color override",
		defaultValue: colorOptions[0],
		options: colorValues,
		optionTitles: colorOptions,
		// hidden(props) {
		// 	console.log(props.theme, themeOptions[1]);
		// 	return props.theme == themeOptions[0];
		// },
	},
	colorThreeOverride: {
		type: ControlType.Enum,
		title: "3rd color override",
		defaultValue: colorOptions[0],
		options: colorValues,
		optionTitles: colorOptions,
		// hidden(props) {
		// 	return props.theme == themeOptions[0] || props.theme == themeOptions[1];
		// },
	},
});
