import type { FieldComponentProps } from "../types/form";
import { resolveOptions } from "../engine/optionsResolver";

export default function SelectField({ field, register, error }: FieldComponentProps) {
	const options = resolveOptions(field);

	return (
		<select
			id={field.name}
			defaultValue=""
			className={`select-field ${error ? "input-field-error" : ""}`}
			{...register(field.name)}>
			<option value="" disabled>
				{field.placeholder ?? "Select an option"}
			</option>
			{options.map((option) => (
				<option key={option.value} value={option.value}>
					{option.label}
				</option>
			))}
		</select>
	);
}
