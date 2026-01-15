import bookingStyle from '@/assets/styles/booking.style'
import InfoItem from '@/components/boughtTicket/InfoItem'
import InlineError from '@/components/ui/InlineError'
import Loading from '@/components/ui/Loading'
import { formatToStringDate } from '@/helpers/date'
import { useBoughtTicket } from '@/hook/useBoughtTickets'
import { useAuthStore } from '@/store/auth.store'
import { Image } from 'expo-image'
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
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }>
                    {/* HEADER */}
                    <View style={bookingStyle.header}>
                        <Text style={bookingStyle.route}>
                        {boughtTicket.axis.startCity.cityName} →{" "}
                        {boughtTicket.endPoint.city.cityName}
                        </Text>
                        <Text style={bookingStyle.date}>
                        {formatToStringDate(boughtTicket.forDate)}
                        </Text>
                    </View>

                    {/* QR CARD */}
                    <View style={bookingStyle.qrCard}>
                        <Image
                            source={require("@/assets/images/qr-code.png")}
                            style={bookingStyle.qr}
                        />
                        <Text style={bookingStyle.ticketId}>
                        ID : {boughtTicket.paymentUid}
                        </Text>
                    </View>

                    {/* INFO GRID */}
                    <View style={bookingStyle.infoGrid}>
                        <InfoItem
                        label="Passagers"
                        value={boughtTicket.passengers
                            ?.map(p => `${p.firstname} ${p.lastname}`)
                            .join(", ")}
                        />
                        <InfoItem
                        label="Compagnie"
                        value={boughtTicket.axis.associatedPartner.companyName}
                        />
                        <InfoItem
                        label="Acheté le"
                        value={formatToStringDate(
                            new Date(boughtTicket.paymentInitializedAt)
                        )}
                        />
                        <InfoItem
                        label="Montant"
                        value={`${boughtTicket.payedPrice} F`}
                        highlight
                        />
                    </View>

                    {/* NOTE */}
                    <View style={bookingStyle.noteBox}>
                        <Text style={bookingStyle.note}>
                        ⚠ Présentez ce QR code à la gare pour récupérer votre billet
                        </Text>
                    </View>

                {isError && (
                    <InlineError message={ error?.message || "Impossible de charger les billets achetés"} />
                )}
            </ScrollView>
        </SafeAreaView>
    )
}
