import type { FormConfig } from "../types/form";

export const formConfig: FormConfig = {
	meta: {
		id: "freelance-project-intake",
		title: "Freelance Project Intake",
		version: 1,
	},
	steps: [
		{
			id: "clientDetails",
			title: "Client Details",
		},
		{
			id: "projectOverview",
			title: "Project Overview",
		},
		{
			id: "requirements",
			title: "Requirements",
			layout: "grid",
		},
		{
			id: "support",
			title: "Support & Extras",
		},
		{
			id: "documents",
			title: "Documents",
		},
	],
	fields: [
		{
			name: "clientName",
			step: "clientDetails",
			type: "text",
			label: "Your name",
			placeholder: "Jane Doe",
			validation: {
				required: true,
				minLength: 2,
			},
		},
		{
			name: "companyName",
			step: "clientDetails",
			type: "text",
			label: "Company name",
			placeholder: "Acme Inc.",
			optional: true,
			optionalLabel: "I'm hiring as an individual",
		},
		{
			name: "country",
			step: "clientDetails",
			type: "select",
			label: "Country",
			optionsSource: "static:countries",
			options: [
				{
					value: "IN",
					label: "India",
				},
				{
					value: "US",
					label: "United States",
				},
				{
					value: "UK",
					label: "United Kingdom",
				},
				{
					value: "FR",
					label: "France",
				},
			],
			validation: {
				required: true,
			},
		},
		{
			name: "city",
			step: "clientDetails",
			type: "linkedSelect",
			label: "City",
			dependsOn: "country",
			optionsSource: "static:cityByCountry",
			validation: {
				required: true,
			},
		},
		{
			name: "billingAddress",
			step: "clientDetails",
			type: "addressAutocomplete",
			label: "Billing address",
			placeholder: "Start typing your address",
			validation: {
				required: true,
			},
		},
		{
			name: "projectType",
			step: "projectOverview",
			type: "visualCardSelect",
			label: "What type of project is this?",
			options: [
				{
					value: "web",
					label: "Web App",
					icon: "GlobeAltIcon",
					description: "Browser-based application",
				},
				{
					value: "mobile",
					label: "Mobile App",
					icon: "DevicePhoneMobileIcon",
					description: "iOS / Android app",
				},
				{
					value: "branding",
					label: "Branding",
					icon: "PaintBrushIcon",
					description: "Logo, identity, guidelines",
				},
				{
					value: "marketing",
					label: "Marketing",
					icon: "MegaphoneIcon",
					description: "Campaigns, content, ads",
				},
			],
			validation: {
				required: true,
			},
		},
		{
			name: "projectDescription",
			step: "projectOverview",
			type: "textarea",
			label: "Describe the project",
			placeholder: "What are you trying to build, and why?",
			validation: {
				required: true,
				minLength: 20,
				message: "Give us a bit more detail (20+ characters)",
			},
		},
		{
			name: "projectDuration",
			step: "projectOverview",
			type: "dateRangePicker",
			label: "Expected project duration",
			validation: {
				required: true,
			},
		},
		{
			name: "budgetRange",
			step: "projectOverview",
			type: "select",
			label: "Budget range",
			options: [
				{
					value: "lt1k",
					label: "Under $1,000",
				},
				{
					value: "1k-5k",
					label: "$1,000 - $5,000",
				},
				{
					value: "5k-15k",
					label: "$5,000 - $15,000",
				},
				{
					value: "gt15k",
					label: "$15,000+",
				},
			],
			validation: {
				required: true,
			},
		},
		{
			name: "requiredSkills",
			step: "requirements",
			type: "tagInput",
			label: "Required skills",
			optionsSource: "reference:skills",
			allowCreate: true,
			multiple: true,
			validation: {
				required: true,
			},
		},
		{
			name: "communicationTools",
			step: "requirements",
			type: "chipMultiSelect",
			label: "Preferred communication tools",
			options: [
				{
					value: "slack",
					label: "Slack",
					icon: "SlackIcon",
				},
				{
					value: "email",
					label: "Email",
					icon: "EnvelopeIcon",
				},
				{
					value: "zoom",
					label: "Zoom",
					icon: "VideoCameraIcon",
				},
				{
					value: "teams",
					label: "Microsoft Teams",
					icon: "UsersIcon",
				},
			],
			validation: {
				required: true,
			},
		},
		{
			name: "workMode",
			step: "requirements",
			type: "choiceChip",
			label: "Work mode",
			options: [
				{
					value: "remote",
					label: "Remote",
					icon: "HomeIcon",
				},
				{
					value: "hybrid",
					label: "Hybrid",
					icon: "ArrowsRightLeftIcon",
				},
				{
					value: "onsite",
					label: "On-site",
					icon: "BuildingOfficeIcon",
				},
			],
			validation: {
				required: true,
			},
		},
		{
			name: "hasBranding",
			step: "requirements",
			type: "choiceCard",
			label: "Do you have existing branding?",
			options: [
				{
					value: "yes",
					label: "Yes",
					icon: "CheckIcon",
				},
				{
					value: "no",
					label: "No",
					icon: "XMarkIcon",
				},
			],
			answerHelp: {
				yes: "You'll be asked to upload your brand assets in the next step.",
				no: null,
			},
			validation: {
				required: true,
			},
		},
		{
			name: "brandAssets",
			step: "requirements",
			type: "fileUpload",
			label: "Upload brand assets",
			placeholder: "Logo, guidelines, colors, fonts",
			multiple: true,
			showIf: {
				field: "hasBranding",
				equals: "yes",
			},
			validation: {
				required: true,
			},
		},
		{
			name: "needsOngoingSupport",
			step: "support",
			type: "choiceCard",
			label: "Do you need ongoing support after delivery?",
			options: [
				{
					value: "yes",
					label: "Yes",
					icon: "CheckIcon",
				},
				{
					value: "no",
					label: "No",
					icon: "XMarkIcon",
				},
			],
			skipStepIf: {
				field: "needsOngoingSupport",
				equals: "no",
				goTo: "documents",
			},
			validation: {
				required: true,
			},
		},
		{
			name: "supportTier",
			step: "support",
			type: "select",
			label: "Preferred support tier",
			options: [
				{
					value: "basic",
					label: "Basic - bug fixes only",
				},
				{
					value: "standard",
					label: "Standard - bug fixes + small changes",
				},
				{
					value: "premium",
					label: "Premium - dedicated monthly hours",
				},
			],
			showIf: {
				field: "needsOngoingSupport",
				equals: "yes",
			},
			validation: {
				required: true,
			},
		},
		{
			name: "supportHoursPerMonth",
			step: "support",
			type: "number",
			label: "Estimated support hours per month",
			showIf: {
				field: "supportTier",
				equals: "premium",
			},
			validation: {
				required: true,
				min: 1,
				max: 160,
			},
		},
		{
			name: "additionalDocuments",
			step: "documents",
			type: "fileUpload",
			label: "Upload project brief / reference docs",
			placeholder: "Any specs, references, or inspiration files",
			multiple: true,
			deferable: true,
			optional: true,
			optionalLabel: "I'll send this later",
		},
		{
			name: "additionalNotes",
			step: "documents",
			type: "textarea",
			label: "Anything else we should know?",
			optional: true,
		},
	],
};
