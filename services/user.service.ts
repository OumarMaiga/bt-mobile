import { API_BASE_URL } from '@/config/env'

/**
 * Initialisation de la connexion
 * @param token 
 * @returns 
 */
export async function getUserByToken(token: string):Promise<Response> {
    const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {'Authorization': `Bearer ${token}`}
    })
    
    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation de l'utilisateur")
    }

  return data
}