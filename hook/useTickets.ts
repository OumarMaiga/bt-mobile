import { getPopularTickets, getSearchedTickets, getTicket, getTickets } from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";

export function useSearchedTickets({departure, arrival, departureDate}: {departure:string, arrival:string, departureDate:string}) {
    return useQuery({
        enabled: !!departure && !!arrival && !!departureDate,
        queryKey: ['tickets', departure, arrival, departureDate],
        queryFn: async () => getSearchedTickets({
            startCity: departure,
            endCity: arrival,
            departureDate: departureDate
        }),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })
}

export function useTickets() {
    return useQuery({
        queryKey: ['tickets'],
        queryFn: getTickets,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })
}

export function usePopularTickets() {
    return useQuery({
        queryKey: ['popularTickets'],
        queryFn: getPopularTickets,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })
}

export function useTicket(axisId: number, endPointId: number, departureDate: string) {
    return useQuery({
        queryKey: ['ticket', axisId, endPointId, departureDate],
        queryFn: () => getTicket(axisId, endPointId, departureDate),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30
    })
}