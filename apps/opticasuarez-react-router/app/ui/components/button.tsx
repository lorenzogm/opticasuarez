import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Link } from 'react-router';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-blue-900 text-blue-50 hover:bg-blue-900/90',
        secondary: 'bg-blue-100 text-blue-900 hover:bg-blue-100/80',
        outline: 'border border-blue-200 bg-white hover:bg-blue-50 hover:text-blue-900',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
  unstyled?: boolean;
  target?: string;
  rel?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild: _asChild = false,
      href,
      target,
      rel,
      unstyled = false,
      ...props
    },
    ref
  ) => {
    if (href) {
      // Check if it's an external link
      const isExternal = href.startsWith('http') || href.startsWith('//');

      if (isExternal) {
        return (
          <a
            href={href}
            target={target}
            rel={rel}
            className={
              unstyled
                ? className
                : cn(buttonVariants({ variant, size, className }))
            }
          >
            {props.children}
          </a>
        );
      } else {
        return (
          <Link
            to={href}
            className={
              unstyled
                ? className
                : cn(buttonVariants({ variant, size, className }))
            }
          >
            {props.children}
          </Link>
        );
      }
    }

    return (
      <button
        className={
          unstyled
            ? className
            : cn(buttonVariants({ variant, size, className }))
        }
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
