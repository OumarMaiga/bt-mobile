import BoughtTicketCard from '@/components/boughtTicket/BoughtTicketCard'
import InlineError from '@/components/ui/InlineError'
import Loading from '@/components/ui/Loading'
import { useBoughtTickets } from '@/hook/useBoughtTickets'
import { useAuthStore } from '@/store/auth.store'
import { BoughtTicket } from '@/types/boughtTicket'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import {
    RefreshControl,
    ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function BookingScreen() {

    const { user, token } = useAuthStore()
    const [refreshing, setRefreshing] = useState<boolean>(false)

    const {data: boughtTickets, isLoading, isError, error, refetch: refetchBoughtTickets} = useBoughtTickets(token!)
    
    if(isLoading) return <Loading visible={isLoading} />

    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetchBoughtTickets()
        setRefreshing(false)
    }, [])

    const boughtTicketPress = (boughtTicket:BoughtTicket) => {
        router.push({
            pathname: '../bookingDetail',
            params: {
                id: boughtTicket.id
            }
        })
    }

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                { boughtTickets?.map((boughtTicket) => <BoughtTicketCard key={boughtTicket.id} boughtTicket={boughtTicket} onPress={boughtTicketPress} />)}
                            
                {isError && (
                <InlineError
                    message={error?.message || 'Impossible de charger les billets ach\'éter'}
                />
                )}
            </ScrollView>
        </SafeAreaView>
    )

}
