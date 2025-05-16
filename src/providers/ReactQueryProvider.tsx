"use client";

import { ReactNode } from "react";
import {
    QueryClientProvider,
    HydrationBoundary,
} from "@tanstack/react-query";
import { getQueryClient } from "@/lib/queryClient";

type Props = {
    children: ReactNode;
    dehydratedState: unknown;
};

export default function ReactQueryProvider({
    children,
    dehydratedState,
}: Props) {
    const queryClient = getQueryClient();

    return (
        <QueryClientProvider client={queryClient}>
            <HydrationBoundary state={dehydratedState ?? {}}>
                {children}
            </HydrationBoundary>
        </QueryClientProvider>
    );
}
