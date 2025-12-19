import * as SecureStore from 'expo-secure-store'
import { create } from 'zustand'

type User = {
  id: number
  lastname: string
  firstname: string
  phonenumber: string
  country: string
  joinAt: string
  isVerified: string
  isActive: string
}

type AuthState = {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (token: string/*, user: User*/) => Promise<void>
  logout: () => Promise<void>
  restoreSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,

  login: async (token/*, user*/) => {
    await SecureStore.setItemAsync('token', token)
    set({ token, /*user,*/ isLoading: false })
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token')
    set({ token: null, user: null })
  },

  restoreSession: async () => {
    const token = await SecureStore.getItemAsync('token')
    if (token) {
      // Optionnel : appeler /me pour récupérer l'utilisateur
      set({ token, isLoading: false })
    } else {
      set({ isLoading: false })
    }
  },
}))
