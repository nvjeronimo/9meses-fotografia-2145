import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export type SessionType = "maternity" | "newborn" | "baby" | "family" | "smash";

export function usePackages() {
  return useQuery(orpc.packages.list.queryOptions({ staleTime: 60_000 }));
}

function useInvalidatePackages() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: orpc.packages.key() });
}

export function useCreatePackage() {
  const invalidate = useInvalidatePackages();
  return useMutation(orpc.packages.create.mutationOptions({ onSuccess: invalidate }));
}

export function useUpdatePackage() {
  const invalidate = useInvalidatePackages();
  return useMutation(orpc.packages.update.mutationOptions({ onSuccess: invalidate }));
}

export function useDeletePackage() {
  const invalidate = useInvalidatePackages();
  return useMutation(orpc.packages.remove.mutationOptions({ onSuccess: invalidate }));
}

export function useSeedPackages() {
  const invalidate = useInvalidatePackages();
  return useMutation(orpc.packages.seed.mutationOptions({ onSuccess: invalidate }));
}
