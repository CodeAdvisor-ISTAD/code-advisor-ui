import { ScrollArea } from "@/components/ui/scroll-area"
import { NotificationItem } from "@/components/notification/NotificationItem"
import type { Notification, NotificationActions } from "@/types/notifications"

interface NotificationListProps {
  notifications: Notification[]
  actions: NotificationActions
}

export function NotificationList({ notifications, actions }: NotificationListProps) {
  return (
    <ScrollArea className="h-[32rem]">
      <div className="space-y-1">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            actions={actions}
          />
        ))}
      </div>
    </ScrollArea>
  )
}

