import { useState } from "react";
import { Controller } from "react-hook-form";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { FieldComponentProps } from "../types/form";
import { resolveOptions } from "../engine/optionsResolver";

export default function TagInput({ field, control }: FieldComponentProps) {
	const [inputValue, setInputValue] = useState("");
	const options = resolveOptions(field);

	return (
		<Controller
			name={field.name}
			control={control}
			defaultValue={[]}
			render={({ field: { value, onChange } }) => {
				const tags = Array.isArray(value) ? (value as string[]) : [];

				const addTag = (tag: string) => {
					const clean = tag.trim();
					if (!clean || tags.includes(clean)) return;
					onChange([...tags, clean]);
					setInputValue("");
				};

				const removeTag = (tag: string) => {
					onChange(tags.filter((t) => t !== tag));
				};

				const suggestions = options.filter(
					(option) =>
						!tags.includes(option.value) &&
						option.label.toLowerCase().includes(inputValue.toLowerCase()) &&
						inputValue.length > 0
				);

				return (
					<div>
						<div className="flex flex-wrap gap-2 mb-2">
							{tags.map((tag) => (
								<span
									key={tag}
									className="choice-card-small choice-card-selected !cursor-default"
									style={{ display: "inline-flex" }}>
									{tag}
									<button type="button" onClick={() => removeTag(tag)}>
										<XMarkIcon className="w-3.5 h-3.5" />
									</button>
								</span>
							))}
						</div>

						<input
							type="text"
							value={inputValue}
							placeholder={field.placeholder ?? "Type and press Enter"}
							className="input-field"
							onChange={(e) => setInputValue(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									addTag(inputValue);
								}
							}}
						/>

						{suggestions.length > 0 && (
							<div className="flex flex-wrap gap-2 mt-2">
								{suggestions.map((option) => (
									<button
										type="button"
										key={option.value}
										onClick={() => addTag(option.label)}
										className="choice-card-small">
										{option.label}
									</button>
								))}
							</div>
						)}

						{field.allowCreate && inputValue && suggestions.length === 0 && (
							<p className="field-help">Press Enter to add "{inputValue}" as a new skill</p>
						)}
					</div>
				);
			}}
		/>
	);
}
