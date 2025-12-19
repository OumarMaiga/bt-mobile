import { getCountries } from '@/services/country.service'
import { useQuery } from '@tanstack/react-query'

export function useCountries() {
    return useQuery({
        queryKey: ['countries'],
        queryFn: getCountries,
        staleTime: Infinity,
        gcTime: 1000 * 3600 * 24
    })
}
