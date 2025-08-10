import { animated, useSpring } from "@react-spring/web";

export interface DashedLoadingBarProps {
	barsColor?: string;
	backgroundBarsColor?: string;
	progress: number;
	progressTarget: number;
}

export const DashedLoadingBar = ({
	progress,
	barsColor,
	backgroundBarsColor,
	progressTarget,
}: DashedLoadingBarProps) => {
	const percent = progressTarget > 0 ? (progress / progressTarget) * 100 : 0;
	const roundedPercent = Math.round(percent * 100) / 100;

	const springs = useSpring({
		from: { width: "0%" },
		to: { width: `${roundedPercent}%` },
	});

	return (
		<>
			<div
				style={{
					backgroundImage: `repeating-linear-gradient(to right, ${backgroundBarsColor} 0px, ${backgroundBarsColor} 5px, transparent 2px, transparent 10px)`,
				}}
				className={`flex w-xs h-24 relative items-center`}
			>
				<animated.div
					style={{
						backgroundImage: `repeating-linear-gradient(to right, ${barsColor} 0px, ${barsColor} 5px, transparent 2px, transparent 10px)`,
						backgroundSize: "10px 100%",
						...springs,
					}}
					className={["min-h-full"].join(" ")}
				></animated.div>
			</div>
			<div className="flex justify-between">
				<span style={{ color: barsColor }}>{roundedPercent}%</span>
				<span style={{ color: barsColor }}>
					{progress} / {progressTarget}
				</span>
			</div>
		</>
	);
};
