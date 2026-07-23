import { createContext } from "react";
import type { StepperStyleId } from "./stepperStyles";

export interface StepperStyleContextValue {
	stepperStyle: StepperStyleId;
	setStepperStyle: (style: StepperStyleId) => void;
}

export const StepperStyleContext = createContext<StepperStyleContextValue | null>(null);
