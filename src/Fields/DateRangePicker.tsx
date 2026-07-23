import { Controller } from "react-hook-form";
import type { FieldComponentProps, DateRangeValue } from "../types/form";

export default function DateRangePicker({ field, control, error }: FieldComponentProps) {
	return (
		<Controller
			name={field.name}
			control={control}
			defaultValue={{ start: "", end: "" }}
			render={({ field: { value, onChange } }) => {
				const range = (value as DateRangeValue) ?? { start: "", end: "" };

				return (
					<div className="grid grid-cols-2 gap-3">
						<div>
							<span className="field-help block mb-1">Start</span>
							<input
								type="date"
								value={range.start ?? ""}
								onChange={(e) => onChange({ ...range, start: e.target.value })}
								className={`input-field ${error ? "input-field-error" : ""}`}
							/>
						</div>
						<div>
							<span className="field-help block mb-1">End</span>
							<input
								type="date"
								value={range.end ?? ""}
								min={range.start || undefined}
								onChange={(e) => onChange({ ...range, end: e.target.value })}
								className={`input-field ${error ? "input-field-error" : ""}`}
							/>
						</div>
					</div>
				);
			}}
		/>
	);
}
