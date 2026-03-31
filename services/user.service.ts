import { BoughtTicket } from '@/types/boughtTicket';

/**
 * Initialisation de la connexion
 * @param token 
 * @returns 
 */
export async function getUserByToken(token: string):Promise<Response> {
    try {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/profile`, {
            headers: {'Authorization': `Bearer ${token}`}
        })
        
        const data = await response.json()

        if(!response.ok) {
            throw new Error(data?.message || "Erreur lors de la récuperation de l'utilisateur")
        }

        return data
    } catch (error) {
        throw error
    }
}

/**
 * Update user profile
 * @param formData 
 * @param token 
 * @returns user data updated
 */
export async function updateUser(formData: FormData, token: string):Promise<Response> {
    return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/profile`, {
        method: 'PUT',
        headers: {'user-auth-token': `${token}`},
        body: formData
    })
}

/**
 * Récuparation des tickets achetés d'un utilisateur
 * @param token 
 * @returns 
 */
export async function getUserBoughtTickets(token: string): Promise<BoughtTicket[]> {
    try {
        const response = await  fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/tickets`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-auth-token': `${token}`
            }
        })

        const data = await response.json()

        if(!response.ok) throw new Error(data?.message || "Erreur lors de la récupération des billets achétés")
        
        return data
    } catch (error) {
        throw error
    }
}

/**
 * Récuparation du ticket acheté d'un utilisateur
 * @param token 
 * @returns 
 */
export async function getUserBoughtTicket(token: string, id: number): Promise<BoughtTicket> {
    try {
        const response = await  fetch(`${process.env.EXPO_PUBLIC_API_URL}/user/tickets/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'user-auth-token': `${token}`
            }
        })

        const data = await response.json()

        if(!response.ok) throw new Error(data?.message || "Erreur lors de la récupération des billets achétés")

        return data
    } catch (error) {
        throw error
    }
}