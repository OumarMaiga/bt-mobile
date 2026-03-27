import { StyleSheet } from "react-native";

export default StyleSheet.create({

    route: {
        fontSize: 24,
        fontWeight: "800",
        // color: "#FFF",
    },

    date: {
        marginTop: 6,
        fontSize: 14,
        color: "#94A3B8",
    },

    ticketCard: {
        margin: 12,
        padding: 16,
        backgroundColor: "#FFF",
        borderRadius: 16,
        elevation: 4,
    },

    qr: {
        width: 200,
        height: 200,
    },

    ticketId: {
        marginTop: 10,
        fontSize: 14,
        color: "#64748B",
        fontWeight: "500",
    },

    separator: {
        width: "100%",
        borderStyle: "dashed",
        borderWidth: 1,
        borderColor: "#E2E8F0",
        marginVertical: 20,
    },

    infoContainer: {
        flex: 1,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
    },

    infoItem: {
        paddingVertical: 10,
    },

    infoLabel: {
        fontSize: 12,
        color: "#94A3B8",
    },

    infoValue: {
        marginTop: 4,
        fontSize: 16,
        fontWeight: "600",
        color: "#0F172A",
    },

    price: {
        fontWeight: '700',
        color: '#09CC1C',
    },

    noteBox: {
        marginHorizontal: 16,
        padding: 16,
        backgroundColor: "#FEF3C7",
        borderRadius: 16,
    },

    note: {
        textAlign: "center",
        color: "#92400E",
    },

    button: {
        margin: 16,
        backgroundColor: "#2563EB",
        padding: 16,
        borderRadius: 14,
        alignItems: "center",
    },

    buttonText: {
        color: "#FFF",
        fontWeight: "700",
        fontSize: 16,
    },
})