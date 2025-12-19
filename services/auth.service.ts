import { API_BASE_URL } from '@/config/env'

/**
 * Initialisation de la connexion
 * @param formData 
 * @returns 
 */
export async function loginApi(formData: FormData):Promise<Response> {
  return await fetch(`${API_BASE_URL}/login/step/1`, {
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
  return await fetch(`${API_BASE_URL}/login/step/2`, {
    method: 'POST',
    body: formData
  })
}