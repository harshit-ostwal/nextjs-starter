import { Spinner } from "@/components/ui/spinner";
import React from "react";

function Loading() {
    return (
        <div className="flex h-full items-center justify-center">
            <Spinner className={"size-7"} />
        </div>
    );
}

export default Loading;
