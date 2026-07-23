import { Controller } from "react-hook-form";
import type { FieldComponentProps } from "../types/form";
import { FieldIcon } from "../engine/iconRegistry";

export default function VisualCardSelect({ field, control }: FieldComponentProps) {
	return (
		<Controller
			name={field.name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<div className="grid grid-cols-2 gap-3">
					{field.options?.map((option) => {
						const selected = value === option.value;
						return (
							<button
								type="button"
								key={option.value}
								onClick={() => onChange(option.value)}
								className={`choice-card items-start text-left ${
									selected ? "choice-card-selected" : ""
								}`}>
								{option.icon && <FieldIcon name={option.icon} className="w-6 h-6" />}
								<span className="font-medium">{option.label}</span>
								{option.description && (
									<span className="field-help mt-0">{option.description}</span>
								)}
							</button>
						);
					})}
				</div>
			)}
		/>
	);
}
