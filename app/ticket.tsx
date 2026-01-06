import globalStyles from '@/assets/styles/global.styles';
import ticketStyles from '@/assets/styles/ticket.styles';
import InlineError from '@/components/ui/InlineError';
import Loading from '@/components/ui/Loading';
import { formatDistance, formatDuration, priceFormat } from '@/helpers';
import { formatToStringDate } from '@/helpers/date';
import { useTicket } from '@/hook/useTickets';
import { bookTicket } from '@/services/booking.service';
import { Ticket } from '@/types/ticket';
import { Picker } from '@react-native-picker/picker';
import { useMutation } from '@tanstack/react-query';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Passenger = {
  firstname: string
  lastname: string
  phonenumber: string
}

export default function TicketScreen() {

    const [ticketCount, setTicketCount] = useState<number>(1);
    const [ticket, setTicket] = useState<Ticket|null>(null);
    const [passengers, setPassengers] = useState<Passenger[]>([
        { firstname: '', lastname: '', phonenumber: '' }
    ])
    const { axisId, endPointId, departureDate } = useLocalSearchParams<{
        axisId: string
        endPointId: string
        departureDate: string
    }>()

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
        data: ticketData, 
        isLoading: ticketIsLoading,
        isSuccess: ticketIsSuccess,
        error: ticketError,
        isError: ticketIsError 
    } = useTicket(Number(axisId), Number(endPointId), departureDate);
    
    useEffect(() => {
        if (!ticketIsSuccess || !ticketData) return;

        const newTicket: Ticket = {
            id: `${axisId}-${endPointId}-${ticketData.time}`,
            axisId: Number(axisId),

            startCity: ticketData.startCity,
            endCity: ticketData.endCity,
            endPoint: {
                id: ticketData.endPoint.id,
                cityName: ticketData.endPoint.cityName,
            },

            price: Number(ticketData.price),
            distance: Number(ticketData.distance),
            duration: Number(ticketData.duration),

            partner: ticketData.partner,

            time: ticketData.time,
            departureAt: ticketData.departureAt,
        };

        setTicket(newTicket);

    }, [ticketIsSuccess, ticketData, axisId, endPointId, departureDate]);

    const { mutate, isPending, isSuccess, data, isError, error } = useMutation({
        mutationFn: async () => {

            console.log("Acheter le ticket", {ticketCount, passengers})

            if(!ticket) throw Error("Veuillez choisir un ticket")

            const formData = new FormData()
            formData.append("departureDate", ticket.departureAt)
            formData.append("payer", "1")
            formData.append("axisId", ticket.axisId.toString())
            formData.append("endCityId", ticket.endCity.id.toString())
            formData.append("passengers", JSON.stringify(passengers))

            const response = await bookTicket(formData)

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data?.message || "Erreur lors de la réservation")
            }
            // router.push({
            //     pathname: '/',
            //     params: {
            //         country: countrySelected,
            //         phonenumber: phonenumber,
            //     },
            // })
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
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={ticketStyles.ticketCard}>
                            <Text style={ticketStyles.company}>{ticket.partner.companyName}</Text>

                            <Text style={ticketStyles.route}>
                                {ticket.startCity.cityName} → {ticket.endCity.cityName}
                            </Text>

                            <Text style={ticketStyles.date}>
                                {formatToStringDate(new Date(ticket.departureAt))}
                            </Text>

                            <View style={ticketStyles.separator} />

                            <View style={ticketStyles.infoRow}>
                                <View>
                                <Text style={ticketStyles.label}>Distance</Text>
                                <Text style={ticketStyles.value}>{formatDistance(ticket.distance)}</Text>
                                </View>

                                <View>
                                <Text style={ticketStyles.label}>Durée</Text>
                                <Text style={ticketStyles.value}>{formatDuration(ticket.duration)}</Text>
                                </View>
                            </View>

                            <View style={ticketStyles.priceBox}>
                                <Text style={ticketStyles.price}>{priceFormat(ticket.price)}</Text>
                            </View>
                        </View>

                        <View style={ticketStyles.formCard}>
                        <Text style={ticketStyles.formTitle}>Informations du passager</Text>

                        {/* <Text style={globalStyles.label}>Nombre de billet</Text>
                        <View style={globalStyles.input}>
                            <Picker
                            selectedValue={ticketCount}
                            onValueChange={setTicketCount}
                            >
                            {[1,2,3,4,5].map(n => (
                                <Picker.Item key={n} label={`${n}`} value={`${n}`} />
                            ))}
                            </Picker>
                        </View> */}
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

                                <Text style={globalStyles.label}>Téléphone</Text>
                                <TextInput
                                style={globalStyles.input}
                                keyboardType="phone-pad"
                                value={passenger.phonenumber}
                                onChangeText={text => updatePassenger(index, 'phonenumber', text)}
                                />
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
        </SafeAreaView>
    )

}
