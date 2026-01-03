import { StyleSheet } from "react-native";

export default StyleSheet.create({
  
    ticket_item: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 10,
        backgroundColor: "#FFFFFF",
        padding: 12,
        borderRadius: 10,

        // Android
        elevation: 3,

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
    
    //Detail
    ticket_detail_container: {
        padding: 20,
        backgroundColor: "#EFEFEF"
    },
    ticket_detail_station: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    ticket_detail_item_row: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        flexWrap: "wrap",
        marginBottom: 10,
    },
    ticket_detail_item: {
        flex: 1,
    },
    ticket_detail_item_label: {
        fontSize: 12,
        color: "#979797"
    },
    ticket_detail_item_text: {
        fontSize: 18,
        fontWeight: "bold"
    },
    ticket_detail_form_container: {
        padding: 20
    },
    ticket_detail_form_billet: {
        marginBottom: 10,
        marginTop: 10,
        fontSize: 18,
        fontWeight: "600"
    },
    ticket_detail_qr_container: {
        padding: 20,
        flex: 1,
        marginTop: 10,
        marginBottom: 20
    },
    qr_code_image: {
        justifyContent: "center",
        alignSelf: "center",
        height: 250,
        width: 250
    },
    ticket_detail_nb_title: {
        color: "red",
        fontWeight: "bold",
        fontSize: 16
    },
    ticket_detail_nb_text: {
        color: "black",
        fontWeight: "normal",
        fontSize: 16
    },
})