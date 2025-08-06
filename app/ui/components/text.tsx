import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const textVariants = cva('text-gray-900', {
  variants: {
    variant: {
      'heading-1': 'text-4xl font-bold tracking-tight',
      'heading-2': 'text-3xl font-bold tracking-tight',
      'heading-3': 'text-2xl font-semibold tracking-tight',
      'heading-4': 'text-xl font-semibold tracking-tight',
      'heading-5': 'text-lg font-semibold tracking-tight',
      'body-lg': 'text-lg leading-relaxed',
      'body-md': 'text-base leading-relaxed',
      'body-sm': 'text-sm leading-relaxed',
    },
    colour: {
      default: 'text-gray-900',
      muted: 'text-gray-500',
      light: 'text-gray-600',
      white: 'text-white',
      primary: 'text-blue-900',
    },
    align: {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    },
  },
  defaultVariants: {
    variant: 'body-md',
    colour: 'default',
    align: 'left',
  },
});

export interface TextProps
  extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'color'>,
    VariantProps<typeof textVariants> {
  as?: React.ElementType;
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    { className, variant, colour, align, as: Component = 'p', ...props },
    ref
  ) => {
    return (
      <Component
        className={cn(
          textVariants({ variant, colour, align }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = 'Text';

export { Text, textVariants };
