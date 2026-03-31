import globalStyles from '@/assets/styles/global.styles'
import ticketStyles from '@/assets/styles/ticket.styles'
import InlineError from '@/components/ui/InlineError'
import Loading from '@/components/ui/Loading'
import { formatDistance, formatDuration, priceFormat } from '@/helpers'
import { formatToStringDate } from '@/helpers/date'
import { useTicket } from '@/hook/useTickets'
import { bookTicket } from '@/services/booking.service'
import { useAuthStore } from '@/store/auth.store'
import { Picker } from '@react-native-picker/picker'
import { useMutation } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useEffect, useState } from 'react'
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Passenger = {
  firstname: string
  lastname: string
  phonenumber?: string
}

export default function TicketScreen() {

    const { user, token } = useAuthStore()
    const [ticketCount, setTicketCount] = useState<number>(1)
    const [passengers, setPassengers] = useState<Passenger[]>([
        { firstname: user?.firstname || '', lastname: user?.lastname || '', phonenumber: user?.phonenumber || '' }
    ])
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    const { status, axisId, endPointCityId, departureDate } = useLocalSearchParams<{
        status?: string
        axisId: string
        endPointCityId: string
        departureDate: string
    }>()

     useEffect(() => {
        if (!status) return
        
        if (status === "cancel") {
            setErrorMessage("Le paiement a été annulé")
        } else if (status === "failed") {
            setErrorMessage("Le paiement a échoué")
        }

        if (status === "failed") {
            setPassengers([{ firstname: '', lastname: '', phonenumber: '' }])
            setTicketCount(1)
        }

    }, [status])

    useEffect(() => {
        setPassengers(prev => {
            const newPassengers = [...prev]

            if (ticketCount > prev.length) {
                // Ajouter des passagers
                for (let i = prev.length; i < ticketCount; i++) {
                    newPassengers.push({
                        firstname: '',
                        lastname: '',
                        phonenumber: '',
                    })
                }
            } else if (ticketCount < prev.length) {
                // Supprimer les passagers en trop
                newPassengers.length = ticketCount
            }

            return newPassengers
        })
    }, [ticketCount])

    const updatePassenger = (
        index: number,
        field: keyof Passenger,
        value: string
    ) => {
        setPassengers(prev => {
            const updated = [...prev]
            updated[index] = {
            ...updated[index],
            [field]: value,
            }
            return updated
        })
    }

    const {
        data: ticket, 
        isLoading: ticketIsLoading,
        error: ticketError,
        isError: ticketIsError,
        refetch: refetchTicket
    } = useTicket(Number(axisId), Number(endPointCityId), departureDate)
  
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetchTicket()
        setRefreshing(false)
    }, [])

    const {mutate, isPending} = useMutation({
        mutationFn: async () => {
            try {
                if(!ticket) throw Error("Veuillez choisir un ticket")

                const formData = new FormData()
                formData.append("ticketCount", ticketCount.toString())
                formData.append("departureDate", departureDate)
                formData.append("axisId", axisId)
                formData.append("endPointCityId", endPointCityId)
                formData.append("passengers", JSON.stringify(passengers))

                const response = await bookTicket(formData, token!)

                const data = await response.json()

                if (!response.ok) {
                    throw new Error(data?.message || "Erreur lors de l'achat du ticket")
                }
                
                router.push({
                    pathname: '/payment',
                    params: {
                        url: data.paymentUrl,
                        axisId: axisId, 
                        endPointCityId: endPointCityId, 
                        departureDate: departureDate
                    },
                })
            } catch(error) {
                console.error(error)
                if (error instanceof Error) {
                    setErrorMessage(error.message)
                } else {
                    setErrorMessage("Une erreur est survenue")
                }
            }
        },
    })

    return (
        <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
            {ticket && (
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
                contentContainerStyle={{ paddingBottom: 180 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView keyboardShouldPersistTaps="handled"
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>
                        <View style={ticketStyles.ticketCard}>
                            <Text style={ticketStyles.company}>{ticket.partner.companyName}</Text>

                            <Text style={ticketStyles.route}>
                                {ticket.startCity.cityName} → {ticket.endPoint.city.cityName}
                            </Text>

                            <Text style={ticketStyles.date}>
                                {formatToStringDate(new Date(departureDate))}
                            </Text>

                            <View style={ticketStyles.separator} />

                            <View style={ticketStyles.infoRow}>
                                <View>
                                <Text style={ticketStyles.label}>Distance</Text>
                                <Text style={ticketStyles.value}>{formatDistance(ticket.endPoint.distance)}</Text>
                                </View>

                                <View>
                                <Text style={ticketStyles.label}>Durée</Text>
                                <Text style={ticketStyles.value}>{formatDuration(ticket.endPoint.duration)}</Text>
                                </View>
                            </View>

                            <View style={ticketStyles.priceBox}>
                                <Text style={ticketStyles.price}>{priceFormat(ticket.endPoint.price)}</Text>
                            </View>
                        </View>

                        <View style={ticketStyles.formCard}>
                        <Text style={ticketStyles.formTitle}>Informations du passager</Text>
                        <Text style={globalStyles.label}>Nombre de billet</Text>
                        <View style={globalStyles.input}>
                        <Picker
                            selectedValue={ticketCount}
                            onValueChange={(value) => setTicketCount(Number(value))}
                        >
                            {[1, 2, 3, 4, 5].map(n => (
                            <Picker.Item key={n} label={`${n}`} value={n} />
                            ))}
                        </Picker>
                        </View>

                        
                        {passengers.map((passenger, index) => (
                            <View key={index} style={{ marginBottom: 10 }}>
                                <Text style={ticketStyles.passengerSectionTitle}>
                                    Passager {index + 1}
                                </Text>

                                <Text style={globalStyles.label}>Prénom</Text>
                                <TextInput
                                    style={globalStyles.input}
                                    value={passenger.firstname}
                                    onChangeText={text => updatePassenger(index, 'firstname', text)}
                                />

                                <Text style={globalStyles.label}>Nom</Text>
                                <TextInput
                                    style={globalStyles.input}
                                    value={passenger.lastname}
                                    onChangeText={text => updatePassenger(index, 'lastname', text)}
                                />
                                {index === 0 && (
                                    <>
                                        <Text style={globalStyles.label}>Téléphone</Text>
                                        <TextInput
                                            style={globalStyles.input}
                                            keyboardType="phone-pad"
                                            value={passenger.phonenumber}
                                            onChangeText={text => updatePassenger(index, 'phonenumber', text)}
                                        />
                                    </>
                                )}
                            </View>
                        ))}

                        <TouchableOpacity
                            style={[globalStyles.button, isPending && { opacity: 0.6 }]}
                            disabled={isPending}
                            onPress={()=>mutate()}
                        >
                            <Text style={globalStyles.button_text}>Acheter le billet</Text>
                            {isPending && <ActivityIndicator color="#fff" style={{ marginLeft: 8 }} />}
                        </TouchableOpacity>
                    </View>

                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        )}
            <Loading visible={ticketIsLoading} />
            {ticketIsError && <InlineError message={ticketError?.message || "Impossible de charger l'axe"} />}
            {errorMessage && <InlineError message={errorMessage} />}
        </SafeAreaView>
    )

}
