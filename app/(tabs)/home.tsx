import stylesGlobal from '@/assets/styles/global.styles';
import styles from '@/assets/styles/home.styles';
import PartnersList from '@/components/partner/PartnersList';
import TicketCard from '@/components/ticket/TicketCard';
import AutoSlider from '@/components/ui/AutoSlider';
import InlineError from '@/components/ui/InlineError';
import Loading from '@/components/ui/Loading';
import { formatToISODate } from '@/helpers/date';
import { useCities } from '@/hook/useCities';
import { usePartners } from '@/hook/usePartners';
import { useTickets } from '@/hook/useTickets';
import { useAuthStore } from '@/store/auth.store';
import { Partner } from '@/types/partner';
import { Ticket } from '@/types/ticket';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { router } from 'expo-router';
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
    } = useTickets()
    
    const {
        data: citiesData
    } = useCities()

    const {
        data: partnersData,
        isLoading: isPartnersLoading,
        isSuccess: partnersIsSuccess,
        isError: isPartnersError,
        error: partnersError
    } = usePartners()

    const partners = partnersIsSuccess ? partnersData : []

    const openSearchSheet = () => {
        bottomSheetRef.current?.expand()
    };
    
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
        router.push({
            pathname: '/search',
            params: {
                departure: departure,
                arrival: arrival,
                departureDate: departureDate
            }
        })
    }

    const partnerPress = (partner:Partner) => {
        router.push({
            pathname: '../partner',
            params: {shareableId: partner.shareableId}
        })
    }

    const ticketPress = (ticket:Ticket) => {
        router.push({
            pathname: "../ticket",
            params: {
                axisId: ticket.axisId,
                endPointId: ticket.endPoint.id,
                departureDate: ticket.departureAt
            }
        })
    } 
    
    const {logout} = useAuthStore()
    
    const handleLogout = () => {
        logout()
    }

    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <View style={{flex:1}}>
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
                                    <Text style={{ color: "#D9D9D9", fontSize: 18 }}>Où allez-vous ?</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>

                        <PartnersList partners={partners} handelItemPress={partnerPress} />
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

                <Loading visible={ticketsIsLoading || isPartnersLoading} />
                
                {isTicketsError && <InlineError message={ticketsError?.message || "Impossible de charger les tickets"} />}
                {isPartnersError && <InlineError message={partnersError?.message || "Impossible de charger les partenaires"} />}
            
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
                                {/* <Picker.Item label="" value="" /> */}
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
