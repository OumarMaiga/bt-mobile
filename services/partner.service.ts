import { Partner } from "@/types/partner";
import { Ticket } from "@/types/ticket";

export async function getPartners():Promise<Partner[]> {
  try{
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/partners`)
    
    const data = await response.json()
    
    if(!response.ok) throw new Error(data?.message || "Erreur lors de la récuperation des partenaires")

    return data
  } catch (error) {
    console.error(error)
    throw "Impossible de récuperer les partenaires"
  }
} 

export async function getPartner(shareableId:string):Promise<Partner|null> {
  try{
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/partners/${shareableId}`)

    const data = await response.json()

    if(!response.ok) throw new Error(data?.message || "Erreur lors de la récupération du partenaire")

    return data
  } catch (error) {
    console.error(error)
    throw "Impossible de récuperer le partenaire"
  }

}

export async function getPartnerJourneys(shareableId:string):Promise<Ticket[]> {
  try{
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/partners/${shareableId}/journeys`)

    const data = await response.json()

    if(!response.ok) throw new Error(data?.message || "Erreur lors de la récupération  des tickets du partenaire")

    return data
  } catch (error) {
    console.error(error)
    throw "Impossible de récuperer les tickets du partenaire"
  }
}