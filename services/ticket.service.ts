import { API_BASE_URL } from '@/config/env'
import { Ticket } from '@/types/ticket'

export async function getTickets({startCity, endCity, departureDate}:{startCity: string, endCity: string, departureDate: string}):Promise<Ticket[]> {

    const response = await fetch(`${API_BASE_URL}/travel?start-point=${startCity}&end-point=${endCity}&departure-date=${departureDate}`)

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation des tickets")
    }

    return data
}