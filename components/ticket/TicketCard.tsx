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
            </View>
        </TouchableOpacity>
    )
}

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  
    ticket_item: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 10,
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 10,

        // Android
        elevation: 1,

        // iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        // couleur principale
        borderLeftWidth: 5,
        borderLeftColor: "#09CC1C",
    },
    ticket_item_top_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    dashed_line: {
        borderTopWidth: 2,
        borderTopColor: '#AAAAAA',
        borderStyle: 'dashed',
        marginVertical: 10
      },
    ticket_trajet: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10
    },
    ticket_station: {
        fontSize: 20,
        fontWeight: "bold"
    },
    ticket_trajet_price: {
        fontSize: 18,
        color: "#22812B",
        fontWeight: 600
    },
    ticket_depart: {
        flex: 1
    },
    ticket_depart_label: {
        fontSize: 12,
        color: "#979797"
    },
    ticket_depart_value: {
        fontSize: 20,
        fontWeight: "bold"
    },
    ticket_destination: {
        alignItems: "flex-end",
        flex: 1
    },
    ticket_destination_label: {
        fontSize: 12,
        color: "#979797"
    },
    ticket_destination_value: {
        fontSize: 20,
        fontWeight: "bold"
    },
    ticket_item_bottom_container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end"
    },
    ticket_trajet_date: {
        fontSize: 14,
    },
    custom_button: {
        backgroundColor: "#22812B",
        color: "#fff",
        paddingHorizontal: 10,
        paddingVertical: 4,
        fontSize: 18,
    },
    
    // //Detail Ticket Styles
    ticketCard: {
        margin: 15,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
        elevation: 1,
    },

    company: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 4,
    },

    route: {
        fontSize: 18,
        fontWeight: "600",
    },

    date: {
        marginTop: 4,
        color: "#666",
    },

    separator: {
        height: 1,
        backgroundColor: "#EEE",
        marginVertical: 15,
    },

    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    label: {
        fontSize: 12,
        color: "#888",
    },

    value: {
        fontSize: 16,
        fontWeight: "600",
    },

    priceBox: {
        marginTop: 15,
        alignItems: "flex-end",
    },

    price: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#11A821",
    },

    formCard: {
        margin: 15,
        padding: 20,
        backgroundColor: "#fff",
        borderRadius: 16,
    },

    formTitle: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 15,
    },

    passengerSectionTitle: {
        fontSize: 16,
        fontWeight: "600",
        marginTop: 15,
        marginBottom: 10,
    },
})