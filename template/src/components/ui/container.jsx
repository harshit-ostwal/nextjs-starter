import { cn } from "@/lib/utils";

function Container({ children, className, ref }) {
    return (
        <section
            className={cn(className, "relative z-10 mx-auto w-11/12 2xl:w-3/4")}
            ref={ref}
        >
            {children}
        </section>
    );
}

export default Container;
