import { getPartners } from "@/services/partner.service";
import { useQuery } from "@tanstack/react-query";

export function usePartners() {
    return useQuery({
        queryKey: ["partners"],
        queryFn: getPartners,
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}