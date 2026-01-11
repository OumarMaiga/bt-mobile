import BoughtTicketCard from '@/components/boughtTicket/BoughtTicketCard';
import InlineError from '@/components/ui/InlineError';
import Loading from '@/components/ui/Loading';
import { useBoughtTickets } from '@/hook/useBoughtTickets';
import { useAuthStore } from '@/store/auth.store';
import { BoughtTicket } from '@/types/boughtTicket';
import {
    ScrollView,
    View
} from 'react-native';


export default function PurchaseScreen() {

    const { user, token } = useAuthStore()

    if (!user || !token) return <Loading visible />

    const {data: boughtTickets, isLoading, isError, error} = useBoughtTickets(token)

    const boughtTicketPress = (boughtTicket:BoughtTicket) => {
        console.log('bought ticket press')
    }

    return (
        <ScrollView 
            contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20,
            }}>

            { boughtTickets?.map((boughtTicket) => <BoughtTicketCard key={boughtTicket.id} boughtTicket={boughtTicket} onPress={boughtTicketPress} />)}
            
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loading visible={isLoading} />
            </View>
            
            {isError && (
            <InlineError
                message={error?.message || 'Impossible de charger les billets ach\'éter'}
            />
            )}
        </ScrollView>
    )

}
