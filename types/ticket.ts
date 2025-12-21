export interface Ticket {
  id: string;
  axisId: number,
  startCity: {
    id: number,
    cityName: string
  },
  endCity: {
    id: number,
    cityName: string
  },
  price: number,
  distance: number,
  duration: number,
  partner: {
    id: number,
    shareableId: string,
    companyName: string,
    logoPath: string,
    phonenumber: string
  },
  time: string
}