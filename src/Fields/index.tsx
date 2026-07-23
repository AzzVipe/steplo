import type { FieldComponentProps, FieldType } from "../types/form";
import TextInput from "./TextInput";
import NumberInput from "./NumberInput";
import TextArea from "./TextArea";
import SelectField from "./SelectField";
import LinkedSelectField from "./LinkedSelectField";
import ChoiceCard from "./ChoiceCard";
import ChoiceChip from "./ChoiceChip";
import VisualCardSelect from "./VisualCardSelect";
import ChipMultiSelect from "./ChipMultiSelect";
import TagInput from "./TagInput";
import AddressAutocomplete from "./AddressAutocomplete";
import DateRangePicker from "./DateRangePicker";
import FileUpload from "./FileUpload";

const REGISTRY: Record<FieldType, React.ComponentType<FieldComponentProps>> = {
	text: TextInput,
	number: NumberInput,
	textarea: TextArea,
	select: SelectField,
	linkedSelect: LinkedSelectField,
	choiceCard: ChoiceCard,
	choiceChip: ChoiceChip,
	visualCardSelect: VisualCardSelect,
	chipMultiSelect: ChipMultiSelect,
	tagInput: TagInput,
	addressAutocomplete: AddressAutocomplete,
	dateRangePicker: DateRangePicker,
	fileUpload: FileUpload,
};

export default function FieldRenderer({
	field,
	register,
	control,
	error,
}: FieldComponentProps) {
	const Component = REGISTRY[field.type];

	if (!Component) {
		console.warn(`No component registered for field type: ${field.type}`);
		return null;
	}

	return (
		<div className="field-group">
			<label htmlFor={field.name} className="field-label">
				{field.label}
				{field.optional && (
					<span className="field-help ml-1 inline">
						({field.optionalLabel ?? "optional"})
					</span>
				)}
			</label>

			<Component
				field={field}
				register={register}
				control={control}
				error={error}
			/>

			{error && <p className="field-error">{error.message}</p>}
		</div>
	);
}
