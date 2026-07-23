import { NavLink } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import StepperStyleSelector from "./StepperStyleSelector";

const LINKS = [
	{ to: "/freelance-intake", label: "Freelance Intake" },
	{ to: "/speaker-submission", label: "Speaker Submission" },
	{ to: "/warranty-claim", label: "Warranty Claim" },
];

export default function ShowcaseNav() {
	return (
		<nav className="max-w-xl mx-auto pt-6 px-4 flex flex-col gap-3">
			<div className="flex gap-2 flex-wrap">
				{LINKS.map((link) => (
					<NavLink
						key={link.to}
						to={link.to}
						className={({ isActive }) => `btn ${isActive ? "btn-primary" : "btn-secondary"}`}>
						{link.label}
					</NavLink>
				))}
			</div>
			<div className="flex gap-2 flex-wrap">
				<ThemeSelector />
				<StepperStyleSelector />
			</div>
		</nav>
	);
}
