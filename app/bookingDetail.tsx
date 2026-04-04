import bookingStyle from '@/assets/styles/booking.style'
import Loading from '@/components/ui/Loading'
import { formatPhoneNumber, priceFormat } from '@/helpers'
import { formatToStringDate } from '@/helpers/date'
import { useBoughtTicket } from '@/hook/useBoughtTickets'
import { useAuthStore } from '@/store/auth.store'
import { useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import {
    RefreshControl,
    ScrollView,
    Text,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function BookingDetailScreen() {

    const [refreshing, setRefreshing] = useState<boolean>(false)
    
    const { token } = useAuthStore()

    const { id } = useLocalSearchParams<{id: string}>()

    const {data: boughtTicket, isLoading, isError, error, refetch: refetchBoughtTicket} = useBoughtTicket(token!, Number(id))

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetchBoughtTicket()
        setRefreshing(false)
    }, [])

    if(isLoading || !boughtTicket) return <Loading visible />

    return (
        <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                {/* TICKET CARD */}
                <View style={bookingStyle.ticketCard}>
                    {/* HEADER */}
                    <View style={{marginBottom: 12}}>
                        <Text style={bookingStyle.route}>
                            {boughtTicket.axis.startCity.cityName} →{" "}
                            {boughtTicket.endPoint.city.cityName}
                        </Text>
                        <Text style={bookingStyle.date}>
                            {formatToStringDate(boughtTicket.forDate)}
                        </Text>
                    </View>

                    
                    {/* INFOS */}
                    <View style={bookingStyle.infoContainer}>
                        
                        <View style={bookingStyle.infoItem}>
                            <Text style={bookingStyle.infoLabel}>Passagers</Text>
                            <Text style={bookingStyle.infoValue}>
                                {boughtTicket.passengers?.map(p => `${p.firstname} ${p.lastname}`).join(", ")}
                            </Text>
                        </View>
                        <View style={[bookingStyle.infoItem, {alignItems: "flex-end"}]}>
                            <Text style={bookingStyle.infoLabel}>Téléphone</Text>
                            <Text style={bookingStyle.infoValue}>
                                {boughtTicket.passengers?.map(p => formatPhoneNumber(p.phonenumber || "")).join(", ")}
                            </Text>
                        </View>
                    </View>
                    <View style={bookingStyle.infoContainer}>
                        <View style={[bookingStyle.infoItem, {alignItems: "flex-end"}]}>
                            <Text style={bookingStyle.infoLabel}>Compagnie</Text>
                            <Text style={bookingStyle.infoValue}>
                                {boughtTicket.axis.associatedPartner.companyName}
                            </Text>
                        </View>
                        <View style={[bookingStyle.infoItem, {alignItems: "flex-end"}]}>
                            <Text style={bookingStyle.infoLabel}>Montant payé</Text>
                            <Text style={[bookingStyle.infoValue, bookingStyle.price]}>
                                {priceFormat(boughtTicket.payedPrice)}
                            </Text>
                        </View>
                    </View>
                    <View style={bookingStyle.infoContainer}>
                        <View style={bookingStyle.infoItem}>
                            <Text style={bookingStyle.infoLabel}>Acheté le</Text>
                            <Text style={bookingStyle.infoValue}>
                                {formatToStringDate(new Date(boughtTicket.paymentInitializedAt))}
                            </Text>
                        </View>
                    </View>

                    <View style={{alignItems: "center", marginTop: 10}}>

                        {/* DASH SEPARATOR */}
                        <View style={bookingStyle.separator} />
                        
                        {/* QR */}
                        {/* <Image
                            source={require("@/assets/images/qr-code.png")}
                            style={bookingStyle.qr}
                        /> */}

                        <Text style={bookingStyle.ticketId}>
                            ID: {boughtTicket.paymentUid}
                        </Text>

                    </View>
                </View>

                {/* NOTE */}
                {/* <View style={bookingStyle.noteBox}>
                    <Text style={bookingStyle.note}>
                        ⚠ Présentez ce QR code à la gare pour récupérer votre billet
                    </Text>
                </View> */}

                {/* BUTTON */}
                {/* <TouchableOpacity style={bookingStyle.button}>
                    <Text style={bookingStyle.buttonText}>Télécharger le billet</Text>
                </TouchableOpacity> */}

            </ScrollView>
        </SafeAreaView>
    )
}
