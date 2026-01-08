import globalStyles from '@/assets/styles/global.styles'
import profileStyle from '@/assets/styles/profile.style'
import InlineError from '@/components/ui/InlineError'
import InlineSuccess from '@/components/ui/InlineSuccess'
import Loading from '@/components/ui/Loading'
import { useCountries } from '@/hook/useCountries'
import { updateUser } from '@/services/user.service'
import { useAuthStore } from '@/store/auth.store'
import { User } from '@/types/user'
import { Ionicons } from '@expo/vector-icons'
import { useMutation } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function EditProfileScreen() {
  const { user, setUser, token } = useAuthStore()

  if (!user || !token) return <Loading visible />
  
  const [firstname, setFirstname] = useState(user.firstname ?? '')
  const [lastname, setLastname] = useState(user.lastname ?? '')

  const {
    data: countries,
    isLoading: countriesLoading,
    isError: isCountriesError,
    error: countriesError,
  } = useCountries()

  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: async () => {
        const formData = new FormData()
        formData.append("firstname", firstname)
        formData.append("lastname", lastname)
        
        const response = await updateUser(formData, token)
        
        const data = await response.json()
        
        if(!response.ok) {
            throw new Error(data?.message || "Erreur lors de la mise à jour du profil")
        }
        return data
    },
    onSuccess: ({newAuthToken}) => {
        const decoded = jwtDecode<User>(newAuthToken)
        setUser(decoded)
    },
  })

  if (countriesLoading) return <Loading visible />

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 80}
            contentContainerStyle={{ paddingBottom: 180 }}>
        <ScrollView
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <View style={profileStyle.profile_header_container}>
            <Ionicons name="create-outline" size={60} color="#fff" />
            <Text style={profileStyle.profile_header_title}>
                Mise à jour du profil
            </Text>
            <Text style={profileStyle.profile_header_subtitle}>
                Modifiez vos informations personnelles
            </Text>
            </View>

            {/* Carte formulaire */}
            <View style={profileStyle.card}>
            {/* Prénom */}
            <Text style={globalStyles.label}>Prénom</Text>
            <TextInput
                style={globalStyles.input}
                value={firstname}
                onChangeText={setFirstname}
                placeholder="Votre prénom"
            />

            {/* Nom */}
            <Text style={globalStyles.label}>Nom</Text>
            <TextInput
                style={globalStyles.input}
                value={lastname}
                onChangeText={setLastname}
                placeholder="Votre nom"
            />

            {/* Pays */}
            <Text style={globalStyles.label}>Pays</Text>
            <TextInput
                style={globalStyles.input}
                value={user.country.name + ' (' + user.country.identifier + ')'}
                keyboardType="phone-pad"
                placeholder="Numéro de téléphone"
                readOnly
            />

            {/* Téléphone */}
            <Text style={globalStyles.label}>Téléphone</Text>
            <TextInput
                style={globalStyles.input}
                value={user.phonenumber}
                keyboardType="phone-pad"
                placeholder="Numéro de téléphone"
                readOnly
            />

            {/* Bouton */}
            <TouchableOpacity
                style={[
                profileStyle.primaryButton,
                isPending && { opacity: 0.6 },
                ]}
                disabled={isPending}
                onPress={() => mutate()}
            >
                <Text style={profileStyle.primaryButtonText}>
                {isPending ? 'Mise à jour...' : 'Enregistrer'}
                </Text>
            </TouchableOpacity>
            </View>

            {isCountriesError && (
            <InlineError
                message={
                countriesError?.message || 'Impossible de charger les pays'
                }
            />
            )}

            {isError && (
            <InlineError
                message={error?.message || 'Erreur lors de la mise à jour'}
            />
            )}

            {isSuccess && (
            <InlineSuccess
                message={'Profil mis à jour avec succès !'}
            />
            )}
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
