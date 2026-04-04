import { Picker } from '@react-native-picker/picker'
import { useCallback, useState } from 'react'
import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    RefreshControl,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from '@/assets/styles/global.styles'
import InlineError from '@/components/ui/InlineError'
import Loading from '@/components/ui/Loading'
import { useCountries } from '@/hook/useCountries'
import { loginApi } from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'expo-router'


export default function LoginScreen() {
    const [phonenumber, setPhonenumber] = useState('')
    const [countrySelected, setCountrySelected] = useState(0)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    
    const router = useRouter()

    const {
        data: countries,
        isLoading: countriesLoading,
        isError: isCountriesError,
        error: countriesError,
        refetch: refetchCountries
    } = useCountries()

    const { mutate, isPending, isSuccess, data, isError, error } = useMutation({
        mutationFn: async () => {
            if (!phonenumber || countrySelected === 0) {
                throw new Error('Veuillez renseigner le pays et le numéro')
            }
            
            const formData = new FormData()
            formData.append("phonenumber", phonenumber)
            formData.append("country", countrySelected.toString())

            const response = await loginApi(formData)

            const data = await response.json()
            
            if(!response.ok) {
                throw new Error(data?.message || "Erreur lors de l'authentification")
            }
            
            router.push({
                pathname: '/verify',
                params: {
                    country: countrySelected,
                    phonenumber: phonenumber,
                },
            })
        },
    })
    
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await refetchCountries()
        setRefreshing(false)
    }, [])

    if(countriesLoading || !countries) return <Loading visible />

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={{ margin: 20 }}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }>
                    <Text style={[styles.title, { marginTop: 80 }]}>Bienvenue</Text>

                    <Text style={styles.label}>Pays</Text>
                    <View style={styles.input}>
                        {countriesLoading ? ( <Text>Chargement...</Text>
                        ) : (
                        <Picker
                            selectedValue={countrySelected}
                            onValueChange={setCountrySelected}
                            style={{ height: 50, width: '100%', color: '#000' }}
                        >
                        <Picker.Item label="Sélectionnez" value={0} />
                        {countries?.map((item) => (
                            <Picker.Item
                                key={item.id}
                                label={`${item.name} (${item.identifier})`}
                                value={item.id}
                            />
                        ))}
                        </Picker>
                        )}
                    </View>

                    <Text style={styles.label}>Téléphone</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={phonenumber}
                        onChangeText={setPhonenumber}
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            isPending && { opacity: 0.6 },
                        ]}
                        disabled={isPending}
                        onPress={()=>mutate()}
                    >
                        <Text style={styles.button_text}>Connexion</Text>
                        {isPending && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 10 }} />}                        
                    </TouchableOpacity>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            {isCountriesError && <InlineError message={countriesError?.message || "Impossible de charger les pays"} />}
            {isError && <InlineError message={error?.message || "Impossible de se connecter. Réessayez."} />}
        </SafeAreaView>
    )

}
