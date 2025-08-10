import type { Meta, StoryObj } from "@storybook/react-vite";

import { DashedLoadingBar } from "./DashedLoadingBar";

const meta = {
	title: "Components/DashedLoadingBar",
	component: DashedLoadingBar,
} satisfies Meta<typeof DashedLoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		barsColor: "#000000",
		backgroundBarsColor: "#b9b9b9",
		progress: 5000,
		progressTarget: 12000,
	},
	parameters: {
		layout: "centered",
	},
};
