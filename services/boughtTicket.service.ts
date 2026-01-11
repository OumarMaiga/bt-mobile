import { API_BASE_URL } from "@/config/env";
import { BoughtTicket } from "@/types/boughtTicket";

export async function getBoughtTickets(token: string): Promise<BoughtTicket[]> {
    const response = await  fetch(`${API_BASE_URL}/user/tickets`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'user-auth-token': `${token}`
        }
    })

    const data = await response.json()

    if(!response.ok) throw new Error(data?.message || "Erreur lors de la récupération ddes billets achétés")
    
    return data.boughtTickets
}