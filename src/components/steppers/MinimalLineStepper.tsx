import type { StepperComponentProps } from "../../types/form";

export default function MinimalLineStepper({ steps, currentIndex }: StepperComponentProps) {
	const currentStep = steps[currentIndex];

	return (
		<div className="mb-6">
			<div className="flex items-baseline justify-between mb-2">
				<span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
					{currentStep.title}
				</span>
				<span className="field-help">
					Step {currentIndex + 1} of {steps.length}
				</span>
			</div>

			<div className="flex gap-1.5">
				{steps.map((step, index) => {
					const isComplete = index < currentIndex;
					const isActive = index === currentIndex;

					return (
						<div
							key={step.id}
							className="h-1 flex-1 rounded-full overflow-hidden"
							style={{ backgroundColor: "var(--color-border)" }}>
							<div
								className="h-full rounded-full transition-all duration-300 ease-in-out"
								style={{
									width: isComplete ? "100%" : isActive ? "50%" : "0%",
									backgroundColor: "var(--color-accent)",
								}}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
