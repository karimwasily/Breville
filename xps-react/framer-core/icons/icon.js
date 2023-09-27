import React from "react";
import { icons, themes, sizes, colors, copyTheme } from "./icon-map";
import { addPropertyControls, ControlType } from "framer";

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


export const sizeOptions = [];
export const sizeValues = [];
for (const sizeName in sizes) {
  sizeOptions.push(sizeName);
  sizeValues.push(sizes[sizeName]);
}

export const colorOptions = [];
export const colorValues = [];
for (const colorName in colors) {
  colorOptions.push(colorName);
  colorValues.push(colors[colorName]);
}

export const themeOptions = [];
for (const themeName in themes) {
  themeOptions.push(themeName);
}

export const iconOptions = [];
for (const iconName in icons(themes[themeOptions[0]])) {
  iconOptions.push(iconName);
}
const sortedList = iconOptions.sort();

export const svgIconPropertyControls = {
	iconName: {
	  title: "Icon Name",
	  type: ControlType.Enum,
	  defaultValue: iconOptions[0],
	  options: iconOptions,
	  optionTitles: sortedList,
	  hidden(props) {
		return props.showIcon === false;
	  },
	},
	size: {
	  type: ControlType.Enum,
	  title: "Icon Size",
	  defaultValue: sizeOptions[0],
	  options: sizeValues,
	  optionTitles: sizeOptions,
	  hidden(props) {
		return props.showIcon === false;
	  },
	},
	theme: {
	  type: ControlType.Enum,
	  title: "Icon Theme",
	  defaultValue: themeOptions[0],
	  options: themeOptions,
	  optionTitles: themeOptions,
	  hidden(props) {
		return props.showIcon === false;
	  },
	},
	colorOneOverride: {
	  type: ControlType.Enum,
	  title: "Icon 1st color override",
	  defaultValue: colorOptions[0],
	  options: colorValues,
	  optionTitles: colorOptions,
	  hidden(props) {
		return props.showIcon === false;
	  },
	},
	colorTwoOverride: {
	  type: ControlType.Enum,
	title: "Icon 2nd color override",
	  defaultValue: colorOptions[0],
	  options: colorValues,
	  optionTitles: colorOptions,
	  hidden(props) {
		//   return props.theme == (themeOptions[0] && props.showIcon === false);
		return props.showIcon === false || props.theme == themeOptions[0];
	  },
	},
	colorThreeOverride: {
	  type: ControlType.Enum,
	  title: "Icon 3rd color override",
	  defaultValue: colorOptions[0],
	  options: colorValues,
	  optionTitles: colorOptions,
	  hidden(props) {
		return props.showIcon === false || props.theme == themeOptions[0] || props.theme == themeOptions[1];
		// return props.theme == ((themeOptions[0] || props.theme == themeOptions[1]) && props.showIcon === false);
		//   return props.showIcon === false;
	  },
	},
  };
  
  const properties = {};
  Object.assign(properties, svgIconPropertyControls);
  addPropertyControls(SvgIcon, properties);
  