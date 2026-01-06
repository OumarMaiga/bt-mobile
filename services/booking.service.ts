import { API_BASE_URL } from "@/config/env";

export async function bookTicket(formData: FormData): Promise<Response> {
    return await fetch(`${API_BASE_URL}/payment/init`, {
        method: 'POST',
        body: formData,
    })
}