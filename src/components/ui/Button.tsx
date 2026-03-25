"use client";

import React from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "emergency";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-white hover:bg-primary-dark hover:shadow-[0_0_25px_rgba(37,99,235,0.4)] active:scale-[0.98]",
  outline:
    "border-2 border-primary text-primary hover:bg-primary hover:text-white active:scale-[0.98]",
  ghost:
    "text-muted hover:text-foreground hover:bg-white/50 active:scale-[0.98]",
  emergency:
    "bg-emergency text-white hover:bg-emergency-dark hover:shadow-[0_0_25px_rgba(220,38,38,0.4)] active:scale-[0.98]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  href,
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const classes = `
    inline-flex items-center justify-center gap-2
    font-semibold rounded-2xl
    transition-all duration-300 ease-in-out
    cursor-pointer select-none
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${className}
  `.trim();

  if (href) {
    return (
      <a href={href} className={classes}>
        {icon && <span className="flex-shrink-0">{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
