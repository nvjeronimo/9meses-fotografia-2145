import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useMessages(enabled = true) {
  return useQuery(orpc.messages.list.queryOptions({ enabled }));
}

export function useUnreadCount(enabled = true) {
  return useQuery(orpc.messages.unreadCount.queryOptions({ enabled, staleTime: 30_000 }));
}

function useInvalidateMessages() {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: orpc.messages.key() });
}

export function useCreateMessage() {
  return useMutation(orpc.messages.create.mutationOptions());
}

export function useMarkMessageRead() {
  const invalidate = useInvalidateMessages();
  return useMutation(orpc.messages.markRead.mutationOptions({ onSuccess: invalidate }));
}

export function useDeleteMessage() {
  const invalidate = useInvalidateMessages();
  return useMutation(orpc.messages.remove.mutationOptions({ onSuccess: invalidate }));
}

export function useSetupStatus() {
  return useQuery(orpc.admin.setupStatus.queryOptions({ staleTime: 0 }));
}
