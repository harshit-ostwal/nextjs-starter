"use client";
import { Assets } from "@/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";

function ImageComp({
    src,
    alt,
    width = 3840,
    height = 2160,
    className,
    ...props
}) {
    return (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onError={(event) => {
                event.currentTarget.src = Assets.swags.desktop.wallpaper3;
            }}
            className={cn("object-cover select-none", className)}
            quality={100}
            draggable={false}
            loading="lazy"
            fetchPriority="auto"
            {...props}
        />
    );
}

export { ImageComp };
