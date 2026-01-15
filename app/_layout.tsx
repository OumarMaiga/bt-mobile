import { useAuthStore } from '@/store/auth.store'
import { queryClient } from '@/utils/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { router, Stack, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function RootLayout() {

  const { token, isLoading, hasRestored, restoreSession } = useAuthStore()
  
  const segments = useSegments()

  const publicRoutes = ['login','verify']

  useEffect(() => {
    restoreSession()
  }, [])

  useEffect(() => {
    if (!hasRestored) return
      
    const isPublicRoute = publicRoutes.includes(segments[0])
  
    if (!token && !isPublicRoute) router.replace('/login')
    
    if (token && isPublicRoute) router.replace('/(tabs)/home')
    
  }, [token, hasRestored, segments])

  if (!hasRestored || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <Stack>
          {/* Bottom tabs */}
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />

          {/* Profil */}
          <Stack.Screen
            name="profile"
            options={{
              title: 'Profil',
              headerBackTitle: 'Retour',
            }}
          />

          {/* Mise a jour du Profil */}
          <Stack.Screen
            name="edit-profile"
            options={{
              title: 'Mise à jour du profil',
              headerBackTitle: 'Retour',
            }}
          />

          {/* Ticket details */}
          <Stack.Screen
            name="ticket"
            options={{
              title: 'Détail du ticket',
              headerBackTitle: 'Retour',
            }}
          />

          {/* Reservation details */}
          <Stack.Screen
            name="bookingDetail"
            options={{
              title: 'Détail de la réservation',
              headerBackTitle: 'Retour',
            }}
          />

          {/* Login */}
          <Stack.Screen
            name="login"
            options={{ headerShown: false }}
          />
        </Stack>
        <Toast />
      </QueryClientProvider>
    </SafeAreaProvider>
  )
}
