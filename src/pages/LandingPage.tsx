import { Link } from "react-router-dom";
import { Github } from "lucide-react";
import {
	RectangleGroupIcon,
	PuzzlePieceIcon,
	ArrowsRightLeftIcon,
	ShieldCheckIcon,
	Squares2X2Icon,
	SwatchIcon,
	CubeTransparentIcon,
	CodeBracketIcon,
	BeakerIcon,
	ArrowTopRightOnSquareIcon,
	EnvelopeIcon,
	PencilIcon,
	HashtagIcon,
	Bars3BottomLeftIcon,
	ChevronUpDownIcon,
	LinkIcon,
	CheckCircleIcon,
	ViewColumnsIcon,
	ListBulletIcon,
	TagIcon,
	MapPinIcon,
	CalendarDaysIcon,
	PaperClipIcon,
} from "@heroicons/react/24/outline";
import ThemeSelector from "../components/ThemeSelector";
import StepperStyleSelector from "../components/StepperStyleSelector";
import "./LandingPage.css";

const GITHUB_URL = "https://github.com/AzzVipe/steplo";
const CONTACT_EMAIL = "azmat.jobs@gmail.com";

const FIELD_TYPES = [
	{
		type: "text",
		icon: PencilIcon,
		desc: "Single-line free text for names, titles, or short answers.",
	},
	{
		type: "number",
		icon: HashtagIcon,
		desc: "Numeric input with built-in min/max enforcement.",
	},
	{
		type: "textarea",
		icon: Bars3BottomLeftIcon,
		desc: "Multi-line text for descriptions and longer answers.",
	},
	{
		type: "select",
		icon: ChevronUpDownIcon,
		desc: "Native dropdown backed by a static list or async source.",
	},
	{
		type: "linkedSelect",
		icon: LinkIcon,
		desc: "A dependent dropdown that resets itself when its parent changes.",
	},
	{
		type: "choiceCard",
		icon: CheckCircleIcon,
		desc: "Icon + label single-select cards with per-answer help text.",
	},
	{
		type: "choiceChip",
		icon: Squares2X2Icon,
		desc: "A compact row of single-select chips for short option sets.",
	},
	{
		type: "visualCardSelect",
		icon: ViewColumnsIcon,
		desc: "Larger cards with icon, label, and description text.",
	},
	{
		type: "chipMultiSelect",
		icon: ListBulletIcon,
		desc: "Toggleable chips for selecting more than one option.",
	},
	{
		type: "tagInput",
		icon: TagIcon,
		desc: "Creatable, multi-value tags with autocomplete suggestions.",
	},
	{
		type: "addressAutocomplete",
		icon: MapPinIcon,
		desc: "Address input, ready to wire into a real geocoding API.",
	},
	{
		type: "dateRangePicker",
		icon: CalendarDaysIcon,
		desc: "A linked start/end date pair.",
	},
	{
		type: "fileUpload",
		icon: PaperClipIcon,
		desc: "Drag-and-drop or click upload, single or multiple, deferable.",
	},
];

const FEATURES = [
	{
		icon: RectangleGroupIcon,
		title: "JSON-Driven Schema",
		desc: "Every form - steps, fields, validation, layout - is one config object. No hand-written form markup per project, ever.",
	},
	{
		icon: PuzzlePieceIcon,
		title: "Conditional Field Logic",
		desc: "Show or hide any field based on another field's value with showIf. Hidden fields are automatically excluded from validation.",
	},
	{
		icon: ArrowsRightLeftIcon,
		title: "Step-Level Skip Logic",
		desc: "skipStepIf jumps straight past an entire step when a condition matches - no manual step-index math to maintain.",
	},
	{
		icon: ShieldCheckIcon,
		title: "Dynamic Zod Validation",
		desc: "A validation schema is generated from your config on every change, respecting current visibility - chained conditionals just work.",
	},
	{
		icon: Squares2X2Icon,
		title: "13 Built-in Field Types",
		desc: "From plain text to tag inputs and date ranges. Add a 14th by writing one component and registering it - nothing else changes.",
	},
	{
		icon: SwatchIcon,
		title: "6 Themes, One Line to Swap",
		desc: "Every color is a CSS variable. Switch data-theme and the whole UI repaints instantly - zero component changes. Try it above.",
	},
	{
		icon: CubeTransparentIcon,
		title: "5 Stepper Styles",
		desc: "Classic circles, minimal line, segmented pills, chevron breadcrumb, or vertical timeline - swappable independently of theme.",
	},
	{
		icon: CodeBracketIcon,
		title: "Fully Typed",
		desc: "A discriminated FieldType union and Record-based registries mean a field type missed anywhere fails to compile, not at runtime.",
	},
	{
		icon: BeakerIcon,
		title: "Tested Core Logic",
		desc: "The schema generator and step engine - the two hardest parts - are covered by unit tests, including two-level chained conditionals.",
	},
];

