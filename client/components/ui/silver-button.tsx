import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const silverButtonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    {
        variants: {
            variant: {
                default:
                    "bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 text-white shadow-lg hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 focus-visible:ring-gray-500 border border-gray-600 rounded-xl",
                light:
                    "bg-gradient-to-b from-gray-600 via-gray-700 to-gray-800 text-white shadow-md hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 focus-visible:ring-gray-400 border border-gray-500 rounded-xl",
                dark:
                    "bg-gradient-to-b from-gray-800 via-gray-900 to-black text-white shadow-xl hover:from-gray-700 hover:via-gray-800 hover:to-gray-900 focus-visible:ring-gray-600 border border-gray-700 rounded-xl",
            },
            size: {
                default: "h-11 px-6 py-3",
                sm: "h-9 px-4 py-2 rounded-lg",
                lg: "h-12 px-8 py-3 rounded-xl",
                icon: "size-11 rounded-xl",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface SilverButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof silverButtonVariants> {
    asChild?: boolean
}

const SilverButton = React.forwardRef<HTMLButtonElement, SilverButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(silverButtonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
SilverButton.displayName = "SilverButton"

export { SilverButton, silverButtonVariants }
