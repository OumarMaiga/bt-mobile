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
  endPoint: {
    id: number,
    price: number,
    distance: number,
    duration: number,
    city: {
      id: number,
      cityName: string
    }
  },
  partner: {
    id: number,
    shareableId: string,
    companyName: string,
    logoPath: string,
    phonenumber: string
  },
  time: string,
  departureAt: string,
}