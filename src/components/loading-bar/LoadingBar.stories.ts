import type { Meta, StoryObj } from "@storybook/react-vite";

import { LoadingBar } from "./LoadingBar";

const meta = {
	title: "Components/LoadingBar",
	component: LoadingBar,
} satisfies Meta<typeof LoadingBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		dotsColor: "black",
		backgroundColor: "white",
		progress: 20,
	},
	parameters: {
		layout: "centered",
	},
};
