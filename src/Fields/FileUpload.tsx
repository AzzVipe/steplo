import { useRef } from "react";
import { Controller } from "react-hook-form";
import type { FieldComponentProps } from "../types/form";

export default function FileUpload({ field, control }: FieldComponentProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<Controller
			name={field.name}
			control={control}
			defaultValue={field.multiple ? [] : null}
			render={({ field: { value, onChange } }) => {
				const files: File[] = field.multiple
					? Array.isArray(value)
						? (value as File[])
						: []
					: value
					? [value as File]
					: [];

				const handleFiles = (fileList: FileList) => {
					const picked = Array.from(fileList);
					onChange(field.multiple ? picked : picked[0] ?? null);
				};

				return (
					<div>
						<div
							className="file-drop"
							onClick={() => inputRef.current?.click()}
							onDragOver={(e) => e.preventDefault()}
							onDrop={(e) => {
								e.preventDefault();
								handleFiles(e.dataTransfer.files);
							}}>
							<span>{field.placeholder ?? "Click or drag files here"}</span>
							{field.deferable && <span className="field-help">You can add these later</span>}
						</div>

						<input
							ref={inputRef}
							type="file"
							multiple={field.multiple}
							className="hidden"
							onChange={(e) => e.target.files && handleFiles(e.target.files)}
						/>

						{files.length > 0 && (
							<ul className="field-help mt-2">
								{files.map((file, i) => (
									<li key={i}>{file.name}</li>
								))}
							</ul>
						)}
					</div>
				);
			}}
		/>
	);
}
