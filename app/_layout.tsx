import { useAuthStore } from '@/store/auth.store'
import { queryClient } from '@/utils/queryClient'
import { QueryClientProvider } from '@tanstack/react-query'
import { Slot, router, useSegments } from 'expo-router'
import { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import Toast from 'react-native-toast-message'

export default function RootLayout() {
  const { token, isLoading, restoreSession } = useAuthStore()
  const segments = useSegments()

  useEffect(() => {
    restoreSession()
  }, [])

  useEffect(() => {
    if (isLoading) return

    const inTabsGroup = segments[0] === '(tabs)'

    if (!token && inTabsGroup) {
      router.replace('/login')
    }

    if (token && !inTabsGroup) {
      router.replace('/(tabs)/home')
    }
  }, [token, isLoading, segments])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Slot />
      <Toast />
    </QueryClientProvider>
  )
}
