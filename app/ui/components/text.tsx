import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const textVariants = cva('text-gray-900', {
  variants: {
    variant: {
      default: 'text-gray-900',
      muted: 'text-gray-500',
      light: 'text-gray-600',
      white: 'text-white',
      primary: 'text-blue-900',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      default: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
    weight: 'normal',
    align: 'left',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, variant, size, weight, align, as: Component = 'p', ...props },
    ref
  ) => {
    return (
      <Component
        className={cn(
          textVariants({ variant, size, weight, align, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, textVariants };
