import { VariantProps, cva } from "class-variance-authority";
import { SpinnerSvg } from "..";

const spinner = cva("", {
  variants: {
    size: {
      large: "w-40 h-40",
      medium: "w-20 h-20",
      small: "w-10 h-10",
    },
    fast: {
      true: "animate-spin",
      false: "animate-[spin_4s_linear_infinite]",
    },
  },
  defaultVariants: {
    size: "medium",
    fast: false,
  },
});

type Props = {
  fast?: boolean;
  className?: string;
} & VariantProps<typeof spinner>;

export function Spinner({ fast, className, size }: Props) {
  return <SpinnerSvg className={spinner({ fast, size, className })} />;
}
