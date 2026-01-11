import { getBoughtTickets } from "@/services/boughtTicket.service";
import { useQuery } from "@tanstack/react-query";

export function useBoughtTickets(token: string) {
    return useQuery({
        queryKey: ["boughtTickets"],
        queryFn: () => getBoughtTickets(token),
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}