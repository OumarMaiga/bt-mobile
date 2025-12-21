import stylesGlobal from '@/assets/styles/global.styles';
import styles from '@/assets/styles/home.styles';
import AutoSlider from '@/components/AutoSlider';
import InlineError from '@/components/InlineError';
import TicketCard from '@/components/TicketCard';
import { formatToISODate } from '@/helpers/date';
import { useCities } from '@/hook/useCities';
import { useTickets } from '@/hook/useTickets';
import { useAuthStore } from '@/store/auth.store';
import { Ticket } from '@/types/ticket';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { useRef, useState } from 'react';
import {
    FlatList,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from 'react-native-vector-icons/Ionicons';


export default function HomeScreen() {

    const [departure, setDeparture] = useState<string|null>(null)
    const [arrival, setArrival] = useState<string|null>(null)
    const [departureDate, setDepartureDate] = useState<string|null>(null)
    // const [arrivalDate, setArrivalDate] = useState<string>("22-12-2025")
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const bottomSheetRef = useRef<BottomSheet | null>(null);

    const { 
        data: ticketsData, 
        isLoading: ticketsIsLoading,
        error: ticketsError,
        isError: isTicketsError 
    } = useTickets({departure:"Bamako", arrival:"Kayes", departureDate:"2025-12-22"})
    
    const {
        data: citiesData
    } = useCities()

    const openSearchSheet = () => {
        bottomSheetRef.current?.expand()
    };

    const ticketPress = (ticket:Ticket) => {
        console.log("ticketPress", ticket)
    } 
    
    // Ouvrir le DatePicker
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    // Fermer le DatePicker
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    // Gérer la date sélectionnée
    const dateSelected = (date: Date) => {
        const formattedDate = formatToISODate(date);
        setDepartureDate(formattedDate);
        hideDatePicker();
    };
    
    const searchPress = () => {
        console.log("searchPress")
    }
    
    const {logout} = useAuthStore()
    
    const handleLogout = () => {
        logout()
    }

    return (
        <GestureHandlerRootView>
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
                <TouchableOpacity style={[stylesGlobal.button,{backgroundColor:"red", margin:20}]} onPress={()=>handleLogout()}>
                    <Text style={stylesGlobal.button_text}>Déconnexion</Text>
                </TouchableOpacity>
                
                {isTicketsError && <InlineError message={ticketsError?.message || "Impossible de charger les tickets"} />}
            
                {/* BottomSheet séparé */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={['60%']}
                    enablePanDownToClose={true}
                >
                    <BottomSheetView>
                        <View style={styles.book_container}>
                            <Text style={styles.book_title}>Reservez votre billet</Text>
                            <Text style={stylesGlobal.label}>Départ</Text>
                            <View style={stylesGlobal.input}>
                                <Picker
                                selectedValue={departure}
                                onValueChange={(itemValue) => setDeparture(itemValue)}
                                >
                                <Picker.Item label="Bamako" value="Bamako" />
                                {citiesData?.map((city,index) => (
                                    <Picker.Item key={index} label={city.cityName} value={city.cityName} />
                                ))}
                                </Picker>
                            </View>
                            <Text style={stylesGlobal.label}>Destination</Text>
                            <View style={stylesGlobal.input}>
                            <Picker
                                    selectedValue={arrival}
                                    onValueChange={(itemValue) => setArrival(itemValue)}>
                                    <Picker.Item label="" value="" />
                                    {citiesData?.map((city,index) => (
                                    <Picker.Item key={index} label={city.cityName} value={city.cityName} />
                                    ))}
                            </Picker>
                            </View>
                            
                            <Text style={stylesGlobal.label}>Date</Text>
                            <TouchableOpacity style={[stylesGlobal.input,{justifyContent: 'center'}]}
                                onPress={showDatePicker}>
                                {isDatePickerVisible && (
                                    <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={dateSelected}
                                    onCancel={hideDatePicker}
                                    />
                                )}
                            <Text style={{fontSize: 18}}>{departureDate}</Text>
                            </TouchableOpacity>
                            
                            <TouchableOpacity onPress={searchPress} style={stylesGlobal.button}>
                                <Text style={stylesGlobal.button_text}>Recherche</Text>
                            </TouchableOpacity>          
                        </View>  
                    </BottomSheetView>
                </BottomSheet>
            </View>
        </GestureHandlerRootView>
    )

}
