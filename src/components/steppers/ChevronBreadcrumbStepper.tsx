import type { StepperComponentProps } from "../../types/form";

const ARROW_CLIP =
	"polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%, 10% 50%)";
const FIRST_CLIP = "polygon(0% 0%, 88% 0%, 100% 50%, 88% 100%, 0% 100%)";

export default function ChevronBreadcrumbStepper({
	steps,
	currentIndex,
}: StepperComponentProps) {
	return (
		<div className="flex mb-6" style={{ gap: 2 }}>
			{steps.map((step, index) => {
				const isComplete = index < currentIndex;
				const isActive = index === currentIndex;
				const isPast = isComplete || isActive;

				return (
					<div
						key={step.id}
						className="flex-1 text-center px-3 py-2.5 text-xs font-medium truncate transition-colors"
						style={{
							clipPath: index === 0 ? FIRST_CLIP : ARROW_CLIP,
							marginLeft: index === 0 ? 0 : -10,
							backgroundColor: isPast
								? "var(--color-accent)"
								: "var(--color-border)",
							color: isPast ? "#ffffff" : "var(--color-text-muted)",
						}}>
						{step.title}
					</div>
				);
			})}
		</div>
	);
}
