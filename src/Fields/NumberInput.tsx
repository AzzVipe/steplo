import type { FieldComponentProps } from "../types/form";

export default function NumberInput({ field, register, error }: FieldComponentProps) {
	return (
		<input
			id={field.name}
			type="number"
			placeholder={field.placeholder}
			min={field.validation?.min}
			max={field.validation?.max}
			className={`input-field ${error ? "input-field-error" : ""}`}
			{...register(field.name)}
		/>
	);
}