const SHOWCASE_FORMS = [
	{
		to: "/freelance-intake",
		title: "Freelance Project Intake",
		desc: "Client details, project scope, conditional branding upload, support-tier logic with a two-level conditional chain.",
	},
	{
		to: "/speaker-submission",
		title: "Conference Speaker Submission",
		desc: "Talk proposal, mentor assignment for first-time speakers, and a skip-step for remote-only speakers.",
	},
	{
		to: "/warranty-claim",
		title: "Product Warranty Claim",
		desc: "Issue details, resolution preference, and a skip-step that removes shipping entirely when it isn't needed.",
	},
];

const TECH_STACK = [
	"React 19",
	"TypeScript",
	"Vite",
	"Tailwind CSS",
	"React Hook Form",
	"Zod",
	"Framer Motion",
	"Vitest",
];

const CONFIG_EXAMPLES = [
	{
		title: "Anatomy of a config",
		desc: "Every form is one object: metadata, an ordered list of steps, and a flat list of fields. Each field just declares which step it belongs to.",
		label: "config.ts",
		code: `{
  meta: { id: "warranty-claim", title: "Product Warranty Claim", version: 1 },
  steps: [
    { id: "productInfo", title: "Product Info" },
    { id: "resolution", title: "Resolution" },
  ],
  fields: [
    { name: "productName", step: "productInfo", type: "text", label: "Product name" },
    { name: "preferredResolution", step: "resolution", type: "visualCardSelect", label: "..." },
  ],
}`,
	},
	{
		title: "Conditional field visibility",
		desc: "showIf hides a field until a condition on another field is met. Hidden fields are excluded from validation automatically, so a required field never blocks submission while it isn't shown.",
		label: "freelanceIntake.config.ts",
		code: `{
  name: "brandAssets",
  type: "fileUpload",
  label: "Upload brand assets",
  showIf: { field: "hasBranding", equals: "yes" },
  validation: { required: true },
}`,
	},
	{
		title: "Step-level skip logic",
		desc: "skipStepIf jumps straight past an entire step, not just one field, when its condition matches. No manual step-index math anywhere in your code.",
		label: "warrantyClaim.config.ts",
		code: `{
  name: "needsReturnShipping",
  type: "choiceCard",
  label: "Do you need a return shipping label?",
  skipStepIf: {
    field: "needsReturnShipping",
    equals: "no",
    goTo: "contact",
  },
}`,
	},
	{
		title: "Validation rules",
		desc: "required, minLength, maxLength, pattern, min, and max all compile into real Zod rules. A custom message overrides the default.",
		label: "speakerSubmission.config.ts",
		code: `{
  name: "talkAbstract",
  type: "textarea",
  label: "Talk abstract",
  validation: {
    required: true,
    minLength: 50,
    message: "Give us at least a few sentences (50+ characters)",
  },
}
{
  name: "supportHoursPerMonth",
  type: "number",
  validation: { required: true, min: 1, max: 160 },
}`,
	},
	{
		title: "Dependent dropdowns",
		desc: "dependsOn plus optionsSource wires one field's options to another field's current value. The dependent field resets itself when its parent changes.",
		label: "freelanceIntake.config.ts",
		code: `{
  name: "country",
  type: "select",
  label: "Country",
  optionsSource: "static:countries",
},
{
  name: "city",
  type: "linkedSelect",
  label: "City",
  dependsOn: "country",
  optionsSource: "static:cityByCountry",
}`,
	},
	{
		title: "Per-answer help text",
		desc: "answerHelp is keyed by the option's value, not a loose label, so it can be looked up programmatically instead of pattern-matched.",
		label: "freelanceIntake.config.ts",
		code: `{
  name: "hasBranding",
  type: "choiceCard",
  label: "Do you have existing branding?",
  options: [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ],
  answerHelp: {
    yes: "You'll be asked to upload your brand assets next.",
    no: null,
  },
}`,
	},
	{
		title: "Multi-value fields",
		desc: "tagInput supports free-form, creatable entries alongside suggestions from a reference source. chipMultiSelect toggles any number of fixed options.",
		label: "freelanceIntake.config.ts",
		code: `{
  name: "requiredSkills",
  type: "tagInput",
  label: "Required skills",
  optionsSource: "reference:skills",
  allowCreate: true,
  multiple: true,
  validation: { required: true },
}`,
	},
	{
		title: "Chained conditionals",
		desc: "The hardest case: a field whose visibility depends on a second field, whose own visibility depends on a third. The schema generator resolves this correctly on every change.",
		label: "freelanceIntake.config.ts",
		code: `{
  name: "needsOngoingSupport",
  type: "choiceCard",
  label: "Do you need ongoing support after delivery?",
},
{
  name: "supportTier",
  type: "select",
  showIf: { field: "needsOngoingSupport", equals: "yes" },
  validation: { required: true },
},
{
  name: "supportHoursPerMonth",
  type: "number",
  // only required once BOTH conditions above are satisfied
  showIf: { field: "supportTier", equals: "premium" },
  validation: { required: true, min: 1, max: 160 },
}`,
	},
];

