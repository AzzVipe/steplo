import { Controller } from "react-hook-form";
import type { FieldComponentProps } from "../types/form";
import { FieldIcon } from "../engine/iconRegistry";

export default function ChoiceChip({ field, control }: FieldComponentProps) {
	return (
		<Controller
			name={field.name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<div className="flex gap-2">
					{field.options?.map((option) => {
						const selected = value === option.value;
						return (
							<button
								type="button"
								key={option.value}
								onClick={() => onChange(option.value)}
								className={`choice-card-small flex-1 ${selected ? "choice-card-selected" : ""}`}>
								{option.icon && <FieldIcon name={option.icon} className="w-4 h-4" />}
								<span>{option.label}</span>
							</button>
						);
					})}
				</div>
			)}
		/>
	);
}
