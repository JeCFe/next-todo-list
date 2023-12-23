import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const radio = cva(
  [
    "appearance-none flex rounded-full border-2 border-black",
    "after:m-auto after:flex after:content-center after:justify-center after:rounded-full after:checked:bg-pink-400",
    "@apply focus:border-4 focus:ring focus:ring-red-500",
  ],
  {
    variants: {
      size: {
        small: ["h-8 min-h-8 w-8 min-w-8", "after:h-4 after:w-4"],
        medium: ["h-10 min-h-10 w-10 min-w-10", "after:h-6 after:w-6"],
      },
    },
    defaultVariants: {
      size: "small",
    },
  }
);

const label = cva(["flex flex-col"], {
  variants: { size: { medium: "text-lg", small: "text-base" } },
  defaultVariants: { size: "small" },
});

type Props = {
  children?: ReactNode;
  hint?: ReactNode;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof radio>;

export const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ children, hint, size, className, ...rest }: Props, ref) => (
    <label className={label({ size, className })}>
      <div className="flex flex-row items-center">
        <input {...rest} className={radio({ size })} ref={ref} type="radio" />
        <span className="ml-2">{children}</span>
      </div>
      {hint && <span className="ml-14 text-gray-500">{hint}</span>}
    </label>
  )
);

RadioButton.defaultProps = {
  hint: undefined,
  children: undefined,
  className: "",
};

RadioButton.displayName = "RadioButton";
