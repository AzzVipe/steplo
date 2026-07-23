import type { FieldComponentProps } from "../types/form";

const MOCK_SUGGESTIONS = [
	"221B Baker Street, London",
	"350 Fifth Avenue, New York",
	"1600 Amphitheatre Parkway, Mountain View",
	"48 Marine Drive, Mumbai",
];

export default function AddressAutocomplete({
	field,
	register,
	error,
}: FieldComponentProps) {
	return (
		<>
			<input
				id={field.name}
				type="text"
				list={`${field.name}-suggestions`}
				placeholder={field.placeholder}
				className={`input-field ${error ? "input-field-error" : ""}`}
				{...register(field.name)}
			/>
			<datalist id={`${field.name}-suggestions`}>
				{MOCK_SUGGESTIONS.map((address) => (
					<option key={address} value={address} />
				))}
			</datalist>
		</>
	);
}
