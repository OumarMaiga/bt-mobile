export type BoughtTicket = {
    id: number,
    paymentUid: string,
    payerId: number,
    axisId: number,
    endPointId: number,
    payedPrice: number,
    paymentInitializedAt: Date,
    paymentCompleteAt: Date | null,
    countOfBoughtPlaces: number,
    passengers: {
        firstname: string,
        lastname: string,
        phonenumber?: string
    }[],
    paymentStatus: number,
    forDate: Date,
    paymentData: {
        uniqueId: string,
        checkDatas: {
            amount: number,
            channel: string,
            currency: string,
            pay_token: string,
            notif_token: string
        }
    },
    axis: {
        id: number,
        partnerId: number,
        startCityId: number,
        endCityId: number,
        totalPlaces: number,
        adminId: number,
        createdAt: Date,
        associatedPartner: {
          id: number,
          location: string,
          companyName: string ,
          phonenumber: string,
          logoPath: string,
          imagePath: string,
          isActive: true,
          countryId: number,
          shareableId: string
        },
        startCity: {
          id: number,
          cityName: string,
          countryId: number
        },
        endCity: {
          id: number,
          cityName: string,
          countryId: number
        }
    },
    endPoint: {
        id: number,
        cityId: number,
        axisId: number,
        order: number,
        price: number,
        commission: number,
        isAvailable: boolean,
        distance: number,
        duration: number,
        city: {
            id: number,
            cityName: string,
            countryId: number
        },
    }
}