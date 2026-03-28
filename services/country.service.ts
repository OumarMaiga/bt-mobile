export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
import { Country } from '@/types/country';

export async function getCountries(): Promise<Country[]> {
  
  const response = await fetch(`${API_BASE_URL}/countries`)

  const data = await response.json()

  if(!response.ok) {
    throw new Error(data?.message ?? "Erreur lors de la récuperation des pays")
  }

  return data
}
