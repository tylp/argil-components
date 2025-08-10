import { animated, useSpring } from "@react-spring/web";

export interface LoadingBarProps {
	/** Background color of the loading bar in hex */
	backgroundColor?: string;
	/** Color of the dots in the loading bar in hex */
	dotsColor?: string;
	/** The current progress of the loading bar (0-100) */
	progress: number;
}

export const LoadingBar = ({
	progress,
	dotsColor,
	backgroundColor,
}: LoadingBarProps) => {
	const clampedProgress = Math.max(0, Math.min(progress, 100));

	const springs = useSpring({
		from: { width: "0%" },
		to: { width: `${clampedProgress}%` },
	});

	return (
		<div
			style={{ backgroundColor }}
			className={`flex w-xs p-2 h-30 border-solid border-2  relative items-center`}
		>
			<animated.div
				style={{
					backgroundColor,
					backgroundImage: `radial-gradient(circle, ${dotsColor} 1.5px, transparent 1px)`,
					backgroundSize: "10px 10px",
					...springs,
				}}
				className={["min-h-full", "rounded"].join(" ")}
			></animated.div>
			<span
				style={{ backgroundColor: backgroundColor }}
				className={`font-bold pt-2 pb-2 pr-4 pl-4 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
			>
				{clampedProgress}%
			</span>
		</div>
	);
};
