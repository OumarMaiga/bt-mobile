import { User } from '@/types/user'
import * as SecureStore from 'expo-secure-store'
import { create } from 'zustand'

type AuthState = {
  user: User | null
  token: string | null
  isLoading: boolean
  hasRestored: boolean
  login: (token: string, user: User) => Promise<void>
  logout: () => Promise<void>
  restoreSession: () => Promise<void>
  setUser: (user: User) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: true,
  hasRestored: false,

  login: async (token, user) => {
    await SecureStore.setItemAsync('token', token)
    await SecureStore.setItemAsync('user', JSON.stringify(user))
    set({ token, user })
  },

  logout: async () => {
    await SecureStore.deleteItemAsync('token')
    await SecureStore.deleteItemAsync('user')
    set({ token: null, user: null })
  },

  restoreSession: async () => {
    // empêche double exécution
    if (get().hasRestored) return

    set({ isLoading: true })

    const token = await SecureStore.getItemAsync('token')
    const user = await SecureStore.getItemAsync('user')
    
    if (token && user) {
      set({ token, user: JSON.parse(user), isLoading: false, hasRestored: true })
    } else {
      set({ isLoading: false, hasRestored: true })
    }
  },

  setUser: async (user) => {
    await SecureStore.setItemAsync('user', JSON.stringify(user))
    set({ user })
  }
}))
