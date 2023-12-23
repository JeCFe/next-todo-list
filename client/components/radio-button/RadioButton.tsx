import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

const radio = cva(
  [
    "apperance-none glex rounded-full border-2 border-black",
    "after:m-auto after:flex after:content-center after:justify-center after:rounded-full after:checked:bg-black",
    "@apply focus:border-4 focus:ring focus:red",
  ],
  {
    variants: {
      size: {
        medium: ["h-10 min-h-10 w-10 min-w-10", "after:h-5 after:w-5"],
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
  VariantProps<typeof radio>;

export const RadioButton = forwardRef<HTMLInputElement, Props>(
  ({ children, hint, size, className, ...rest }: Props, ref) => (
    <label className={label({ size, className })}>
      <div className="flex flex-row items-center">
        <input {...rest} className={radio({ size })} ref={ref} type="radio">
          <span className="ml-4">{children}</span>
        </input>
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
