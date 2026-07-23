import { describe, it, expect } from "vitest";
import { isFieldVisible, buildSchemaFor } from "../engine/buildFormZodSchema";
import { formConfig } from "../config/form";
import type { FormField } from "../types/form";

describe("isFieldVisible", () => {
	it("is visible when the field has no showIf", () => {
		const field = { name: "a" } as FormField;
		expect(isFieldVisible(field, {})).toBe(true);
	});

	it("respects an equals condition", () => {
		const field = {
			showIf: { field: "hasBranding", equals: "yes" },
		} as FormField;
		expect(isFieldVisible(field, { hasBranding: "yes" })).toBe(true);
		expect(isFieldVisible(field, { hasBranding: "no" })).toBe(false);
		expect(isFieldVisible(field, {})).toBe(false);
	});

	it("respects a notEquals condition", () => {
		const field = { showIf: { field: "plan", notEquals: "free" } } as FormField;
		expect(isFieldVisible(field, { plan: "pro" })).toBe(true);
		expect(isFieldVisible(field, { plan: "free" })).toBe(false);
	});

	it("respects an in condition", () => {
		const field = {
			showIf: { field: "country", in: ["US", "UK"] },
		} as FormField;
		expect(isFieldVisible(field, { country: "US" })).toBe(true);
		expect(isFieldVisible(field, { country: "FR" })).toBe(false);
	});

	it("respects an exists condition, both directions", () => {
		const wantsPresent = {
			showIf: { field: "email", exists: true },
		} as FormField;
		const wantsAbsent = {
			showIf: { field: "email", exists: false },
		} as FormField;

		expect(isFieldVisible(wantsPresent, { email: "a@b.com" })).toBe(true);
		expect(isFieldVisible(wantsPresent, { email: "" })).toBe(false);
		expect(isFieldVisible(wantsAbsent, { email: "" })).toBe(true);
		expect(isFieldVisible(wantsAbsent, { email: "a@b.com" })).toBe(false);
	});
});

describe("buildSchemaFor - basic required/optional rules", () => {
	it("fails a required text field when empty, passes when filled", () => {
		const fields: FormField[] = [
			{
				name: "clientName",
				step: "s1",
				type: "text",
				label: "Name",
				validation: { required: true },
			},
		];
		const schema = buildSchemaFor(fields, {});

		expect(schema.safeParse({ clientName: "" }).success).toBe(false);
		expect(schema.safeParse({ clientName: "Azmat" }).success).toBe(true);
	});

	it("allows an optional field to be missing entirely", () => {
		const fields: FormField[] = [
			{
				name: "companyName",
				step: "s1",
				type: "text",
				label: "Company",
				optional: true,
			},
		];
		const schema = buildSchemaFor(fields, {});

		expect(schema.safeParse({}).success).toBe(true);
		expect(schema.safeParse({ companyName: null }).success).toBe(true);
	});

	it("enforces min/max on a required number field", () => {
		const fields: FormField[] = [
			{
				name: "hours",
				step: "s1",
				type: "number",
				label: "Hours",
				validation: { required: true, min: 1, max: 160 },
			},
		];
		const schema = buildSchemaFor(fields, {});

		expect(schema.safeParse({ hours: 200 }).success).toBe(false);
		expect(schema.safeParse({ hours: 0 }).success).toBe(false);
		expect(schema.safeParse({ hours: 40 }).success).toBe(true);
	});

	it("requires at least one selection on a required multi-value field", () => {
		const fields: FormField[] = [
			{
				name: "tools",
				step: "s1",
				type: "chipMultiSelect",
				label: "Tools",
				validation: { required: true },
			},
		];
		const schema = buildSchemaFor(fields, {});

		expect(schema.safeParse({ tools: [] }).success).toBe(false);
		expect(schema.safeParse({ tools: ["slack"] }).success).toBe(true);
	});

	it("does not block validation on a field hidden by showIf, even if marked required", () => {
		const fields: FormField[] = [
			{
				name: "brandAssets",
				step: "s1",
				type: "fileUpload",
				label: "Brand assets",
				showIf: { field: "hasBranding", equals: "yes" },
				validation: { required: true },
			},
		];

		const schema = buildSchemaFor(fields, { hasBranding: "no" });
		expect(schema.safeParse({ hasBranding: "no" }).success).toBe(true);
	});
});

describe("buildSchemaFor - chained conditionals against the real project config", () => {
	const supportFields = formConfig.fields.filter((f) => f.step === "support");

	it("does not require supportHoursPerMonth when support isn't needed at all", () => {
		const values = { needsOngoingSupport: "no" };
		const schema = buildSchemaFor(supportFields, values);
		expect(schema.safeParse(values).success).toBe(true);
	});

	it("does not require supportHoursPerMonth for a non-premium tier", () => {
		const values = { needsOngoingSupport: "yes", supportTier: "basic" };
		const schema = buildSchemaFor(supportFields, values);
		expect(schema.safeParse(values).success).toBe(true);
	});

	it("requires supportHoursPerMonth once the premium tier is selected", () => {
		const values = { needsOngoingSupport: "yes", supportTier: "premium" };
		const schema = buildSchemaFor(supportFields, values);
		expect(schema.safeParse(values).success).toBe(false);

		const complete = { ...values, supportHoursPerMonth: 20 };
		expect(schema.safeParse(complete).success).toBe(true);
	});
});
