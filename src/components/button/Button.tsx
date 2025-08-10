export interface ButtonProps {
	/** How large should the button be? */
	size?: "small" | "medium" | "large";
	/** Button contents */
	label: string;

	/** Color of the borders and text */
	color: string;

	/** Optional click handler */
	onClick?: () => void;
}

/** Primary UI component for user interaction */
export const Button = ({
	size = "medium",
	color,
	label,
	...props
}: ButtonProps) => {
	const width =
		size === "small" ? "w-20" : size === "large" ? "w-40" : "w-30";

	return (
		<button
			type="button"
			style={{ color }}
			className={[
				"bg-transparent",
				"duration-300",
				"ease-linear",
				"hover:bg-blue-400",
				"cursor-pointer",
				"p-2",
				"border-2",
				"uppercase",
				"font-bold",
				width,
			].join(" ")}
			{...props}
		>
			{label}
		</button>
	);
};
