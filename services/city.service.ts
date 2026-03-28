import { City } from "@/types/city";

export async function getCities():Promise<City[]> {

  const response = await fetch(`${process.env.BASE_API_URL}/cities`)
  
  const data = await response.json()
  
  if(!response.ok) {
    throw new Error(data?.message || "Erreur lors de la récuperation des villes")
  }

  return data
} 