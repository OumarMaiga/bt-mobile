import { API_BASE_URL } from "@/config/env"
import { Partner } from "@/types/partner"
import { Ticket } from "@/types/ticket"

export async function getPartners():Promise<Partner[]> {

  const response = await fetch(`${API_BASE_URL}/partners`)
  
  const data = await response.json()
  
  if(!response.ok) throw new Error(data?.message || "Erreur lors de la récuperation des partenaires")

  return data
} 

export async function getPartner(shareableId:string):Promise<Partner|null> {
  
  const response = await fetch(`${API_BASE_URL}/partners/${shareableId}`)

  const data = await response.json()

  if(!response.ok) throw new Error(data?.message || "Erreur lors de la récupération du partenaire")

  return data
}

export async function getPartnerJourneys(shareableId:string):Promise<Ticket[]> {
  
  const response = await fetch(`${API_BASE_URL}/partners/${shareableId}/journeys`)

  const data = await response.json()

  if(!response.ok) throw new Error(data?.message || "Erreur lors de la récupération  des tickets du partenaire")

  return data
}