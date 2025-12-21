import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
    ticket_item: {
        flex: 1,
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: "#EFEFEF",
        padding: 10,
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
    }  
})