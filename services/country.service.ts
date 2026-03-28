import { Country } from '@/types/country';

export async function getCountries(): Promise<Country[]> {
  
  const response = await fetch(`${process.env.BASE_API_URL}/countries`)

  const data = await response.json()

  if(!response.ok) {
    throw new Error(data?.message ?? "Erreur lors de la récuperation des pays")
  }

  return data
}
