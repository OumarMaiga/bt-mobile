import stylesGlobal from '@/assets/styles/global.styles';
import styles from '@/assets/styles/home.styles';
import AutoSlider from '@/components/AutoSlider';
import InlineError from '@/components/InlineError';
import TicketCard from '@/components/TicketCard';
import { useTickets } from '@/hook/useTickets';
import { useAuthStore } from '@/store/auth.store';
import { Ticket } from '@/types/ticket';
import BottomSheet from '@gorhom/bottom-sheet';
import { useRef, useState } from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function HomeScreen() {

    const [departure, setDeparture] = useState<string>("Bamako")
    const [arrival, setArrival] = useState<string>("Kayes")
    const [departureDate, setDepartureDate] = useState<string>("2025-12-22")
    // const [arrivalDate, setArrivalDate] = useState<string>("22-12-2025")
    const bottomSheetRef = useRef<BottomSheet | null>(null);

    const { 
        data: ticketsData, 
        isLoading: ticketsIsLoading,
        error: ticketsError,
        isError: isTicketsError 
    } = useTickets({departure, arrival, departureDate})
    

    const openSearchSheet = () => {
        bottomSheetRef.current?.expand()
    };

    const ticketPress = (ticket:Ticket) => {
        console.log("ticketPress", ticket)
    } 
    const {logout} = useAuthStore()
    
    const handleLogout = () => {
        logout()
    }

    return (
        <View style={stylesGlobal.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                <>
                    <View style={{marginBottom: 20}}>
                        <AutoSlider />
                    </View>

                    <TouchableWithoutFeedback
                        onPress={openSearchSheet}>
                        <View style={styles.search_section}>
                            <Ionicons style={{padding:10,paddingLeft:20}} name="search-outline" size={20} color="#000" />
                            <View
                                style={styles.search_input}
                            >
                                <Text style={{ color: "#D9D9D9", fontSize: 18 }}>Recherche</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>

                    {/* <StationList stations={stations} stationPress={stationPress} /> */}
                </>
                }
                data={ticketsData}
                renderItem={({ item }) => (
                    <TicketCard ticket={item} handelItemPress={ticketPress} />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
            <TouchableOpacity style={stylesGlobal.button} onPress={()=>handleLogout()}>
                <Text style={stylesGlobal.button_text}>Logout</Text>
            </TouchableOpacity>
            
            {isTicketsError && <InlineError message={ticketsError?.message || "Impossible de charger les tickets"} />}
        </View>
    )

}
