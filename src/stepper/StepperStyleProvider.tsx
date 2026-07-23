import { useState, type ReactNode } from "react";
import { DEFAULT_STEPPER_STYLE, type StepperStyleId } from "./stepperStyles";
import { StepperStyleContext } from "./stepperStyleContext";

export function StepperStyleProvider({ children }: { children: ReactNode }) {
	const [stepperStyle, setStepperStyle] = useState<StepperStyleId>(DEFAULT_STEPPER_STYLE);

	return (
		<StepperStyleContext.Provider value={{ stepperStyle, setStepperStyle }}>
			{children}
		</StepperStyleContext.Provider>
	);
}
