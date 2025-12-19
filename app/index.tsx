import { useAuthStore } from '@/store/auth.store'
import { Redirect } from 'expo-router'

export default function Index() {
  const token = useAuthStore((s) => s.token)

  if (token) {
    return <Redirect href="/(tabs)/home" />
  }

  return <Redirect href="/login" />
}
