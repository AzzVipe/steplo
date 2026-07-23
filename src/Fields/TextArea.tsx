import type { FieldComponentProps } from "../types/form";

export default function TextArea({ field, register, error }: FieldComponentProps) {
	return (
		<textarea
			id={field.name}
			placeholder={field.placeholder}
			rows={4}
			className={`textarea-field ${error ? "input-field-error" : ""}`}
			{...register(field.name)}
		/>
	);
}
