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
        <SafeAreaView style={{flex:1}}>
            {ticket && (
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView keyboardShouldPersistTaps="handled">
                        <View style={ticketStyles.ticket_detail_container}>
                            <Text style={ticketStyles.ticket_detail_station}>{ticket && ticket.partner.companyName}</Text>
                            <View style={ticketStyles.ticket_detail_item_row}>
                                <View style={ticketStyles.ticket_detail_item}>
                                    <Text style={ticketStyles.ticket_detail_item_label}>{ticket && 'Trajet'}</Text>
                                    <Text style={ticketStyles.ticket_detail_item_text}>{ticket && ticket.startCity.cityName} - {ticket && ticket.endCity.cityName}</Text>
                                </View>
                                <View style={[ticketStyles.ticket_detail_item,{alignItems: "flex-end"}]}>
                                    <Text style={ticketStyles.ticket_detail_item_label}>{ticket && 'Départ'}</Text>
                                    <Text style={[ticketStyles.ticket_detail_item_text,{textAlign: "right"}]}>{ticket && formatToStringDate(new Date(ticket.departureAt))}</Text>
                                </View>
                            </View>
                            <View style={ticketStyles.ticket_detail_item_row}>
                                <View style={ticketStyles.ticket_detail_item}>
                                    <Text style={ticketStyles.ticket_detail_item_label}>{ticket && 'Distance'}</Text>
                                    <Text style={ticketStyles.ticket_detail_item_text}>{ticket && formatDistance(ticket.distance)}</Text>
                                </View>
                                <View style={[ticketStyles.ticket_detail_item,{alignItems: "flex-end"}]}>
                                    <Text style={ticketStyles.ticket_detail_item_label}>{ticket && 'Durée'}</Text>
                                    <Text style={ticketStyles.ticket_detail_item_text}>{ticket && formatDuration(ticket.duration)}</Text>
                                </View>
                            </View>
                            <View style={ticketStyles.ticket_detail_item_row}>
                                <View style={ticketStyles.ticket_detail_item}>
                                    <Text style={ticketStyles.ticket_detail_item_label}>{ticket && 'Tarif'}</Text>
                                    <Text style={[ticketStyles.ticket_detail_item_text,{alignItems: "flex-end"}]}>{ticket && priceFormat(ticket.price)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={ticketStyles.ticket_detail_form_container}>
                            <Text style={ticketStyles.ticket_detail_form_billet}>Informations du passager</Text>
                            
                            <Text style={globalStyles.label}>Nombre</Text>
                            <View style={globalStyles.input}>
                                <Picker
                                    selectedValue={ticketCount}
                                    onValueChange={(itemValue) => setTicketCount(itemValue)}
                                >
                                    <Picker.Item key="1" label="1" value="1" />
                                    <Picker.Item key="2" label="2" value="2" />
                                    <Picker.Item key="3" label="3" value="3" />
                                    <Picker.Item key="4" label="4" value="4" />
                                    <Picker.Item key="5" label="5" value="5" />
                                </Picker>
                            </View>

                            <Text style={globalStyles.label}>Prenom</Text>
                            <TextInput
                            style={globalStyles.input}
                            onChangeText={(text)=>setFirstname(text)}
                            value={firstname} />
                            
                            <Text style={globalStyles.label}>Nom</Text>
                            <TextInput
                            style={globalStyles.input}
                            onChangeText={(text)=>setLastname(text)}
                            value={lastname} />
                            
                            <Text style={globalStyles.label}>Telephone</Text>
                            <TextInput
                            style={globalStyles.input}
                            keyboardType='numeric'
                            onChangeText={(text)=>setPhonenumber(text)}
                            value={phonenumber} />
                            
                            {/* <TouchableOpacity onPress={() => buyPress({axisId, endPointId, time})} style={{display: 'flex', flexWrap: 'wrap', marginBottom: 20}}>
                                <Text style={ticketStyles.custom_button}>Acheter</Text>
                                <Loading visible={true}/>
                            </TouchableOpacity> */}
                            
                            <TouchableOpacity
                                style={[
                                    globalStyles.button,
                                    isPending && { opacity: 0.6 },
                                ]}
                                disabled={isPending}
                                onPress={()=>mutate()}
                            >
                                <Text style={globalStyles.button_text}>Acheter</Text>
                                {isPending && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 10 }} />}                        
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
