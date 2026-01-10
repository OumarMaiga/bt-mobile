import {
    ActivityIndicator,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native'

import styles from '@/assets/styles/global.styles'
import InlineError from '@/components/ui/InlineError'
import { verifyCode } from '@/services/auth.service'
import { useAuthStore } from '@/store/auth.store'
import { User } from '@/types/user'
import { useMutation } from '@tanstack/react-query'
import { useLocalSearchParams } from 'expo-router'
import { jwtDecode } from 'jwt-decode'
import { useState } from 'react'

export default function VerifyScreen() {
    
    const [code, setCode] = useState('')

    const { country, phonenumber } = useLocalSearchParams<{
        country?: string
        phonenumber?: string
    }>()

    const { login } = useAuthStore()

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: async () => {
            if (!country || !phonenumber) {
                throw new Error('Paramètres invalides')
            }
            const formData = new FormData()
            formData.append('code', code)
            formData.append('phonenumber', phonenumber)
            formData.append('country', country)

            const response = await verifyCode(formData)
            
            const data = await response.json()
            
            if(!response.ok) throw new Error(data?.message || 'Erreur lors de la vérification')
            
            return data
        },
        onSuccess: ({ token }) => {
            const decoded = jwtDecode<User>(token)
            login(token, decoded)
        }
    })

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView style={{ margin: 20 }}>
                    <Text style={[styles.title, { marginTop: 80 }]}>Bienvenue</Text>

                    <Text style={styles.label}>Code</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType="phone-pad"
                        value={code}
                        onChangeText={setCode}
                    />

                    <TouchableOpacity
                        style={[
                            styles.button,
                            isPending && { opacity: 0.6 },
                        ]}
                        disabled={isPending}
                        onPress={()=>mutate()}
                    >
                        <Text style={styles.button_text}>Verifier</Text>
                        {isPending && <ActivityIndicator size="small" color="#fff" style={{ marginLeft: 10 }} />}
                    </TouchableOpacity>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
    
            {isError && <InlineError message={error?.message || 'Erreur lors de la vérification. Réessayez.'} />}
        </View>
    )

}
