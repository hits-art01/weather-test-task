"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";
// @ts-expect-error: React Query Devtools missing type declarations
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ClientProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
