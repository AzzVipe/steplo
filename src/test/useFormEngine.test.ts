import { describe, it, expect, vi } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { useFormEngine } from "../hooks/useFormEngine";
import type { FormConfig } from "../types/form";

const testConfig: FormConfig = {
	meta: { id: "test-form", title: "Test Form", version: 1 },
	steps: [
		{ id: "one", title: "Step One" },
		{ id: "two", title: "Step Two" },
		{ id: "three", title: "Step Three" },
		{ id: "four", title: "Step Four" },
	],
	fields: [
		{
			name: "requiredField",
			step: "one",
			type: "text",
			label: "Required",
			validation: { required: true },
		},
		{
			name: "skipChoice",
			step: "two",
			type: "select",
			label: "Skip?",
			options: [
				{ value: "yes", label: "Yes" },
				{ value: "no", label: "No" },
			],
			skipStepIf: { field: "skipChoice", equals: "yes", goTo: "four" },
		},
	],
};

describe("useFormEngine", () => {
	it("blocks goNext when the current step's required field is empty", async () => {
		const { result } = renderHook(() => useFormEngine(testConfig, {}));

		expect(result.current.stepIndex).toBe(0);

		await act(async () => {
			await result.current.goNext();
		});

		expect(result.current.stepIndex).toBe(0);
	});

	it("advances to the next step once the required field is filled", async () => {
		const onStepChange = vi.fn();
		const { result } = renderHook(() =>
			useFormEngine(testConfig, { onStepChange })
		);

		act(() => {
			result.current.setValue("requiredField", "Azmat");
		});

		await act(async () => {
			await result.current.goNext();
		});

		await waitFor(() => expect(result.current.stepIndex).toBe(1));
		expect(result.current.direction).toBe("forward");
		expect(onStepChange).toHaveBeenCalledWith(
			testConfig.steps[1],
			"forward",
			expect.objectContaining({ requiredField: "Azmat" })
		);
	});

	it("jumps directly to the skipStepIf target when its condition matches", async () => {
		const { result } = renderHook(() => useFormEngine(testConfig, {}));

		act(() => {
			result.current.setValue("requiredField", "Azmat");
		});
		await act(async () => {
			await result.current.goNext();
		});
		await waitFor(() => expect(result.current.stepIndex).toBe(1));

		act(() => {
			result.current.setValue("skipChoice", "yes");
		});
		await act(async () => {
			await result.current.goNext();
		});

		await waitFor(() => expect(result.current.currentStep.id).toBe("four"));
	});

	it("advances to the normal next step when the skipStepIf condition doesn't match", async () => {
		const { result } = renderHook(() => useFormEngine(testConfig, {}));

		act(() => {
			result.current.setValue("requiredField", "Azmat");
		});
		await act(async () => {
			await result.current.goNext();
		});
		await waitFor(() => expect(result.current.stepIndex).toBe(1));

		act(() => {
			result.current.setValue("skipChoice", "no");
		});
		await act(async () => {
			await result.current.goNext();
		});

		await waitFor(() => expect(result.current.currentStep.id).toBe("three"));
		expect(result.current.stepIndex).toBe(2);
	});

	it("goBack does not require validation and sets direction to backward", async () => {
		const { result } = renderHook(() => useFormEngine(testConfig, {}));

		act(() => {
			result.current.setValue("requiredField", "Azmat");
		});
		await act(async () => {
			await result.current.goNext();
		});
		await waitFor(() => expect(result.current.stepIndex).toBe(1));

		act(() => {
			result.current.goBack();
		});

		await waitFor(() => expect(result.current.stepIndex).toBe(0));
		expect(result.current.direction).toBe("backward");
	});
});
