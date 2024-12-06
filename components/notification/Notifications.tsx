'use client'

import { useNotificationsSocket } from "@/hooks/use-notifications-socket"
import { NotificationItem } from "./NotificationItem"

interface NotificationsProps {
  userId: string
}

export function Notifications({ userId }: NotificationsProps) {
  const { notifications, actions, isConnected } = useNotificationsSocket(userId)

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Notifications</h1>
        {!isConnected && (
          <p className="text-sm text-muted-foreground">Connecting...</p>
        )}
      </div>
      <div className="space-y-1">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            actions={actions}
          />
        ))}
        {notifications.length === 0 && (
          <p className="text-center text-muted-foreground py-8">
            No notifications yet
          </p>
        )}
      </div>
    </div>
  )
}

