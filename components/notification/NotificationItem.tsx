import { formatDistanceToNow } from 'date-fns'
import { Heart, MessageCircle, MoreVertical, Reply } from 'lucide-react'
import { Notification, NotificationActions, NotificationType } from '@/types/notifications'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface NotificationItemProps {
  notification: Notification
  actions: NotificationActions
}

export function NotificationItem({ notification, actions }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.notificationType) {
      case NotificationType.LIKE:
        return <Heart className="h-4 w-4 text-red-500" />
      case NotificationType.COMMENT:
        return <MessageCircle className="h-4 w-4 text-blue-500" />
      case NotificationType.REPLY:
        return <Reply className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="flex items-start gap-4 px-4 py-3 hover:bg-accent/50 transition-colors">
      <Avatar className="h-8 w-8">
        <AvatarImage src={notification.notificationData.thumbnail || undefined} />
        <AvatarFallback>
          {notification.senderId.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <p className="text-sm">
          <span className="font-medium">{notification.title}</span>
          <span className="text-muted-foreground"> {notification.message}</span>
        </p>
        <div className="flex items-center gap-2">
          {getIcon()}
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {!notification.isRead && (
          <div className="h-2 w-2 rounded-full bg-blue-500" />
        )}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => actions.markAsRead(notification.id)}>
              Mark as {notification.isRead ? 'unread' : 'read'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => actions.remove(notification.id)}>
              Remove
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

