import { cn } from "@/lib/utils";
import { Icons } from "@/shared/icons";

function Spinner({ className, ...props }) {
    return (
        <Icons.loader2
            role="status"
            aria-label="Loading"
            className={cn("size-7 animate-spin", className)}
            {...props}
        />
    );
}

export { Spinner };
