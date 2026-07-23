export type ThemeId =
	| "slate-cobalt"
	| "linen-moss"
	| "frost-teal"
	| "midnight-violet"
	| "carbon-lime"
	| "obsidian-rose";

export interface ThemeOption {
	id: ThemeId;
	label: string;
	mode: "light" | "dark";
	swatch: {
		surface: string;
		card: string;
		accent: string;
	};
}

export const THEME_OPTIONS: ThemeOption[] = [
	{
		id: "slate-cobalt",
		label: "Slate & Cobalt",
		mode: "light",
		swatch: { surface: "#f8fafc", card: "#ffffff", accent: "#2563eb" },
	},
	{
		id: "linen-moss",
		label: "Linen & Moss",
		mode: "light",
		swatch: { surface: "#faf7f2", card: "#ffffff", accent: "#5b7355" },
	},
	{
		id: "frost-teal",
		label: "Frost & Teal",
		mode: "light",
		swatch: { surface: "#f4f8f8", card: "#ffffff", accent: "#0d9488" },
	},
	{
		id: "midnight-violet",
		label: "Midnight & Violet",
		mode: "dark",
		swatch: { surface: "#0f1020", card: "#191a2e", accent: "#8b7cf6" },
	},
	{
		id: "carbon-lime",
		label: "Carbon & Lime",
		mode: "dark",
		swatch: { surface: "#121212", card: "#1c1c1c", accent: "#a3e635" },
	},
	{
		id: "obsidian-rose",
		label: "Obsidian & Rose",
		mode: "dark",
		swatch: { surface: "#17130f", card: "#211b16", accent: "#fb7185" },
	},
];

export const DEFAULT_THEME: ThemeId = "slate-cobalt";
