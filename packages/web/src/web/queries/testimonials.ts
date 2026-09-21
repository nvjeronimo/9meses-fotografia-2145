import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useTestimonials() {
  return useQuery(orpc.testimonials.list.queryOptions({ staleTime: 60_000 }));
}

export function useAllTestimonials() {
  return useQuery(orpc.testimonials.listAll.queryOptions({ staleTime: 10_000 }));
}

function useInvalidateTestimonials() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: orpc.testimonials.key() });
}

export function useCreateTestimonial() {
  const invalidate = useInvalidateTestimonials();
  return useMutation(orpc.testimonials.create.mutationOptions({ onSuccess: invalidate }));
}

export function useUpdateTestimonial() {
  const invalidate = useInvalidateTestimonials();
  return useMutation(orpc.testimonials.update.mutationOptions({ onSuccess: invalidate }));
}

export function useDeleteTestimonial() {
  const invalidate = useInvalidateTestimonials();
  return useMutation(orpc.testimonials.remove.mutationOptions({ onSuccess: invalidate }));
}
