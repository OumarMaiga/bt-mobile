import { API_BASE_URL } from "@/config/env"
import { Partner } from "@/types/partner"

export async function getPartners():Promise<Partner[]> {

  const response = await fetch(`${API_BASE_URL}/partners`)
  
  const data = await response.json()
  
  if(!response.ok) {
    throw new Error(data?.message || "Erreur lors de la récuperation des partenaires")
  }

  return data
} 