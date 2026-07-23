import type { FormStep } from "../types/form";

interface StepperProps {
	steps: FormStep[];
	currentIndex: number;
}

export default function Stepper({ steps, currentIndex }: StepperProps) {
	return (
		<div className="stepper">
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

				const connectorClass = isComplete
					? "step-connector step-connector-complete"
					: "step-connector step-connector-upcoming";

				return (
					<div key={step.id} className="flex items-start flex-1 last:flex-none">
						<div className="flex flex-col items-center gap-1.5 shrink-0">
							<div className={circleClass}>{isComplete ? <CheckIcon /> : index + 1}</div>
							<span className={labelClass}>{step.title}</span>
						</div>

						{!isLast && <div className={connectorClass} style={{ marginTop: 17 }} />}
					</div>
				);
			})}
		</div>
	);
}

function CheckIcon() {
	return (
		<svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
