import { VariantProps, cva } from "class-variance-authority";
import { ButtonHTMLAttributes, ReactNode } from "react";

const button = cva(
  "flex border-2 rounded-xl items-center justify-center focus:ring-red-300 focus:ring-2 transition duration-300 ease-in-out",
  {
    variants: {
      variant: {
        primary: "bg-pink-100 hover:bg-pink-200 border-black",
        secondary: "bg-white hover:bg-gray-100 border-pink-200",
      },
      size: {
        large: "min-h-12 px-4 py-2 text-lg",
        medium: "min-h-10 px-3 py-1 text-base",
        small: "min-h-8 px-2 py-1 text-sm",
        unbound: "w-full h-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  }
);

type Props = {
  children: ReactNode | ReactNode[];
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> &
  VariantProps<typeof button>;

export function Button({ size, variant, className, children, ...rest }: Props) {
  return (
    <button {...rest} className={button({ size, variant, className })}>
      {children}
    </button>
  );
}
