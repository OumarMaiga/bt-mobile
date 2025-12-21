export interface Partner {
  shareableId: string,
  imagePath: string,
  logoPath: string,
  location: string,
  phonenumber: string,
  country: {
    id: number,
    identifier: string,
    name: string,
    code: string,
    flagPath: string
  },
  companyName: string
}