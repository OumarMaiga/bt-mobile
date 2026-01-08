
export type User = {
  id: number
  lastname: string
  firstname: string
  phonenumber: string
  joinAt: string
  isVerified: boolean
  isActive: boolean
  countryId: number
  country: {
    id: number
    name: string
    code: string
    identifier: string
    flagPath: string
  }
}