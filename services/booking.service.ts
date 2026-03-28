export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;

export async function bookTicket(formData: FormData): Promise<Response> {
    return await fetch(`${API_BASE_URL}/payment/init`, {
        method: 'POST',
        body: formData,
    })
}