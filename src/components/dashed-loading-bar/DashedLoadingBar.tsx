import { animated, useSpring } from "@react-spring/web";

export interface DashedLoadingBarProps {
	/** Current progress */
	progress?: number;
	/** Target progress */
	progressTarget?: number;
	/** Size of the loading bar */
	size?: "small" | "medium" | "large";
	/** Color of the bars */
	color?: string;
	/** Color of the completed bar */
	completedColor?: string;
}

/** Force a color to have given opacity. */
function withOpacity(color: string, opacity: number): string {
	const o = Math.max(0, Math.min(1, opacity));

	// HEX variants
	let hex = color.trim().replace(/^#/, "");
	if (/^[0-9a-f]{3,4}$/i.test(hex)) {
		// expand #RGB or #RGBA
		hex = hex
			.split("")
			.map((c) => c + c)
			.join("");
	}
	if (/^[0-9a-f]{6}$/i.test(hex) || /^[0-9a-f]{8}$/i.test(hex)) {
		const base = hex.slice(0, 6); // drop existing alpha if present
		const a = Math.round(o * 255)
			.toString(16)
			.padStart(2, "0");
		return `#${base}${a}`;
	}

	// rgb/rgba(...)
	const rgb = color.match(
		/^rgba?\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})(?:\s*,\s*([0-9.]+))?\s*\)$/i
	);
	if (rgb) {
		const r = Math.min(255, parseInt(rgb[1], 10));
		const g = Math.min(255, parseInt(rgb[2], 10));
		const b = Math.min(255, parseInt(rgb[3], 10));
		return `rgba(${r}, ${g}, ${b}, ${o})`;
	}

	// hsl/hsla(...)
	const hsl = color.match(
		/^hsla?\(\s*([0-9.]+)(deg|rad|turn)?\s*,\s*([0-9.]+)%\s*,\s*([0-9.]+)%(?:\s*,\s*([0-9.]+))?\s*\)$/i
	);
	if (hsl) {
		const h = hsl[1] + (hsl[2] ?? ""); // keep unit if any
		const s = parseFloat(hsl[3]);
		const l = parseFloat(hsl[4]);
		return `hsla(${h}, ${s}%, ${l}%, ${o})`;
	}

	// Fallback for named colors or anything else: CSS color-mix (modern browsers)
	return `color-mix(in srgb, ${color} ${o * 100}%, transparent)`;
}

/** Dashed loading bar component. Display the current progress % depending on the progress and target progress */
export const DashedLoadingBar = ({
	progress = 0,
	progressTarget = 100,
	size = "medium",
	color = "#000000",
	completedColor = "#5abb5d",
}: DashedLoadingBarProps) => {
	const percent = progressTarget > 0 ? (progress / progressTarget) * 100 : 0;
	const roundedPercent = Math.min(Math.round(percent * 100) / 100, 100);
	const width =
		size === "small" ? "w-xs" : size === "large" ? "w-xl" : "w-md";
	const currentColor = percent >= 100 ? completedColor || color : color;
	const backgroundColor = withOpacity(color, 0.2);

	const springs = useSpring({
		from: { width: "0%" },
		to: { width: `${roundedPercent}%` },
	});

	return (
		<>
			<div
				style={{
					backgroundImage: `repeating-linear-gradient(to right, ${backgroundColor} 0px, ${backgroundColor} 5px, transparent 2px, transparent 10px)`,
				}}
				className={`flex ${width} h-24 relative items-center`}
			>
				<animated.div
					style={{
						backgroundImage: `repeating-linear-gradient(to right, ${currentColor} 0px, ${currentColor} 5px, transparent 2px, transparent 10px)`,
						backgroundSize: "10px 100%",
						...springs,
					}}
					className="min-h-full"
				/>
			</div>
			<div className="flex justify-between">
				<span style={{ color: color }}>[{roundedPercent}%]</span>
				<span style={{ color: color }}>
					[{progress} / {progressTarget}]
				</span>
			</div>
		</>
	);
};
