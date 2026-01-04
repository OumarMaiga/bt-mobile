import globalStyles from '@/assets/styles/global.styles';
import ticketStyles from '@/assets/styles/ticket.styles';
import InlineError from '@/components/ui/InlineError';
import Loading from '@/components/ui/Loading';
import { formatDistance, formatDuration, priceFormat } from '@/helpers';
import { formatToStringDate } from '@/helpers/date';
import { useTicket } from '@/hook/useTickets';
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


export default function TicketScreen() {

    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [phonenumber, setPhonenumber] = useState<string>("");
    const [ticketCount, setTicketCount] = useState<number>(1);
    const [ticket, setTicket] = useState<Ticket|null>(null);
    
    const { axisId, endPointId, departureDate } = useLocalSearchParams<{
        axisId: string
        endPointId: string
        departureDate: string
    }>()

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

            console.log("Acheter le ticket", {firstname, lastname, phonenumber, ticketCount, axisId, endPointId, departureDate})


            // const time = (selectedTicket?.time || "").replace("h", ":")
            // const datetimeString = `${departureDate}T${time}:00`
            // const fullDateTime = new Date(datetimeString)

            // const formData = new FormData(formElement)
            // formData.append("departureDate", fullDateTime.toISOString())
            // formData.append("payer", "1")
            // formData.append("axisId", selectedTicket?.axisId.toString() || "")
            // formData.append("endCityId", selectedTicket?.endCity.id.toString() || "")

            // const passengers = Array.from({ length: ticketCount }).map((_, index) => ({
            //     firstname: formData.get(`firstname-${index}`),
            //     lastname: formData.get(`lastname-${index}`),
            //     phonenumber: formData.get(`phonenumber-${index}`),
            // }));

            // for (let i = 0; i < ticketCount; i++) {
            //     formData.delete(`firstname-${i}`)
            //     formData.delete(`lastname-${i}`)
            //     formData.delete(`phonenumber-${i}`)
            // }

            // formData.append("passengers", JSON.stringify(passengers))
        //     const response = await loginApi(formData)

        //     const data = await response.json()
            
        //     if(!response.ok) {
        //         throw new Error(data?.message || "Erreur lors de l'authentification")
        //     }
            
        //     router.push({
        //         pathname: '/verify',
        //         params: {
        //             country: countrySelected,
        //             phonenumber: phonenumber,
        //         },
        //     })
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

                        <Text style={globalStyles.label}>Nombre</Text>
                        <View style={globalStyles.input}>
                            <Picker
                            selectedValue={ticketCount}
                            onValueChange={setTicketCount}
                            >
                            {[1,2,3,4,5].map(n => (
                                <Picker.Item key={n} label={`${n}`} value={`${n}`} />
                            ))}
                            </Picker>
                        </View>

                        <Text style={globalStyles.label}>Prénom</Text>
                        <TextInput style={globalStyles.input} value={firstname} onChangeText={setFirstname} />

                        <Text style={globalStyles.label}>Nom</Text>
                        <TextInput style={globalStyles.input} value={lastname} onChangeText={setLastname} />

                        <Text style={globalStyles.label}>Téléphone</Text>
                        <TextInput
                            style={globalStyles.input}
                            keyboardType="phone-pad"
                            value={phonenumber}
                            onChangeText={setPhonenumber}
                        />

                        <TouchableOpacity
                            style={[globalStyles.button, isPending && { opacity: 0.6 }]}
                            disabled={isPending}
                            // onPress={mutate}
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
