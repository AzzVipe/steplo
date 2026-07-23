import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, CheckIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { useStepperStyle } from "../stepper/useStepperStyle";
import { STEPPER_STYLE_OPTIONS } from "../stepper/stepperStyles";

export default function StepperStyleSelector() {
	const { stepperStyle, setStepperStyle } = useStepperStyle();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const activeOption =
		STEPPER_STYLE_OPTIONS.find((option) => option.id === stepperStyle) ?? STEPPER_STYLE_OPTIONS[0];

	useEffect(() => {
		if (!open) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<div className="relative" ref={containerRef}>
			<button type="button" onClick={() => setOpen((v) => !v)} className="btn btn-secondary">
				<Squares2X2Icon className="w-4 h-4" />
				<span>{activeOption.label}</span>
				<ChevronDownIcon
					className="w-4 h-4 transition-transform"
					style={{ transform: open ? "rotate(180deg)" : "none" }}
				/>
			</button>

			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: -6, scale: 0.98 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: -6, scale: 0.98 }}
						transition={{ duration: 0.15, ease: "easeOut" }}
						className="absolute left-0 mt-2 z-50 w-72 p-2 flex flex-col gap-0.5"
						style={{
							backgroundColor: "var(--color-card)",
							border: "1px solid var(--color-border)",
							borderRadius: "var(--radius-lg)",
							boxShadow: "0 12px 32px -8px rgba(0,0,0,0.25)",
						}}>
						{STEPPER_STYLE_OPTIONS.map((option) => {
							const isActive = option.id === stepperStyle;
							return (
								<button
									key={option.id}
									type="button"
									onClick={() => {
										setStepperStyle(option.id);
										setOpen(false);
									}}
									className="flex items-start gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors"
									style={{
										backgroundColor: isActive ? "var(--color-accent-soft)" : "transparent",
									}}>
									<div className="flex-1">
										<p
											className="text-sm font-medium"
											style={{ color: isActive ? "var(--color-accent)" : "var(--color-text)" }}>
											{option.label}
										</p>
										<p className="field-help mt-0">{option.description}</p>
									</div>
									{isActive && (
										<CheckIcon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
									)}
								</button>
							);
						})}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
