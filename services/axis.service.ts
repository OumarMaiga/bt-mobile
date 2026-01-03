import { API_BASE_URL } from '@/config/env'

/**
 * Recupère une axe en fonction de son ID
 * @param axisId L'ID de l'axe
 * @returns 
 */
export async function getAxis(axisId: string):Promise<any> {

    const response = await fetch(`${API_BASE_URL}/axes/${axisId}/details`)

    const data = await response.json()

    if(!response.ok) {
        throw new Error(data?.message || "Erreur lors de la récuperation de l'axe")
    }

    return data
}