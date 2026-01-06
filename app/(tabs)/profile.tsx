import profileStyle from '@/assets/styles/profile.style'
import Loading from '@/components/ui/Loading'
import { useAuthStore } from '@/store/auth.store'
import { Ionicons } from '@expo/vector-icons'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function ProfileScreen() {
  const { user, token  } = useAuthStore()
  console.log({user, token})

  if (!token) {
    return (
      <Loading visible={true} />
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={profileStyle.profile_header_container}>
          <Ionicons name="person-circle-outline" size={90} color="#fff" />
          <Text style={profileStyle.profile_header_title}>
            {user?.firstname} {user?.lastname}
          </Text>
          <Text style={profileStyle.profile_header_subtitle}>
            Profil utilisateur
          </Text>
        </View>

        {/* Section */}
        <Text style={profileStyle.sectionTitle}>
          Informations personnelles
        </Text>

        <View style={profileStyle.card}>
          {/* Téléphone */}
          <View style={profileStyle.infoRow}>
            <View style={profileStyle.iconBox}>
              <Ionicons name="call-outline" size={20} color="#09CC1C" />
            </View>
            <View>
              <Text style={profileStyle.label}>Téléphone</Text>
              <Text style={profileStyle.value}>{user?.phonenumber}</Text>
            </View>
          </View>
        </View>

        {/* Bouton */}
        <TouchableOpacity style={profileStyle.primaryButton}>
          <Text style={profileStyle.primaryButtonText}>
            Mettre à jour le profil
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
