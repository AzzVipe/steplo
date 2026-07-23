import type { FieldComponentProps } from "../types/form";

export default function TextInput({ field, register, error }: FieldComponentProps) {
	return (
		<input
			id={field.name}
			type="text"
			placeholder={field.placeholder}
			className={`input-field ${error ? "input-field-error" : ""}`}
			{...register(field.name)}
		/>
	);
}
