import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function usePosts() {
  return useQuery(orpc.posts.list.queryOptions({ staleTime: 60_000 }));
}

export function usePost(slug: string) {
  return useQuery(
    orpc.posts.bySlug.queryOptions({ input: { slug }, staleTime: 60_000, enabled: !!slug }),
  );
}

export function useAllPosts() {
  return useQuery(orpc.posts.listAll.queryOptions({ staleTime: 10_000 }));
}

function useInvalidatePosts() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: orpc.posts.key() });
}

export function useCreatePost() {
  const invalidate = useInvalidatePosts();
  return useMutation(orpc.posts.create.mutationOptions({ onSuccess: invalidate }));
}

export function useUpdatePost() {
  const invalidate = useInvalidatePosts();
  return useMutation(orpc.posts.update.mutationOptions({ onSuccess: invalidate }));
}

export function useDeletePost() {
  const invalidate = useInvalidatePosts();
  return useMutation(orpc.posts.remove.mutationOptions({ onSuccess: invalidate }));
}
