import BoughtTicketCard from '@/components/boughtTicket/BoughtTicketCard';
import InlineError from '@/components/ui/InlineError';
import Loading from '@/components/ui/Loading';
import { useBoughtTickets } from '@/hook/useBoughtTickets';
import { useAuthStore } from '@/store/auth.store';
import { BoughtTicket } from '@/types/boughtTicket';
import { router } from 'expo-router';
import {
    ScrollView
} from 'react-native';


export default function BookingScreen() {

    const { user, token } = useAuthStore()

    if (!user || !token) return <Loading visible />

    const {data: boughtTickets, isLoading, isError, error} = useBoughtTickets(token)

    if(isLoading) return <Loading visible={isLoading} />
    
    const boughtTicketPress = (boughtTicket:BoughtTicket) => {
        router.push({
            pathname: '../bookingDetail',
            params: {
                id: boughtTicket.id
            }
        })
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            { boughtTickets?.map((boughtTicket) => <BoughtTicketCard key={boughtTicket.id} boughtTicket={boughtTicket} onPress={boughtTicketPress} />)}
                        
            {isError && (
            <InlineError
                message={error?.message || 'Impossible de charger les billets ach\'éter'}
            />
            )}
        </ScrollView>
    )

}
