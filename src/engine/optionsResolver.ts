import type { FieldOption, FormField } from "../types/form";

const STATIC_OPTION_SOURCES: Record<string, FieldOption[]> = {
	countries: [
		{ value: "IN", label: "India" },
		{ value: "US", label: "United States" },
		{ value: "UK", label: "United Kingdom" },
		{ value: "FR", label: "France" },
	],
};

const STATIC_DEPENDENT_SOURCES: Record<string, Record<string, string[]>> = {
	cityByCountry: {
		IN: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
		US: ["New York", "Chicago", "Boston", "Los Angeles"],
		UK: ["Birmingham", "Belfast", "Cambridge", "Liverpool"],
		FR: ["Paris", "Strasbourg", "Versailles", "Lyon"],
	},
};

const REFERENCE_SOURCES: Record<string, FieldOption[]> = {
	skills: [
		{ value: "react", label: "React" },
		{ value: "vue", label: "Vue" },
		{ value: "node", label: "Node.js" },
		{ value: "typescript", label: "TypeScript" },
		{ value: "figma", label: "Figma" },
		{ value: "seo", label: "SEO" },
	],
	techStack: [
		{ value: "react", label: "React" },
		{ value: "vue", label: "Vue" },
		{ value: "svelte", label: "Svelte" },
		{ value: "rust", label: "Rust" },
		{ value: "go", label: "Go" },
		{ value: "kubernetes", label: "Kubernetes" },
	],
	carriers: [
		{ value: "ups", label: "UPS" },
		{ value: "fedex", label: "FedEx" },
		{ value: "usps", label: "USPS" },
		{ value: "dhl", label: "DHL" },
	],
};

// dependsOn resolution for linkedSelect (e.g. city depends on country)
export function resolveDependentOptions(
	sourceKey: string | undefined,
	parentValue: unknown
): FieldOption[] {
	if (!sourceKey || !parentValue || typeof parentValue !== "string") return [];

	const source = STATIC_DEPENDENT_SOURCES[sourceKey];
	if (!source) return [];

	const cities = source[parentValue] ?? [];
	return cities.map((city) => ({ value: city, label: city }));
}

export function resolveOptions(field: FormField): FieldOption[] {
	if (field.options) return field.options;
	if (!field.optionsSource) return [];

	const [kind, key] = field.optionsSource.split(":");
	if (kind === "static") return STATIC_OPTION_SOURCES[key] ?? [];
	if (kind === "reference") return REFERENCE_SOURCES[key] ?? [];
	return [];
}
