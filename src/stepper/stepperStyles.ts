export type StepperStyleId =
	| "classic-circles"
	| "minimal-line"
	| "segmented-pills"
	| "chevron-breadcrumb"
	| "vertical-timeline";

export interface StepperStyleOption {
	id: StepperStyleId;
	label: string;
	description: string;
}

export const STEPPER_STYLE_OPTIONS: StepperStyleOption[] = [
	{
		id: "classic-circles",
		label: "Classic Circles",
		description: "Numbered circles with checkmarks and a connecting line",
	},
	{
		id: "minimal-line",
		label: "Minimal Line",
		description: "Just a caption and a segmented progress bar",
	},
	{
		id: "segmented-pills",
		label: "Segmented Pills",
		description: "Full-width rounded pill for each step",
	},
	{
		id: "chevron-breadcrumb",
		label: "Chevron Breadcrumb",
		description: "Arrow-shaped tabs, wizard-style",
	},
	{
		id: "vertical-timeline",
		label: "Vertical Timeline",
		description: "Top-to-bottom instead of left-to-right",
	},
];

export const DEFAULT_STEPPER_STYLE: StepperStyleId = "classic-circles";
