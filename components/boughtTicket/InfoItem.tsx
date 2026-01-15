import { StyleSheet, Text, View } from "react-native";

interface InfoItemProps {
  label: string
  value: string
  highlight?: boolean
}

export default function ({label, value, highlight=false}: InfoItemProps) {
    return (
        <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={[styles.infoValue, highlight && styles.highlight]}>
            {value}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    
    infoItem: {
        width: "50%",
        padding: 16,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: "#F1F5F9",
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


    highlight: {
        color: "#DC2626",
        fontWeight: "700",
    },
        
})