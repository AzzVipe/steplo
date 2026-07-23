import { Controller } from "react-hook-form";
import type { FieldComponentProps } from "../types/form";
import { FieldIcon } from "../engine/iconRegistry";

export default function ChoiceCard({ field, control }: FieldComponentProps) {
	return (
		<Controller
			name={field.name}
			control={control}
			render={({ field: { value, onChange } }) => (
				<div>
					<div className="grid grid-cols-2 gap-3">
						{field.options?.map((option) => {
							const selected = value === option.value;
							return (
								<button
									type="button"
									key={option.value}
									onClick={() => onChange(option.value)}
									className={`choice-card ${selected ? "choice-card-selected" : ""}`}>
									{option.icon && <FieldIcon name={option.icon} />}
									<span>{option.label}</span>
								</button>
							);
						})}
					</div>

					{typeof value === "string" && field.answerHelp?.[value] && (
						<p className="field-help">{field.answerHelp[value]}</p>
					)}
				</div>
			)}
		/>
	);
}
