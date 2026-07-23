import { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { buildSchemaFor, isFieldVisible } from "../engine/buildFormZodSchema";
import type {
	FormConfig,
	FormStep,
	FormValues,
	StepDirection,
} from "../types/form";

interface UseFormEngineOptions {
	onSubmit?: (values: FormValues) => void;
	onStepChange?: (
		step: FormStep,
		direction: StepDirection,
		values: FormValues
	) => void;
}

export function useFormEngine(
	config: FormConfig,
	{ onSubmit, onStepChange }: UseFormEngineOptions
) {
	const [stepIndex, setStepIndex] = useState(0);
	const [direction, setDirection] = useState<StepDirection>("forward");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const currentStep = config.steps[stepIndex];

	const methods = useForm<FormValues>({
		mode: "onBlur",
		resolver: async (values, context, options) => {
			const schema = buildSchemaFor(config.fields, values);
			return zodResolver(schema)(values, context, options);
		},
	});

	const { trigger, handleSubmit, watch, getValues, reset } = methods;
	const values = watch();

	const visibleFields = useMemo(
		() =>
			config.fields.filter(
				(f) => f.step === currentStep.id && isFieldVisible(f, values)
			),
		[config.fields, currentStep.id, values]
	);

	const isFirstStep = stepIndex === 0;
	const isLastStep = stepIndex === config.steps.length - 1;

	const emitStepChange = useCallback(
		(nextIndex: number, dir: StepDirection) => {
			onStepChange?.(config.steps[nextIndex], dir, getValues());
		},
		[config.steps, getValues, onStepChange]
	);

	const goNext = useCallback(async () => {
		const fieldNames = visibleFields.map((f) => f.name);
		const valid = await trigger(fieldNames as never[]);
		if (!valid) return;

		const currentValues = getValues();

		const skipField = config.fields.find(
			(f) => f.step === currentStep.id && f.skipStepIf
		);

		if (skipField?.skipStepIf) {
			const { field: depName, equals, goTo } = skipField.skipStepIf;
			if (currentValues[depName] === equals) {
				const targetIndex = config.steps.findIndex((s) => s.id === goTo);
				if (targetIndex !== -1) {
					setDirection("forward");
					setStepIndex(targetIndex);
					emitStepChange(targetIndex, "forward");
					return;
				}
			}
		}

		const nextIndex = Math.min(stepIndex + 1, config.steps.length - 1);
		setDirection("forward");
		setStepIndex(nextIndex);
		emitStepChange(nextIndex, "forward");
	}, [
		visibleFields,
		trigger,
		getValues,
		config,
		currentStep.id,
		stepIndex,
		emitStepChange,
	]);

	const goBack = useCallback(() => {
		const prevIndex = Math.max(stepIndex - 1, 0);
		setDirection("backward");
		setStepIndex(prevIndex);
		emitStepChange(prevIndex, "backward");
	}, [stepIndex, emitStepChange]);

	const submit = handleSubmit(async (data) => {
		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 1200));
		setIsSubmitting(false);
		setIsSubmitted(true);
		onSubmit?.(data);
	});

	const resetForm = useCallback(() => {
		reset();
		setStepIndex(0);
		setDirection("forward");
		setIsSubmitted(false);
	}, [reset]);

	return {
		...methods,
		stepIndex,
		direction,
		currentStep,
		visibleFields,
		isFirstStep,
		isLastStep,
		isSubmitting,
		isSubmitted,
		goNext,
		goBack,
		submit,
		resetForm,
		steps: config.steps,
	};
}
