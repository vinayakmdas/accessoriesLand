import { forwardRef } from "react";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wide uppercase text-sm px-6 py-3 rounded-sm transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red";

const variants = {
  primary:
    "bg-red text-white hover:bg-red-bright shadow-[0_0_0_1px_rgba(216,19,36,0.4)] hover:shadow-[0_0_24px_rgba(216,19,36,0.55)]",
  outline:
    "border border-steel/40 text-paper hover:border-red hover:text-red bg-transparent",
  ghost: "text-paper hover:text-red bg-transparent",
};

const Button = forwardRef(
  ({ as: Component = "button", variant = "primary", className = "", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={`${base} ${variants[variant] ?? variants.primary} ${className}`}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Button.displayName = "Button";
export default Button;
