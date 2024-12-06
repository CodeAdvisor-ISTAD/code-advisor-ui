import { Notification, NotificationActions } from '@/types/notifications'
import { NotificationItem } from '@/components/notification/NotificationItem'
import { ScrollArea } from '@/components/ui/scroll-area'

interface NotificationListProps {
  notifications: Notification[]
  actions: NotificationActions
}

export function NotificationList({ notifications, actions }: NotificationListProps) {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-1">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            actions={actions}
          />
        ))}
        {notifications.length === 0 && (
          <div className="flex h-[200px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              No notifications yet
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}

