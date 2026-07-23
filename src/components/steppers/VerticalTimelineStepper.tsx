import type { StepperComponentProps } from "../../types/form";

export default function VerticalTimelineStepper({ steps, currentIndex }: StepperComponentProps) {
	return (
		<div className="flex flex-col mb-6">
			{steps.map((step, index) => {
				const isComplete = index < currentIndex;
				const isActive = index === currentIndex;
				const isLast = index === steps.length - 1;

				const circleClass = isComplete
					? "step-circle step-circle-complete"
					: isActive
					? "step-circle step-circle-active"
					: "step-circle step-circle-upcoming";

				const labelClass = isActive ? "step-label step-label-active" : "step-label";

				return (
					<div key={step.id} className="flex gap-3">
						<div className="flex flex-col items-center">
							<div className={circleClass} style={{ width: 28, height: 28, fontSize: 12 }}>
								{isComplete ? <CheckIcon /> : index + 1}
							</div>
							{!isLast && (
								<div
									className="w-0.5 flex-1 my-1"
									style={{
										minHeight: 20,
										backgroundColor: isComplete ? "var(--color-success)" : "var(--color-border)",
									}}
								/>
							)}
						</div>
						<span className={labelClass} style={{ marginTop: 3, textAlign: "left" }}>
							{step.title}
						</span>
					</div>
				);
			})}
		</div>
	);
}

function CheckIcon() {
	return (
		<svg width="12" height="12" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M4 10.5L8 14.5L16 6"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
