import { Ticket } from '@/types/ticket';

/**
 * Recupère un ticket en fonction de l'axisId
 * @param axisId L'ID de l'axe
 * @param endPointCityId L'ID de la ville d'arrivée
 * @param departureDate Le jour et l'heure de départ
 * @returns 
 */
export async function getTicket(axisId: number, endPointCityId: number, departureDate: string):Promise<Ticket> {
    try{
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/travels/tickets?axisId=${axisId}&endPointCityId=${endPointCityId}&departureDate=${departureDate}`)

        const data = await response.json()

        if(!response.ok) {
            throw new Error(data?.message || "Erreur lors de la récuperation du ticket")
        }

        return data
    } catch (error) {
        throw error
    }
    
}

/**
 * Récupère les tickets en fonction des critères de recherche
 * @param startCity ville de départ
 * @param endCity ville d'arrivée
 * @param departureDate date de départ
 * @returns 
 */
export async function getSearchedTickets({startCity, endCity, departureDate}:{startCity: string, endCity: string, departureDate: string}):Promise<Ticket[]> {
    try{
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/travels?start-point=${startCity}&end-point=${endCity}&departure-date=${departureDate}`)

        const data = await response.json()

        if(!response.ok) {
            throw new Error(data?.message || "Erreur lors de la récuperation des tickets")
        }

        return data
    } catch (error) {
        throw error
    }
}

/**
 * Récupère les tickets principaux (axe depart/arrivée)
 * @returns 
 */
export async function getTickets():Promise<Ticket[]> {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/travels/mains`)
        
        const data = await response.json()

        if(!response.ok) {
            throw new Error(data?.message || "Erreur lors de la récuperation des tickets")
        }
        
        return data
    } catch (error) {
        console.error(error)
        throw "Impossible de récuperer les tickets"
    }
}

/**
 * Récupère les tickets populaires du mois
 * @returns 
 */
export async function getPopularTickets():Promise<Ticket[]> {

    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/travels/popular/monthly`)

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation des tickets")
    }

    return data
}