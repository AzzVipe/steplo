import type { StepperComponentProps } from "../../types/form";

export default function SegmentedPillsStepper({ steps, currentIndex }: StepperComponentProps) {
	return (
		<div className="flex gap-1.5 mb-6">
			{steps.map((step, index) => {
				const isComplete = index < currentIndex;
				const isActive = index === currentIndex;
				const isPast = isComplete || isActive;

				return (
					<div
						key={step.id}
						className="flex-1 text-center px-2 py-2 rounded-full text-xs font-medium truncate transition-colors"
						style={{
							backgroundColor: isPast ? "var(--color-accent)" : "var(--color-card)",
							color: isPast ? "#ffffff" : "var(--color-text-muted)",
							border: isPast ? "none" : "1px solid var(--color-border)",
						}}>
						{step.title}
					</div>
				);
			})}
		</div>
	);
}
