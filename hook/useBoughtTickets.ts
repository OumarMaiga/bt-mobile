import { getUserBoughtTicket, getUserBoughtTickets } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export function useBoughtTickets(token: string) {
    return useQuery({
        queryKey: ["boughtTickets"],
        queryFn: () => getUserBoughtTickets(token),
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}

export function useBoughtTicket(token: string, id: number) {
    return useQuery({
        queryKey: ["boughtTicket", id],
        queryFn: () => getUserBoughtTicket(token, id),
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}