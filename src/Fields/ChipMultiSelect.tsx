import { Controller } from "react-hook-form";
import type { FieldComponentProps } from "../types/form";
import { FieldIcon } from "../engine/iconRegistry";
import { resolveOptions } from "../engine/optionsResolver";

export default function ChipMultiSelect({ field, control }: FieldComponentProps) {
	const options = resolveOptions(field);

	return (
		<Controller
			name={field.name}
			control={control}
			defaultValue={[]}
			render={({ field: { value, onChange } }) => {
				const selectedValues = Array.isArray(value) ? (value as string[]) : [];

				const toggle = (optionValue: string) => {
					if (selectedValues.includes(optionValue)) {
						onChange(selectedValues.filter((v) => v !== optionValue));
					} else {
						onChange([...selectedValues, optionValue]);
					}
				};

				return (
					<div className="grid grid-cols-2 gap-3">
						{options.map((option) => {
							const selected = selectedValues.includes(option.value);
							return (
								<button
									type="button"
									key={option.value}
									onClick={() => toggle(option.value)}
									className={`choice-card-small ${selected ? "choice-card-selected" : ""}`}>
									{option.icon && <FieldIcon name={option.icon} className="w-4 h-4" />}
									<span>{option.label}</span>
								</button>
							);
						})}
					</div>
				);
			}}
		/>
	);
}
