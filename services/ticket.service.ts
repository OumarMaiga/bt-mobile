import { API_BASE_URL } from '@/config/env'
import { Ticket } from '@/types/ticket'

/**
 * Recupère un ticket en fonction de l'axisId
 * @param axisId L'ID de l'axe
 * @param endPointId L'ID du point d'arrivée
 * @param departureDate Le jour et l'heure de départ
 * @returns 
 */
export async function getTicket(axisId: number, endPointId: number, departureDate: string):Promise<Ticket> {

    const params = new URLSearchParams({
        axisId: axisId.toString(),
        endPointId: endPointId.toString(),
        departureDate: departureDate
    })

    const response = await fetch(`${API_BASE_URL}/travels/tickets?${params.toString()}`)

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation du ticket")
    }

    return data
}

/**
 * Récupère les tickets en fonction des critères de recherche
 * @param startCity ville de départ
 * @param endCity ville d'arrivée
 * @param departureDate date de départ
 * @returns 
 */
export async function getSearchedTickets({startCity, endCity, departureDate}:{startCity: string, endCity: string, departureDate: string}):Promise<Ticket[]> {

    const response = await fetch(`${API_BASE_URL}/travels?start-point=${startCity}&end-point=${endCity}&departure-date=${departureDate}`)

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation des tickets")
    }

    return data
}

/**
 * Récupère les tickets principaux (axe depart/arrivée)
 * @returns 
 */
export async function getTickets():Promise<Ticket[]> {

    const response = await fetch(`${API_BASE_URL}/travels/mains`)

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation des tickets")
    }
    
    return data
}

/**
 * Récupère les tickets populaires du mois
 * @returns 
 */
export async function getPopularTickets():Promise<Ticket[]> {

    const response = await fetch(`${API_BASE_URL}/travels/popular/monthly`)

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation des tickets")
    }

    return data
}