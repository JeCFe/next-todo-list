import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const checkbox = cva(
  [
    "apperance-none border-box relative border-2 border-black",
    "focus:before:absolute focus:before:-left-0.5 focus:before:-top-0.5 focus:before:border-4 focus:before:ring focus:before:ring-red",
    "checked:after:absolute checked:after:box-border checked:after:rotate-45 checked:after:border-solid checked:after:border-black",
    "@apply focus:border-4 focus:ring focus:red",
  ],
  {
    variants: {
      size: {
        medium: [
          "h-10 min-h-10 w-10 min-w-10",
          "after:h-10 after:w-10",
          "checked:after:left-3 checked:after:top-[3px] checked:after:rotate-45 checked:after:border-solid checked:after:border-black",
        ],
      },
    },
    defaultVariants: {
      size: "medium",
    },
  }
);

const label = cva(["flex flex-col"], {
  variants: { size: { medium: "text-lg" } },
  defaultVariants: { size: "medium" },
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
        >
          <span className="ml-4">{children}</span>
        </input>
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
