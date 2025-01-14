import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Notification, NotificationActions } from '@/types/notifications';
import { WebSocketService } from '@/lib/websocket';

interface NotificationDropdownProps {
  notifications: Notification[];
  unreadCount: number;
  actions: NotificationActions;
}

export function NotificationDropdown({
  notifications: initialNotifications,
  unreadCount: initialUnreadCount,
  actions,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [unreadCount, setUnreadCount] = useState<number>(initialUnreadCount);

  useEffect(() => {
    const userId = 'receiverId'; // Replace with actual user ID retrieval method
    const wsService = new WebSocketService('http://localhost:8084/ws', userId);

    wsService.onNotification((notification) => {
      setNotifications((prev) => [notification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    });

    wsService.connect();

    // Fetch initial notifications
    wsService.fetchInitialNotifications('desc').then((initialNotifications) => {
      setNotifications(initialNotifications);
      setUnreadCount(initialNotifications.filter((n) => !n.read).length);
    });

    return () => {
      wsService.disconnect();
    };
  }, []);
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="mt-4 w-[380px] p-0 mr-2">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-sm font-semibold">Notifications</h2>
          <Link href="/notifications" className="text-sm text-muted-foreground hover:text-primary">
            See more
          </Link>
        </div>
        <ScrollArea className="h-[600px]">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-3 p-4 hover:bg-accent/50 transition-colors border-b last:border-0"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={notification.notificationData.thumbnail || undefined} />
                <AvatarFallback>
                  {notification.senderId.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{notification.title}</span>
                  {!notification.read && <span className="h-2 w-2 rounded-full bg-red-500" />}
                </div>
                <p className="text-sm text-muted-foreground">{notification.message}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}