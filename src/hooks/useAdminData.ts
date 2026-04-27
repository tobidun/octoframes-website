import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Message, Portfolio } from "@/components/admin/types";

// ─── Messages Hooks ───────────────────────────────────

export function useMessages() {
  return useQuery<Message[]>({
    queryKey: ["messages"],
    queryFn: async () => {
      const res = await fetch("/api/contact");
      const data = await res.json();
      return data.messages || [];
    },
  });
}

export function useMarkMessageRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/contact/${id}`, { method: "PATCH" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/contact/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}

// ─── Portfolio Hooks ──────────────────────────────────

export function usePortfolios() {
  return useQuery<Portfolio[]>({
    queryKey: ["portfolios"],
    queryFn: async () => {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      return data.portfolios || [];
    },
  });
}

export function useDeletePortfolio() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
  });
}
