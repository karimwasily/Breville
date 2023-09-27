import * as React from "react";
import { addPropertyControls, ControlType, Frame } from "framer";

const color = {
	// Foundation
	primaryFoundation: "red",
	// Product
	primaryProduct: "lime",
	// Mobile
	primaryMobile: "blue",
	darkGrey: "#3D3D3D",
	// Web
	primaryWeb: "#313638",
	functionCommercial: "#634368",
};

Typography.defaultProps = {
	text: "Title 1 Web",
	options: "Title 1 Web",
};

addPropertyControls(Typography, {
	platform: {
		type: ControlType.Enum,
		options: ["Foundation", "Product", "Web", "Mobile"],
	},
	text: {
		type: ControlType.String,
		defaultValue: "Text",
	},
	//// Add this and remove ```options: ["Title 1 Product", "Title 1 Product Color"],```
	// textColor: {
	// 	type: ControlType.Enum,
	// 	options: [color.functionCommercial, color.darkGrey],
	// 	optionTitles: ["functionCommercial", "darkGrey"],
	// 	hidden(props) {
	// 		return props.platform !== "Product";
	// 	},
	// },

	// Options
	optionsFoundation: {
		type: ControlType.Enum,
		options: ["Title 1 Foundation"],
		hidden(props) {
			return props.platform !== "Foundation";
		},
	},
	optionsProduct: {
		type: ControlType.Enum,
		options: ["Title 1 Product"],
		hidden(props) {
			return props.platform !== "Product";
		},
	},
	optionsWeb: {
		type: ControlType.Enum,
		options: ["Title 1 Web", "Title 2 Web", "Title 3 Web", "Title 4 Web", "Title 6 Web", "Title 7 Web", "Title 8 Web", "Title 12 Bold Web", "Title 12 Medium Web", "Title 13 Web", "Title 14 Web", "Paragraph 1 Web", "Paragraph 2 Web", "Paragraph 3 Web", "Paragraph 4 Web", "Paragraph 5 Web"],
		hidden(props) {
			return props.platform !== "Web";
		},
	},
	optionsMobile: {
		type: ControlType.Enum,
		options: ["Title 1 Mobile"],
		hidden(props) {
			return props.platform !== "Mobile";
		},
	},
});

export function Typography(props) {
	if (props.platform === "Foundation") {
		return (
			<div
				style={{
					fontFamily: fontStyles[props.optionsFoundation].fontFamily,
					fontWeight: fontStyles[props.optionsFoundation].fontWeight,
					fontStyle: fontStyles[props.optionsFoundation].fontStyle,
					fontSize: fontStyles[props.optionsFoundation].fontSize,
					lineHeight: fontStyles[props.optionsFoundation].lineHeight,
					color: fontStyles[props.optionsFoundation].color,
				}}
			>
				{props.text}
			</div>
		);
	}
	if (props.platform === "Product") {
		return (
			<div
				style={{
					fontFamily: fontStyles[props.optionsProduct].fontFamily,
					fontWeight: fontStyles[props.optionsProduct].fontWeight,
					fontStyle: fontStyles[props.optionsProduct].fontStyle,
					fontSize: fontStyles[props.optionsProduct].fontSize,
					lineHeight: fontStyles[props.optionsProduct].lineHeight,
					color: fontStyles[props.optionsProduct].color,
				}}
			>
				{props.text}
			</div>
		);
	}
	if (props.platform === "Web") {
		return (
			<div
				style={{
					fontFamily: fontStyles[props.optionsWeb].fontFamily,
					fontWeight: fontStyles[props.optionsWeb].fontWeight,
					fontStyle: fontStyles[props.optionsWeb].fontStyle,
					fontSize: fontStyles[props.optionsWeb].fontSize,
					lineHeight: fontStyles[props.optionsWeb].lineHeight,
					color: fontStyles[props.optionsWeb].color,
				}}
			>
				{props.text}
			</div>
		);
	}
	if (props.platform === "Mobile") {
		return (
			<div
				style={{
					fontFamily: fontStyles[props.optionsMobile].fontFamily,
					fontWeight: fontStyles[props.optionsMobile].fontWeight,
					fontStyle: fontStyles[props.optionsMobile].fontStyle,
					fontSize: fontStyles[props.optionsMobile].fontSize,
					lineHeight: fontStyles[props.optionsMobile].lineHeight,
					color: fontStyles[props.optionsMobile].color,
				}}
			>
				{props.text}
			</div>
		);
	}
}

const fontStyles = {
	// Foundation
	"Title 1 Foundation": {
		fontFamily: "Arial",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 40,
		lineHeight: 40,
		color: color.primaryFoundation,
	},
	// Product - name?
	"Title 1 Product": {
		fontFamily: "Jaffleglyph-Bold",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 40,
		lineHeight: "normal",
		fontStretch: "normal",
		letterSpacing: "normal",
		color: color.darkGrey,
	},
	// Mobile - Joule App
	"Title 1 Mobile": {
		fontFamily: "Times",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 40,
		lineHeight: 40,
		color: color.primaryMobile,
	},
	// Web - Experience Hub & Coffee Solutions
	"Title 1 Web": {
		fontFamily: "Archer",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 55,
		// lineHeight: 60,
		color: color.primaryWeb,
	},
	"Title 2 Web": {
		fontFamily: "Archer SSm",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 35,
		// lineHeight: 42,
		color: color.primaryWeb,
	},
	"Title 3 Web": {
		fontFamily: "Archer",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 35,
		// lineHeight: 42,
		color: color.primaryWeb,
	},
	"Title 4 Web": {
		fontFamily: "Archer SSm",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 30,
		// lineHeight: 38,
		color: color.primaryWeb,
	},
	"Title 6 Web": {
		fontFamily: "Archer SSm",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 24,
		// lineHeight: 32,
		color: color.primaryWeb,
	},
	"Title 7 Web": {
		fontFamily: "Archer SSm",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 21,
		// lineHeight: 30,
		color: color.primaryWeb,
	},
	"Title 8 Web": {
		fontFamily: "Helvetica Neue",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 22,
		// lineHeight: 30,
		color: color.primaryWeb,
	},
	"Title 12 Bold Web": {
		fontFamily: "Archer",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 20,
		// lineHeight: 28,
		color: color.primaryWeb,
	},
	"Title 12 Medium Web": {
		fontFamily: "Archer",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 20,
		// lineHeight: 28,
		color: color.primaryWeb,
	},
	"Title 13 Web": {
		fontFamily: "Helvetica Neue;",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 22,
		// lineHeight: 30,
		color: color.primaryWeb,
	},
	"Title 14 Web": {
		fontFamily: "archer",
		fontWeight: "bold",
		fontStyle: "normal",
		fontSize: 24,
		// lineHeight: 32,
		color: color.primaryWeb,
	},
	"Paragraph 1 Web": {
		fontFamily: "Helvetica Neue",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 18,
		// lineHeight: 26,
		color: color.primaryWeb,
	},
	"Paragraph 2 Web": {
		fontFamily: "Helvetica Neue",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 16,
		// lineHeight: 24,
		color: color.primaryWeb,
	},
	"Paragraph 3 Web": {
		fontFamily: "Archer",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 16,
		// lineHeight: 24,
		color: color.primaryWeb,
	},
	"Paragraph 4 Web": {
		fontFamily: "archer",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 14,
		// lineHeight: 22,
		color: color.primaryWeb,
	},
	"Paragraph 5 Web": {
		fontFamily: "archer",
		fontWeight: "normal",
		fontStyle: "normal",
		fontSize: 12,
		// lineHeight: 16,
		color: color.primaryWeb,
	},
};
