import { cva } from "class-variance-authority";

export const colourVariance = cva("", {
  variants: {
    colour: {
      red: "bg-red-100",
      green: "bg-green-100",
      blue: "bg-blue-100",
      yellow: "bg-yellow-100",
      white: "bg-white-100",
    },

    hover: {
      red: "hover:bg-red-200 hover:cursor-pointer",
      green: "hover:bg-green-200 hover:cursor-pointer",
      blue: "hover:bg-blue-200 hover:cursor-pointer",
      yellow: "hover:bg-yellow-200 hover:cursor-pointer",
      white: "hover:bg-gray-200 hover:cursor-pointer",
    },
    focus: {},
    transition: {
      true: "transition duration-300 ease-in-out",
    },
  },
  defaultVariants: {
    colour: "white",
    transition: false,
  },
});
