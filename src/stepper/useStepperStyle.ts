import { useContext } from "react";
import { StepperStyleContext } from "./stepperStyleContext";

export function useStepperStyle() {
	const ctx = useContext(StepperStyleContext);
	if (!ctx) throw new Error("useStepperStyle must be used within a StepperStyleProvider");
	return ctx;
}
