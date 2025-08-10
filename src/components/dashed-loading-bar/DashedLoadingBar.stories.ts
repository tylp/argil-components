import type { Meta, StoryObj } from "@storybook/react-vite";

import { DashedLoadingBar } from "./DashedLoadingBar";

const meta = {
	title: "Components/DashedLoadingBar",
	component: DashedLoadingBar,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
} satisfies Meta<typeof DashedLoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	parameters: {
		layout: "centered",
	},
};

export const CompletedColor: Story = {
	args: {
		completedColor: "#ffae00ff",
		progress: 100,
		progressTarget: 100,
	},
	parameters: {
		layout: "centered",
	},
};

export const Color: Story = {
	args: {
		color: "#1e2e8c",
		progress: 50,
		progressTarget: 100,
	},
	parameters: {
		layout: "centered",
	},
};
