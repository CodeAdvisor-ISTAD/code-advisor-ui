import { MessageSquare, Heart, Reply, MoreVertical } from 'lucide-react'
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar } from "@/components/ui/avatar"
import { Notification, NotificationActions, NotificationType } from "@/types/notifications"

interface NotificationItemProps {
  notification: Notification
  actions: NotificationActions
}

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.LIKE:
      return <Heart className="h-4 w-4 text-red-500" />
    case NotificationType.COMMENT:
      return <MessageSquare className="h-4 w-4 text-blue-500" />
    case NotificationType.REPLY:
      return <Reply className="h-4 w-4 text-green-500" />
  }
}

export function NotificationItem({ notification, actions }: NotificationItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 hover:bg-accent/50 rounded-lg transition-colors">
      <Avatar className="h-10 w-10 bg-primary/10 flex items-center justify-center">
        <span className="text-xs font-medium">CODE</span>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
            {getNotificationIcon(notification.notificationType)}
            <span className="font-medium">
            {notification.notificationType === NotificationType.LIKE ? `${notification.senderId} liked your ${notification.notificationData}` :
            notification.notificationType === NotificationType.COMMENT ? `${notification.senderId} commented on your ${notification.notificationData}` :
            `${notification.senderId} replied to your ${notification.notificationData}`}
            </span>
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>
      
      {/* <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {getNotificationIcon(notification.notificationType)}
          <span className="font-medium">
            {notification.notificationType === NotificationType.LIKE ? 'New Like' :
             notification.notificationType === NotificationType.COMMENT ? 'New Comment' :
             'New Reply'}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{notification.message}</p>
        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div> */}

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
              Mark as read
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => actions.remove(notification.id)}>
              Remove notification
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

