import profileStyle from '@/assets/styles/profile.style'
import Loading from '@/components/ui/Loading'
import { useAuthStore } from '@/store/auth.store'
import { Ionicons } from '@expo/vector-icons'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

export default function ProfileScreen() {
  const { user, token, logout } = useAuthStore()
  
  if (!token || !user) {
    return (
      <Loading visible={true} />
    )
  }

  const onEditPress = () => {
    router.push('../edit-profile')
  }
  
  const handleLogout = async () => {
    await logout()
  }

  return (
    <ScrollView style={{ flex: 1 }}>

      {/* Header */}
      <View style={profileStyle.profile_header_container}>
        <Ionicons name="person-circle-outline" size={90} color="#fff" />
        <Text style={profileStyle.profile_header_title}>
          {user.firstname || user.lastname
            ? `${user.firstname} ${user.lastname}`
            : 'Nom non renseigné'}
        </Text>
        <Text style={profileStyle.profile_header_subtitle}>
          Profil utilisateur
        </Text>
      </View>

      {/* Section */}
      <Text style={profileStyle.sectionTitle}>
        Informations personnelles
      </Text>

      {/* Carte infos */}
      <View style={profileStyle.card}>

        {/* Pays */}
        <View style={profileStyle.infoRow}>
          <View style={profileStyle.iconBox}>
            <Image
              source={{ uri: user.country.flagPath }}
              style={profileStyle.flag}
            />
          </View>
          <View>
            <Text style={profileStyle.label}>Pays</Text>
            <Text style={profileStyle.value}>
              {user.country.name} ({user.country.code})
            </Text>
          </View>
        </View>

        {/* Séparateur */}
        <View style={profileStyle.divider} />

        {/* Téléphone */}
        <View style={profileStyle.infoRow}>
          <View style={profileStyle.iconBox}>
            <Ionicons name="call-outline" size={20} color="#09CC1C" />
          </View>
          <View>
            <Text style={profileStyle.label}>Téléphone</Text>
            <Text style={profileStyle.value}>
              {user.phonenumber}
            </Text>
          </View>
        </View>
      </View>

      {/* Actions */}
      <View style={profileStyle.actionsContainer}>
        <TouchableOpacity style={profileStyle.primaryButton} onPress={onEditPress}>
          <Text style={profileStyle.primaryButtonText}>
            Mettre à jour le profil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={profileStyle.logoutButton}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={20} color="#E53935" />
          <Text style={profileStyle.logoutButtonText}>
            Déconnexion
          </Text>
        </TouchableOpacity>
      </View>

    </ScrollView>

  )
}
