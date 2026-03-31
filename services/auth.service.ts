/**
 * Initialisation de la connexion
 * @param formData 
 * @returns 
 */
export async function loginApi(formData: FormData):Promise<Response> {
  return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login/step/1`, {
    method: 'POST',
    body: formData
  })
}

/**
 * Verification du code de connexion
 * @param formData
 * @returns
 */
export async function verifyCode(formData: FormData):Promise<any> {
  return await fetch(`${process.env.EXPO_PUBLIC_API_URL}/login/step/2`, {
    method: 'POST',
    body: formData
  })
}