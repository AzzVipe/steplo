export type FieldType =
	| "text"
	| "number"
	| "textarea"
	| "select"
	| "linkedSelect"
	| "choiceCard"
	| "choiceChip"
	| "visualCardSelect"
	| "chipMultiSelect"
	| "tagInput"
	| "addressAutocomplete"
	| "dateRangePicker"
	| "fileUpload";

export interface ValidationRule {
	required?: boolean;
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	min?: number;
	max?: number;
	message?: string;
}

export interface FieldOption {
	value: string;
	label: string;
	icon?: string;
	description?: string;
}

export interface ShowIfCondition {
	field: string;
	equals?: string;
	notEquals?: string;
	in?: string[];
	exists?: boolean;
}

export interface SkipStepIf {
	field: string;
	equals: string;
	goTo: string;
}

export interface DateRangeValue {
	start: string;
	end: string;
}

export interface FormField {
	name: string;
	step: string;
	type: FieldType;
	label: string;
	placeholder?: string;
	helpText?: string;
	options?: FieldOption[];
	optionsSource?: string;
	dependsOn?: string;
	showIf?: ShowIfCondition;
	skipStepIf?: SkipStepIf;
	validation?: ValidationRule;
	answerHelp?: Record<string, string | null>;
	optional?: boolean;
	optionalLabel?: string;
	multiple?: boolean;
	allowCreate?: boolean;
	deferable?: boolean;
}

export interface FormStep {
	id: string;
	title: string;
	layout?: "default" | "grid";
}

export interface FormMeta {
	id: string;
	title: string;
	version: number;
}

export interface FormConfig {
	meta: FormMeta;
	steps: FormStep[];
	fields: FormField[];
}

export type FormValues = Record<string, unknown>;

export type StepDirection = "forward" | "backward";

export interface StepperComponentProps {
	steps: FormStep[];
	currentIndex: number;
}

export interface FieldComponentProps {
	field: FormField;
	register: import("react-hook-form").UseFormRegister<FormValues>;
	control: import("react-hook-form").Control<FormValues>;
	error?: import("react-hook-form").FieldErrors<FormValues>[string];
}
