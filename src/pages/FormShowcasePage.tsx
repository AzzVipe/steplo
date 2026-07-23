import DynamicForm from "../components/DynamicForm";
import type { FormConfig, FormValues, FormStep, StepDirection } from "../types/form";

interface FormShowcasePageProps {
	config: FormConfig;
}

export default function FormShowcasePage({ config }: FormShowcasePageProps) {
	const handleStepChange = (step: FormStep, direction: StepDirection, values: FormValues) => {
		console.log(`[${config.meta.id}] step-change -> ${step.id} (${direction})`, values);
	};

	const handleSubmit = (values: FormValues) => {
		console.log(`[${config.meta.id}] submit`, values);
	};

	return <DynamicForm config={config} onStepChange={handleStepChange} onSubmit={handleSubmit} />;
}
