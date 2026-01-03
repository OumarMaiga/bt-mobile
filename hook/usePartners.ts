import { getPartner, getPartnerJourneys, getPartners } from "@/services/partner.service";
import { useQuery } from "@tanstack/react-query";

export function usePartners() {
    return useQuery({
        queryKey: ["partners"],
        queryFn: getPartners,
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}

export function usePartner(shareableId:string) {
    return useQuery({
        queryKey: ["partner", shareableId],
        queryFn: async () => getPartner(shareableId),
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}

export function usePartnerJourneys(shareableId:string) {
    return useQuery({
        queryKey: ["partnerJourneys", shareableId],
        queryFn: async () => getPartnerJourneys(shareableId),
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}