export default function LandingPage() {
	return (
		<div
			style={{ backgroundColor: "var(--color-surface)", minHeight: "100vh" }}>
			<header className="landing-nav">
				<div className="landing-nav-inner">
					<div className="landing-logo">
						<span className="landing-logo-mark">S</span>
						Steplo
					</div>
					<div className="flex items-center gap-2 flex-wrap justify-end">
						<ThemeSelector />
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-secondary">
							<Github className="w-4 h-4" />
							GitHub
						</a>
					</div>
				</div>
			</header>

			<section className="landing-hero">
				<div>
					<span className="landing-eyebrow">
						<SwatchIcon className="w-3.5 h-3.5" />
						Config-driven · Fully typed · Themeable
					</span>
					<h1 className="landing-h1">
						Multi-step forms, <br />
						defined in JSON.
					</h1>
					<p className="landing-subtitle">
						Steplo turns a single config object into a fully validated,
						animated, themeable multi-step form. Define your steps and fields as
						JSON, and get conditional field visibility, step-skip logic, dynamic
						Zod validation, 13 ready-made input types, 6 themes, and 5 stepper
						styles - all driven by data, not hand-written components you rebuild
						on every project.
					</p>
					<div className="landing-cta-row">
						<Link to="/freelance-intake" className="btn btn-primary">
							Try the live demo
							<ArrowTopRightOnSquareIcon className="w-4 h-4" />
						</Link>
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-secondary">
							<Github className="w-4 h-4" />
							View source
						</a>
					</div>
				</div>

				<CodePanel
					label="freelanceIntake.config.ts"
					code={`{
  name: "hasBranding",
  type: "choiceCard",
  label: "Do you have existing branding?",
  // this next field only renders when hasBranding = "yes"
},
{
  name: "brandAssets",
  type: "fileUpload",
  showIf: { field: "hasBranding", equals: "yes" },
}`}
				/>
			</section>

			<section className="landing-section" style={{ paddingTop: 0 }}>
				<h2 className="landing-section-heading">
					Try it on this page, right now
				</h2>
				<p className="landing-section-subheading">
					Theme and stepper style are both global, independent choices - not
					baked into any one form. Pick a theme below and this entire page
					repaints instantly. Pick a stepper style and every form on the site
					switches to it. Nothing here is a screenshot.
				</p>

				<div className="customize-panel">
					<div className="customize-row">
						<div className="flex flex-col gap-1.5">
							<span className="feature-title" style={{ marginBottom: 0 }}>
								Theme
							</span>
							<ThemeSelector />
						</div>
						<div className="flex flex-col gap-1.5">
							<span className="feature-title" style={{ marginBottom: 0 }}>
								Stepper style
							</span>
							<StepperStyleSelector />
						</div>
					</div>
					<p className="feature-desc mt-4" style={{ textAlign: "center" }}>
						6 themes × 5 stepper styles = 30 distinct looks, from the same 6
						files - nothing in the field components, schema generator, or step
						engine changes when you switch either one.
					</p>
				</div>
			</section>

			<section className="landing-section">
				<h2 className="landing-section-heading">
					Everything the toolkit gives you
				</h2>
				<p className="landing-section-subheading">
					Nine things baked into the engine, none of which need to be rebuilt
					per project.
				</p>

				<div className="feature-grid">
					{FEATURES.map((feature) => {
						const Icon = feature.icon;
						return (
							<div className="feature-card" key={feature.title}>
								<div className="feature-icon">
									<Icon className="w-5 h-5" />
								</div>
								<p className="feature-title">{feature.title}</p>
								<p className="feature-desc">{feature.desc}</p>
							</div>
						);
					})}
				</div>
			</section>

			<section className="landing-section">
				<h2 className="landing-section-heading">13 built-in field types</h2>
				<p className="landing-section-subheading">
					Every one of these is registered the same way - write the component
					once, add one line to the registry, and it's usable from any config on
					the site.
				</p>

				<div className="type-grid">
					{FIELD_TYPES.map((field) => {
						const Icon = field.icon;
						return (
							<div className="type-card" key={field.type}>
								<div
									className="feature-icon"
									style={{ marginBottom: 8, width: 32, height: 32 }}>
									<Icon className="w-4 h-4" />
								</div>
								<p className="type-card-name">{field.type}</p>
								<p className="feature-desc">{field.desc}</p>
							</div>
						);
					})}
				</div>
			</section>

			<section className="landing-section">
				<h2 className="landing-section-heading">The full config surface</h2>
				<p className="landing-section-subheading">
					Everything above is a summary. This is the actual config API, the same
					snippets you'd find by reading the source, without needing to go dig
					for them.
				</p>

				<div className="flex flex-col gap-10">
					{CONFIG_EXAMPLES.map((example) => (
						<div
							className="grid gap-6 lg:grid-cols-2 items-start"
							key={example.title}>
							<CodePanel label={example.label} code={example.code} />
							<div>
								<p className="feature-title" style={{ fontSize: 15 }}>
									{example.title}
								</p>
								<p
									style={{ color: "var(--color-text-muted)" }}
									className="text-sm leading-relaxed">
									{example.desc}
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			<section className="landing-section">
				<h2 className="landing-section-heading">
					See it in three different domains
				</h2>
				<p className="landing-section-subheading">
					Same engine, same 13 field types, three unrelated forms - proof the
					config drives the UI, not the other way around.
				</p>

				<div className="grid gap-4 sm:grid-cols-3">
					{SHOWCASE_FORMS.map((form) => (
						<Link to={form.to} key={form.to} className="showcase-card">
							<p className="feature-title">{form.title}</p>
							<p className="feature-desc flex-1">{form.desc}</p>
							<span
								className="text-sm font-medium flex items-center gap-1"
								style={{ color: "var(--color-accent)" }}>
								View form
								<ArrowTopRightOnSquareIcon className="w-3.5 h-3.5" />
							</span>
						</Link>
					))}
				</div>
			</section>

			<section className="landing-section">
				<h2 className="landing-section-heading">Built with</h2>
				<div className="flex flex-wrap gap-2 justify-center">
					{TECH_STACK.map((tech) => (
						<span className="tech-pill" key={tech}>
							{tech}
						</span>
					))}
				</div>
			</section>

			<footer className="landing-footer">
				<div className="landing-footer-inner">
					<h2 className="landing-section-heading" style={{ marginBottom: 8 }}>
						Want something like this built for your product?
					</h2>
					<p
						className="landing-section-subheading"
						style={{ marginBottom: 24 }}>
						I build config-driven UI systems like this one - reach out if you're
						hiring or have a project in mind.
					</p>
					<div className="flex flex-wrap gap-3 justify-center">
						<a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
							<EnvelopeIcon className="w-4 h-4" />
							{CONTACT_EMAIL}
						</a>
						<a
							href={GITHUB_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn btn-secondary">
							<Github className="w-4 h-4" />
							GitHub
						</a>
					</div>
				</div>
			</footer>
		</div>
	);
}

interface CodePanelProps {
	label: string;
	code: string;
}

function CodePanel({ label, code }: CodePanelProps) {
	const lines = code.replace(/^\n/, "").replace(/\n$/, "").split("\n");

	return (
		<div className="code-panel">
			<div className="code-panel-header">
				<span
					className="code-panel-dot"
					style={{ backgroundColor: "#ef4444" }}
				/>
				<span
					className="code-panel-dot"
					style={{ backgroundColor: "#f59e0b" }}
				/>
				<span
					className="code-panel-dot"
					style={{ backgroundColor: "#22c55e" }}
				/>
				<span className="field-help ml-2">{label}</span>
			</div>
			<pre className="code-panel-body">
				{lines.map((line, i) => (
					<div key={i}>{highlightLine(line)}</div>
				))}
			</pre>
		</div>
	);
}

// A line is either a full-line comment, a "key: value" pair (possibly followed
// by more on the same line, e.g. "field: "x", equals: "y""), or punctuation
// only ("{", "}", "},"). Leading whitespace is preserved as literal spaces
// since code-panel-body is a <pre>, so indentation renders correctly.
function highlightLine(line: string) {
	const leadingMatch = line.match(/^(\s*)/);
	const indent = leadingMatch ? leadingMatch[1] : "";
	const rest = line.slice(indent.length);

	if (rest.trim().startsWith("//")) {
		return (
			<>
				{indent}
				<span className="code-comment">{rest}</span>
			</>
		);
	}

	// Split the rest into segments, coloring quoted strings, booleans, and
	// bare identifiers immediately followed by a colon (object keys).
	const tokenPattern =
		/("(?:[^"\\]|\\.)*")|(\btrue\b|\bfalse\b)|(\b[A-Za-z_][A-Za-z0-9_]*\b)(?=\s*:)/g;
	const segments: Array<
		string | { type: "string" | "bool" | "key"; text: string }
	> = [];
	let lastIndex = 0;
	let match: RegExpExecArray | null;

	while ((match = tokenPattern.exec(rest)) !== null) {
		if (match.index > lastIndex)
			segments.push(rest.slice(lastIndex, match.index));
		if (match[1]) segments.push({ type: "string", text: match[1] });
		else if (match[2]) segments.push({ type: "bool", text: match[2] });
		else if (match[3]) segments.push({ type: "key", text: match[3] });
		lastIndex = tokenPattern.lastIndex;
	}
	if (lastIndex < rest.length) segments.push(rest.slice(lastIndex));

	return (
		<>
			{indent}
			{segments.map((seg, i) => {
				if (typeof seg === "string") return <span key={i}>{seg}</span>;
				const className =
					seg.type === "string"
						? "code-string"
						: seg.type === "bool"
						? "code-bool"
						: "code-key";
				return (
					<span className={className} key={i}>
						{seg.text}
					</span>
				);
			})}
		</>
	);
}
