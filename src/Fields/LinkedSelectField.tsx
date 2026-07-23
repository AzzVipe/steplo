import { useEffect, useRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import type { FieldComponentProps, FormValues } from "../types/form";
import { resolveDependentOptions } from "../engine/optionsResolver";

export default function LinkedSelectField({
	field,
	control,
	error,
}: FieldComponentProps) {
	const { watch, setValue } = useFormContext<FormValues>();
	const parentValue = field.dependsOn ? watch(field.dependsOn) : undefined;
	const sourceKey = field.optionsSource?.split(":")[1];
	const options = resolveDependentOptions(sourceKey, parentValue);

	const previousParentValue = useRef(parentValue);

	useEffect(() => {
		if (previousParentValue.current !== parentValue) {
			setValue(field.name, "");
			previousParentValue.current = parentValue;
		}
	}, [parentValue, field.name, setValue]);

	return (
		<Controller
			name={field.name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<select
					id={field.name}
					value={(value as string) ?? ""}
					disabled={!parentValue}
					onChange={(e) => onChange(e.target.value)}
					className={`select-field ${error ? "input-field-error" : ""}`}>
					<option value="" disabled>
						{parentValue ? "Select an option" : "Select the parent field first"}
					</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
				</select>
			)}
		/>
	);
}
