import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline";
import { useTheme } from "../theme/useTheme";
import { THEME_OPTIONS, type ThemeOption } from "../theme/themes";

function Swatch({ option, size = 22 }: { option: ThemeOption; size?: number }) {
	return (
		<span
			className="relative inline-block shrink-0"
			style={{ width: size, height: size }}>
			<span
				className="absolute inset-0 rounded-full border"
				style={{ backgroundColor: option.swatch.surface, borderColor: option.swatch.accent + "33" }}
			/>
			<span
				className="absolute rounded-full border"
				style={{
					backgroundColor: option.swatch.card,
					borderColor: option.swatch.accent + "33",
					width: size * 0.62,
					height: size * 0.62,
					top: size * 0.06,
					left: size * 0.06,
				}}
			/>
			<span
				className="absolute rounded-full"
				style={{
					backgroundColor: option.swatch.accent,
					width: size * 0.34,
					height: size * 0.34,
					bottom: size * 0.02,
					right: size * 0.02,
				}}
			/>
		</span>
	);
}

export default function ThemeSelector() {
	const { theme, setTheme } = useTheme();
	const [open, setOpen] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	const activeOption = THEME_OPTIONS.find((option) => option.id === theme) ?? THEME_OPTIONS[0];
	const lightOptions = THEME_OPTIONS.filter((option) => option.mode === "light");
	const darkOptions = THEME_OPTIONS.filter((option) => option.mode === "dark");

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

	const renderGroup = (label: string, options: ThemeOption[]) => (
		<div>
			<p className="field-help px-1 mb-1.5 uppercase tracking-wide" style={{ fontSize: 10 }}>
				{label}
			</p>
			<div className="flex flex-col gap-0.5">
				{options.map((option) => {
					const isActive = option.id === theme;
					return (
						<button
							key={option.id}
							type="button"
							onClick={() => {
								setTheme(option.id);
								setOpen(false);
							}}
							className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors"
							style={{
								backgroundColor: isActive ? "var(--color-accent-soft)" : "transparent",
								color: isActive ? "var(--color-accent)" : "var(--color-text)",
							}}>
							<Swatch option={option} size={20} />
							<span className="flex-1 text-left">{option.label}</span>
							{isActive && <CheckIcon className="w-4 h-4" />}
						</button>
					);
				})}
			</div>
		</div>
	);

	return (
		<div className="relative" ref={containerRef}>
			<button
				type="button"
				onClick={() => setOpen((v) => !v)}
				className="btn btn-secondary"
				style={{ paddingLeft: 10 }}>
				<Swatch option={activeOption} size={18} />
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
						className="absolute left-0 mt-2 z-50 w-56 p-2 flex flex-col gap-3"
						style={{
							backgroundColor: "var(--color-card)",
							border: "1px solid var(--color-border)",
							borderRadius: "var(--radius-lg)",
							boxShadow: "0 12px 32px -8px rgba(0,0,0,0.25)",
						}}>
						{renderGroup("Light", lightOptions)}
						{renderGroup("Dark", darkOptions)}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
