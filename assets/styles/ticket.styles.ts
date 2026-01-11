import { StyleSheet } from "react-native";

export default StyleSheet.create({
    // Detail Ticket Styles
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