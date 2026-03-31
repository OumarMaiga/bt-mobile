import { Country } from '@/types/country';

export async function getCountries(): Promise<Country[]> {
  try{
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/countries`)

    const data = await response.json()

    if(!response.ok) {
      throw new Error(data?.message ?? "Erreur lors de la récuperation des pays")
    }

    return data
  } catch (error) {
    console.error(error)
    throw "Impossible de récuperer les pays"
  }

}
