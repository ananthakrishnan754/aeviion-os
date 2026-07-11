import { create } from "zustand"
import type { User, Notification, DashboardStats } from "@/types"

interface AppState {
  user: User | null
  notifications: Notification[]
  stats: DashboardStats | null
  sidebarOpen: boolean
  theme: "light" | "dark"
  
  setUser: (user: User | null) => void
  addNotification: (notification: Notification) => void
  markNotificationRead: (id: string) => void
  clearNotifications: () => void
  setStats: (stats: DashboardStats) => void
  toggleSidebar: () => void
  setTheme: (theme: "light" | "dark") => void
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  notifications: [],
  stats: null,
  sidebarOpen: true,
  theme: "light",

  setUser: (user) => set({ user }),
  
  addNotification: (notification) =>
    set((state) => ({
      notifications: [notification, ...state.notifications],
    })),
  
  markNotificationRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),
  
  clearNotifications: () => set({ notifications: [] }),
  
  setStats: (stats) => set({ stats }),
  
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  
  setTheme: (theme) => set({ theme }),
}))
