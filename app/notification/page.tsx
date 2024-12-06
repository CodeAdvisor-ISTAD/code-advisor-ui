"use client"

import { useEffect, useState, useCallback } from 'react'
import { WebSocketService } from "@/lib/websocket"
import { NotificationList } from "@/components/notification/NotificationList"
import type { Notification } from "@/types/notifications"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }, [])

  const remove = useCallback((id: string) => {
    setNotifications(prev =>
      prev.filter(notification => notification.id !== id)
    )
  }, [])

  useEffect(() => {
    const wsService = new WebSocketService()

    wsService.onNotification((notification) => {
      setNotifications(prev => [notification, ...prev])
    })

    wsService.connect()

    return () => {
      wsService.disconnect()
    }
  }, [])

  return (
    <div className="container max-w-2xl mx-auto p-4 mt-24">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <NotificationList
        notifications={notifications}
        actions={{ markAsRead, remove }}
      />
    </div>
  )
}

