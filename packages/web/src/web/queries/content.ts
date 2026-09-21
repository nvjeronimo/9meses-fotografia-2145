import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../lib/api";

/** PT/EN overrides for the shipped dictionary. */
export function useContentOverrides() {
  return useQuery(orpc.content.list.queryOptions({ staleTime: 60_000 }));
}

export function useSetContent() {
  const queryClient = useQueryClient();
  return useMutation(
    orpc.content.set.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries({ queryKey: orpc.content.key() }),
    }),
  );
}

export function useResetContent() {
  const queryClient = useQueryClient();
  return useMutation(
    orpc.content.reset.mutationOptions({
      onSuccess: () => queryClient.invalidateQueries({ queryKey: orpc.content.key() }),
    }),
  );
}
