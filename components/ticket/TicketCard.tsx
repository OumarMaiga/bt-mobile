import styles from '@/assets/styles/ticket.styles';
import { priceFormat } from "@/helpers";
import { formatToStringDate } from '@/helpers/date';
import { Ticket } from "@/types/ticket";
import { Text, TouchableOpacity, View } from "react-native";

export default function TicketCard({ticket, handelItemPress}: {ticket: Ticket, handelItemPress: (ticket: Ticket) => void}) {
    return (
        <TouchableOpacity style={styles.ticket_item} key={ticket.id}
            onPress={() => handelItemPress(ticket)}>
            <View style={styles.ticket_item_top_container}>
                <Text style={styles.ticket_station}>{ticket.partner.companyName}</Text>
                <Text style={styles.ticket_trajet_price}>{priceFormat(ticket.price)}</Text>
            </View>
            <View style={styles.dashed_line} />
            <View style={styles.ticket_trajet}>
                <View style={styles.ticket_depart}>
                    <Text style={styles.ticket_depart_label}>Depart</Text>
                    <Text style={styles.ticket_depart_value}>{ticket.startCity.cityName}</Text>
                </View>
                <View style={styles.ticket_destination}>
                    <Text style={styles.ticket_destination_label}>Destination</Text>
                    <Text style={styles.ticket_destination_value}>{ticket.endCity.cityName}</Text>
                </View>
            </View>
            <View style={styles.ticket_item_bottom_container}>
                <Text style={styles.ticket_trajet_date}>{formatToStringDate(new Date(ticket.departureAt))}</Text>
                <Text style={styles.custom_button}>Reservez</Text>
            </View>
        </TouchableOpacity>
    )
}