import { City } from "@/types/city";

export async function getCities():Promise<City[]> {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/cities`)
    
    const data = await response.json()
    
    if(!response.ok) {
      throw new Error(data?.message || "Erreur lors de la récuperation des villes")
    }

    return data
  } catch (error) {
    console.error(error)
    throw "Impossible de récuperer les villes"
  }
  
} 