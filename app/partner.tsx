import stylesGlobal from '@/assets/styles/global.styles'
import TicketCard from '@/components/ticket/TicketCard'
import InlineError from '@/components/ui/InlineError'
import Loading from '@/components/ui/Loading'
import { usePartner, usePartnerJourneys } from '@/hook/usePartners'
import { Ticket } from '@/types/ticket'
import { router, useLocalSearchParams, useNavigation } from 'expo-router'
import { useCallback, useLayoutEffect, useState } from 'react'
import {
    FlatList,
    RefreshControl,
    View
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function PartnerScreen() {

    const [refreshing, setRefreshing] = useState<boolean>(false)
    const {shareableId} = useLocalSearchParams<{shareableId: string}>()
    const navigation = useNavigation()

    const {
        data: partnerData
    } = usePartner(shareableId)

    useLayoutEffect(() => {
        if (partnerData?.companyName) {
        navigation.setOptions({
            title: partnerData.companyName,
        })
        }
    }, [partnerData])
    
    const {
        data: ticketsData, 
        isLoading: ticketsIsLoading,
        error: ticketsError,
        isError: isTicketsError,
        refetch: refetchPartnerJourneys
    } = usePartnerJourneys(shareableId)

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetchPartnerJourneys()
        setRefreshing(false)
    }, [])

    const ticketPress = (ticket:Ticket) => {
        router.push({
            pathname: "/ticket",
            params: {
                axisId: ticket.axisId,
                endPointId: ticket.endPoint.id,
                departureDate: ticket.departureAt
            }
        })
    }

    return (
        <GestureHandlerRootView>
            <View style={stylesGlobal.container}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={ticketsData}
                    renderItem={({ item }) => (
                        <TicketCard ticket={item} handelItemPress={ticketPress} />
                    )}
                    keyExtractor={(item, index) => index.toString()}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                />
                
                <Loading visible={ticketsIsLoading} />
                
                {isTicketsError && <InlineError message={ticketsError?.message || "Impossible de charger les tickets"} />}
            
            </View>
        </GestureHandlerRootView>
    )

}
