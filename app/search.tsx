import stylesGlobal from '@/assets/styles/global.styles'
import TicketCard from '@/components/ticket/TicketCard'
import InlineError from '@/components/ui/InlineError'
import Loading from '@/components/ui/Loading'
import { useSearchedTickets } from '@/hook/useTickets'
import { Ticket } from '@/types/ticket'
import { router, useLocalSearchParams } from 'expo-router'
import { useCallback, useState } from 'react'
import {
    FlatList,
    RefreshControl,
    View
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'


export default function SearchScreen() {

    const [refreshing, setRefreshing] = useState<boolean>(false)

    const { departure, arrival, departureDate } = useLocalSearchParams<{
        departure: string
        arrival: string
        departureDate: string
    }>()

    const {
        data: ticketsData, 
        isLoading: ticketsIsLoading,
        error: ticketsError,
        isError: isTicketsError,
        refetch: refetchSearchedTickets
    } = useSearchedTickets({departure:departure, arrival:arrival, departureDate:departureDate})

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetchSearchedTickets()
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
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                    keyExtractor={(item, index) => index.toString()}
                />
                
                <Loading visible={ticketsIsLoading} />
                
                {isTicketsError && <InlineError message={ticketsError?.message || "Impossible de charger les tickets"} />}
            
            </View>
        </GestureHandlerRootView>
    )

}
