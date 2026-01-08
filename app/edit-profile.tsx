import globalStyles from '@/assets/styles/global.styles'
import profileStyle from '@/assets/styles/profile.style'
import InlineError from '@/components/ui/InlineError'
import Loading from '@/components/ui/Loading'
import { useCountries } from '@/hook/useCountries'
import { useAuthStore } from '@/store/auth.store'
import { Ionicons } from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import { useMutation } from '@tanstack/react-query'
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
  const { user, setUser } = useAuthStore()

  if (!user) return <Loading visible />

  const [firstname, setFirstname] = useState(user.firstname ?? '')
  const [lastname, setLastname] = useState(user.lastname ?? '')
  const [phone, setPhone] = useState(user.phonenumber ?? '')
  const [countrySelected, setCountrySelected] = useState(user.countryId ?? 0)

  const {
    data: countries,
    isLoading: countriesLoading,
    isError: isCountriesError,
    error: countriesError,
  } = useCountries()

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async () => {
      return {
        firstname,
        lastname,
        phonenumber: phone,
        countryId: countrySelected,
      }
    },
    onSuccess: (updatedUser) => {
      setUser({ ...user, ...updatedUser })
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
            <View style={profileStyle.pickerContainer}>
                <Picker
                selectedValue={countrySelected}
                onValueChange={setCountrySelected}
                >
                {countries?.map(country => (
                    <Picker.Item
                    key={country.id}
                    label={country.name}
                    value={country.id}
                    />
                ))}
                </Picker>
            </View>

            {/* Téléphone */}
            <Text style={globalStyles.label}>Téléphone</Text>
            <TextInput
                style={globalStyles.input}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="Numéro de téléphone"
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
        </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
