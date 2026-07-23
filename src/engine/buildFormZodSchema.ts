import { z, type ZodTypeAny } from "zod";
import type { FormField, FormValues, FieldType } from "../types/form";

export function isFieldVisible(field: FormField, values: FormValues): boolean {
	if (!field.showIf) return true;

	const {
		field: depName,
		equals,
		notEquals,
		in: inList,
		exists,
	} = field.showIf;
	const depValue = values?.[depName];

	if (equals !== undefined) return depValue === equals;
	if (notEquals !== undefined) return depValue !== notEquals;
	if (inList !== undefined) return inList.includes(depValue as string);
	if (exists !== undefined) {
		const hasValue =
			depValue !== undefined && depValue !== null && depValue !== "";
		return exists ? hasValue : !hasValue;
	}
	return true;
}

const MULTI_VALUE_TYPES: FieldType[] = ["chipMultiSelect", "tagInput"];

function baseSchemaForType(field: FormField): ZodTypeAny {
	const v = field.validation ?? {};

	switch (field.type) {
		case "number":
			return z.coerce
				.number({ invalid_type_error: `${field.label} must be a number` })
				.min(v.min ?? -Infinity, v.message)
				.max(v.max ?? Infinity, v.message);

		case "chipMultiSelect":
		case "tagInput":
			return z.array(z.string());

		case "fileUpload":
			return z.any();

		case "dateRangePicker":
			return z.object({
				start: z.string().min(1, "Start date required"),
				end: z.string().min(1, "End date required"),
			});

		case "text":
		case "textarea":
		case "select":
		case "linkedSelect":
		case "choiceCard":
		case "choiceChip":
		case "visualCardSelect":
		case "addressAutocomplete": {
			let s = z.string();
			if (v.minLength)
				s = s.min(
					v.minLength,
					v.message ?? `Must be at least ${v.minLength} characters`
				);
			if (v.maxLength) s = s.max(v.maxLength, v.message);
			if (v.pattern)
				s = s.regex(new RegExp(v.pattern), v.message ?? "Invalid format");
			return s;
		}

		default: {
			const _exhaustive: never = field.type;
			throw new Error(`Unhandled field type: ${_exhaustive}`);
		}
	}
}

function applyRequired(schema: ZodTypeAny, field: FormField): ZodTypeAny {
	const v = field.validation ?? {};

	if (!v.required) {
		return schema.optional().nullable();
	}

	if (MULTI_VALUE_TYPES.includes(field.type)) {
		return (schema as z.ZodArray<z.ZodString>).min(
			1,
			v.message ?? `${field.label} is required`
		);
	}

	if (
		field.type === "number" ||
		field.type === "dateRangePicker" ||
		field.type === "fileUpload"
	) {
		return schema;
	}

	return (schema as z.ZodString).min(
		1,
		v.message ?? `${field.label} is required`
	);
}

export function buildSchemaFor(fields: FormField[], values: FormValues) {
	const shape: Record<string, ZodTypeAny> = {};

	fields.forEach((field) => {
		if (!isFieldVisible(field, values)) {
			shape[field.name] = z.any().optional();
			return;
		}

		shape[field.name] = applyRequired(baseSchemaForType(field), field);
	});

	return z.object(shape);
}
