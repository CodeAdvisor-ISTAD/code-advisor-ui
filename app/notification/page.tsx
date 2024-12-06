"use client"
import { useEffect, useState } from 'react'
import { WebSocketService } from '@/lib/websocket'
import { Notification, NotificationType } from '@/types/index'
import { formatDistanceToNow } from 'date-fns'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [wsService, setWsService] = useState<WebSocketService | null>(null)

  useEffect(() => {
    const service = new WebSocketService()

    service.onNotification((notification) => {
      setNotifications(prev => [notification, ...prev])
    })

    service.connect()
    setWsService(service)

    return () => {
      service.disconnect()
    }
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      )
    )
  }

  const remove = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id))
  }

  return (
      <div className="max-w-2xl mx-auto mt-24">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        <div className="space-y-1 bg-card rounded-lg border">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 p-4 hover:bg-accent/50 transition-colors border-b last:border-0"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={notification.notificationData.thumbnail || undefined} />
                <AvatarFallback>
                  {notification.senderId.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    {notification.title}
                  </span>
                  {!notification.isRead && (
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {notification.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.createdAt), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => markAsRead(notification.id)}>
                    Mark as {notification.isRead ? 'unread' : 'read'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => remove(notification.id)}>
                    Remove
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
          {notifications.length === 0 && (
            <div className="flex h-[200px] items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          )}
        </div>
      </div>
  )
}

