import { priceFormat } from '@/helpers';
import { formatToStringDate } from '@/helpers/date';
import { BoughtTicket } from '@/types/boughtTicket';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  boughtTicket: BoughtTicket;
  onPress: (ticket: BoughtTicket) => void;
};

export default function BoughtTicketCard({ boughtTicket, onPress }: Props) {

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.card}
      onPress={() => onPress(boughtTicket)}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.company}>{boughtTicket.axis.associatedPartner.companyName}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Payé</Text>
        </View>
      </View>

      {/* Trajet */}
      <View style={styles.row}>
        <Text style={styles.label}>Trajet</Text>
        <Text style={styles.value}>
          {boughtTicket.axis.startCity.cityName} → {boughtTicket.endPoint.city.cityName}
        </Text>
      </View>

      {/* Date */}
      <View style={styles.row}>
        <Text style={styles.label}>Départ</Text>
        <Text style={styles.value}>
          {formatToStringDate(new Date(boughtTicket.forDate))}
        </Text>
      </View>

      {/* Prix */}
      <View style={styles.row}>
        <Text style={styles.label}>Montant payé</Text>
        <Text style={styles.price}>
          {priceFormat(boughtTicket.payedPrice)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginVertical: 8,

    // iOS
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },

    // Android
    elevation: 4,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  company: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },

  badge: {
    backgroundColor: '#E6F9EA',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },

  badgeText: {
    color: '#09CC1C',
    fontSize: 12,
    fontWeight: '600',
  },

  row: {
    marginBottom: 10,
  },

  label: {
    fontSize: 12,
    color: '#8A8A8A',
    marginBottom: 2,
  },

  value: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },

  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#09CC1C',
  },
});
