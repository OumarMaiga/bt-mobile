export async function bookTicket(formData: FormData): Promise<Response> {
    return await fetch(`${process.env.BASE_API_URL}/payment/init`, {
        method: 'POST',
        body: formData,
    })
}