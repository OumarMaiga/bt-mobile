import { BoughtTicket } from "@/types/boughtTicket"

export async function bookTicket(formData: FormData, token: string): Promise<Response> {
    return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/payment/init`, {
        method: 'POST',
        body: formData,
        headers: {
            "user-auth-token": token
        }
    })
}

export async function getBoughtTicketFromPaymentUid(paymentUid: string):Promise<BoughtTicket> {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/payment/data?payment-uid=${paymentUid}`)
    
    const data = await response.json()
    
    if(!response.ok) {
      throw new Error(data?.message || "Erreur lors de la récuperation du ticket acheté")
    }

    return data
  } catch (error) {
    console.error(error)
    throw "Impossible de récuperer les villes"
  }
  
} 