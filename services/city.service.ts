import { API_BASE_URL } from "@/config/env"
import { City } from "@/types/city"

export async function getCities():Promise<City[]> {

  const response = await fetch(`${API_BASE_URL}/cities`)
  
  const data = await response.json()
  
  if(!response.ok) {
    throw new Error(data?.message || "Erreur lors de la récuperation des villes")
  }

  return data
} 