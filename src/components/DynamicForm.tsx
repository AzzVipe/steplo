import { FormProvider } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useFormEngine } from "../hooks/useFormEngine";
import FieldRenderer from "../Fields";
import StepperRenderer from "./steppers";
import { useStepperStyle } from "../stepper/useStepperStyle";
import type {
	FormConfig,
	FormValues,
	FormStep,
	StepDirection,
} from "../types/form";

const slideVariants = {
	enter: (direction: StepDirection) => ({
		x: direction === "forward" ? 32 : -32,
		opacity: 0,
	}),
	center: { x: 0, opacity: 1 },
	exit: (direction: StepDirection) => ({
		x: direction === "forward" ? -32 : 32,
		opacity: 0,
	}),
};

interface DynamicFormProps {
	config: FormConfig;
	onSubmit?: (values: FormValues) => void;
	onStepChange?: (
		step: FormStep,
		direction: StepDirection,
		values: FormValues
	) => void;
}

export default function DynamicForm({
	config,
	onSubmit,
	onStepChange,
}: DynamicFormProps) {
	const engine = useFormEngine(config, { onSubmit, onStepChange });
	const { stepperStyle } = useStepperStyle();

	const {
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
		steps,
		register,
		control,
		formState: { errors },
	} = engine;

	const progress = Math.round(((stepIndex + 1) / steps.length) * 100);

	if (isSubmitted) {
		return (
			<FormProvider {...engine}>
				<div className="form-shell">
					<div className="form-card flex flex-col items-center text-center py-12">
						<div className="step-circle step-circle-complete w-14 h-14 mb-4">
							<CheckIcon />
						</div>
						<h2 className="form-card-title">Form submitted</h2>
						<p className="field-help max-w-sm mt-1 mb-6">
							This is a demo of the framework - nothing was actually sent
							anywhere. In a real app, the onSubmit handler you pass to
							DynamicForm is where you'd call your API.
						</p>
						<button
							type="button"
							className="btn btn-secondary"
							onClick={resetForm}>
							Start over
						</button>
					</div>
				</div>
			</FormProvider>
		);
	}

	return (
		<FormProvider {...engine}>
			<div className="form-shell">
				<div className="form-card">
					<StepperRenderer
						style={stepperStyle}
						steps={steps}
						currentIndex={stepIndex}
					/>

					<div className="progress-track">
						<div className="progress-fill" style={{ width: `${progress}%` }} />
					</div>

					<form onSubmit={submit} noValidate>
						<AnimatePresence mode="wait" custom={direction}>
							<motion.div
								key={currentStep.id}
								custom={direction}
								variants={slideVariants}
								initial="enter"
								animate="center"
								exit="exit"
								transition={{ duration: 0.22, ease: "easeInOut" }}>
								<h2 className="form-card-title">{currentStep.title}</h2>

								{visibleFields.map((field) => (
									<FieldRenderer
										key={field.name}
										field={field}
										register={register}
										control={control}
										error={errors[field.name]}
									/>
								))}
							</motion.div>
						</AnimatePresence>

						<div className="flex gap-3 mt-6">
							{!isFirstStep && (
								<button
									type="button"
									className="btn btn-secondary"
									onClick={goBack}
									disabled={isSubmitting}>
									Previous
								</button>
							)}
							{!isLastStep && (
								<button
									type="button"
									className="btn btn-primary ml-auto"
									onClick={goNext}>
									Next
								</button>
							)}
							{isLastStep && (
								<button
									type="submit"
									className="btn btn-primary ml-auto"
									disabled={isSubmitting}>
									{isSubmitting ? (
										<>
											<Spinner />
											Submitting...
										</>
									) : (
										"Submit"
									)}
								</button>
							)}
						</div>
					</form>
				</div>
			</div>
		</FormProvider>
	);
}

function CheckIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 20 20"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
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

function Spinner() {
	return (
		<svg
			className="animate-spin"
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<circle
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="3"
				strokeOpacity="0.25"
			/>
			<path
				d="M22 12a10 10 0 0 0-10-10"
				stroke="currentColor"
				strokeWidth="3"
				strokeLinecap="round"
			/>
		</svg>
	);
}
