import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const checkbox = cva(
  [
    "appearance-none box-border relative border-2 border-black",
    "focus:before:absolute focus:before:-left-0.5 focus:before:-top-0.5 focus:before:border-4 focus:before:border-black focus:before:ring focus:before:ring-red-500",
    "checked:after:absolute checked:after:box-border checked:after:rotate-45 checked:after:border-solid checked:after:border-pink-400",
  ],
  {
    variants: {
      size: {
        small: [
          "h-8 min-h-8 w-8 min-w-8",
          "focus:before:h-8 focus:before:w-8",
          "checked:after:left-2 checked:after:top-[1px] checked:after:h-[20px] checked:after:w-3 checked:after:border-b-[5px] checked:after:border-r-[5px]",
        ],
        medium: [
          "h-10 min-h-10 w-10 min-w-10",
          "focus:before:h-10 focus:before:w-10",
          "checked:after:left-3 checked:after:top-[3px] checked:after:h-[25px] checked:after:w-3 checked:after:border-b-[5px] checked:after:border-r-[5px]",
        ],
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
  VariantProps<typeof checkbox>;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ children, hint, size, className, ...rest }: Props, ref) => (
    <label className={label({ size, className })}>
      <div className="flex flex-row items-center">
        <input
          {...rest}
          className={checkbox({ size })}
          ref={ref}
          type="checkbox"
        />
        <span className="ml-4">{children}</span>
      </div>
      {hint && <span className="ml-14 text-gray-500">{hint}</span>}
    </label>
  )
);

Checkbox.defaultProps = {
  hint: undefined,
  children: undefined,
  className: "",
};

Checkbox.displayName = "RadioButton";
