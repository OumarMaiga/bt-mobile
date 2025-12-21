import { getCities } from "@/services/city.service";
import { useQuery } from "@tanstack/react-query";

export function useCities() {
    return useQuery({
        queryKey: ["cities"],
        queryFn: getCities,
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}