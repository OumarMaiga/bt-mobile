import { Feather, Ionicons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0F172A",
        tabBarInactiveTintColor: "#94A3B8",
      }}>
      <Tabs.Screen name="home" options={{ 
        title: 'Accueil',
        tabBarIcon: ({ color, size }) => (
            <Feather name="home" size={size} color={color} />
          ),
      }} />
      <Tabs.Screen name="booking" options={{ 
        title: 'Mes billets',
        tabBarIcon: ({ color, size }) => (
            <Ionicons name="ticket-outline" size={size} color={color} />
          ),
      }} />
      <Tabs.Screen name="profile" options={{ 
        title: 'Profil',
        tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
        }} />
    </Tabs>
  )
}
