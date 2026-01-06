import { useAuthStore } from '@/store/auth.store'
import { queryClient } from '@/utils/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { Stack, router, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  const { token, isLoading, hasRestored, restoreSession } = useAuthStore()
  const segments = useSegments()

  useEffect(() => {
    restoreSession()
  }, [])

  useEffect(() => {
    if (!hasRestored) return
    
    const inTabsGroup = segments[0] === '(tabs)'

    if (!token && inTabsGroup) {
      router.replace('/login')
    }
    
    // if (token && !inTabsGroup) {
    //   router.replace('/(tabs)/home')
    // }
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

          {/* Ticket details */}
          <Stack.Screen
            name="ticket"
            options={{
              title: 'Détail du ticket',
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
