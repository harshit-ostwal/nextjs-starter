import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("", {
    variants: {
        size: {
            h1: "text-[90px] leading-none font-bold tracking-[-4px]",
            h2: "text-[67px] leading-none font-semibold tracking-[-4px]",
            h3: "text-[51px] leading-none font-semibold tracking-[-4px]",
            h4: "text-[38px] leading-none font-medium tracking-[-4px]",
            h5: "max-w-4xl text-[28px] leading-snug font-medium",
            h6: "text-[21px]",
            p: "text-[18px]",
            ul: "list-inside list-disc space-y-4 text-[16px] font-medium",
            li: "text-[16px]",
        },
    },
    defaultVariants: {
        size: "h1",
    },
});

export const Heading = ({ className, size = "h1", id, children, ...props }) => {
    const Tag = size === "p" ? "p" : size;
    return (
        <Tag
            className={cn(headingVariants({ size }), className)}
            id={id}
            {...props}
        >
            {children}
        </Tag>
    );
};
