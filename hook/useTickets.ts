import { getTickets } from "@/services/ticket.service";
import { useQuery } from "@tanstack/react-query";

export function useTickets({departure, arrival, departureDate}: {departure:string, arrival:string, departureDate:string}) {
    return useQuery({
        enabled: !!departure && !!arrival && !!departureDate,
        queryKey: ['tickets', departure, arrival, departureDate],
        queryFn: async () => getTickets({
            startCity: departure,
            endCity: arrival,
            departureDate: departureDate
        }),
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 30 // 30 minutes
    })
}