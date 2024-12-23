import { MessageSquare, Heart, Reply, MoreVertical, Trash2, CircleCheck } from 'lucide-react';
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@/components/ui/avatar";
import { Notification, NotificationActions, NotificationType } from "@/types/notifications";
import { useEffect, useState } from 'react';
import { getUserProfile } from '@/lib/api';

interface NotificationItemProps {
  notification: Notification;
  actions: NotificationActions;
}

const placeholderProfile = 'https://t4.ftcdn.net/jpg/09/69/15/93/360_F_969159362_iq0L1zDXCkEXVdq6qE42vOC9oc4JnVZM.jpg';

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case NotificationType.LIKE:
      return <Heart className="h-4 w-4 text-red-500" />;
    case NotificationType.COMMENT:
      return <MessageSquare className="h-4 w-4 text-blue-500" />;
    case NotificationType.REPLY:
      return <Reply className="h-4 w-4 text-green-500" />;
    default:
      return null;
  }
};

export function NotificationItem({ notification, actions }: NotificationItemProps) {
  const [userProfile, setUserProfile] = useState<{ name: string; profile: string } | null>(null);
  const [isRead, setIsRead] = useState(notification.read);

  useEffect(() => {
    async function fetchUserProfile() {
      const profile = await getUserProfile(notification.senderId);
      setUserProfile(profile);
    }

    fetchUserProfile();
  }, [notification.senderId]);

  const handleMarkAsRead = async () => {
    const newReadStatus = !isRead;
    setIsRead(newReadStatus); // Optimistic UI update
    try {
      await actions.markAsRead(notification.id, newReadStatus);
    } catch (error) {
      setIsRead(!newReadStatus); // Revert UI in case of error
      console.error("Failed to update read status", error);
    }
  };

  const handleRemoveNotification = async () => {
    try {
      await actions.remove(notification.id);
    } catch (error) {
      console.error("Failed to remove notification", error);
    }
  };

  return (
    <div className="flex items-start gap-4 p-6 rounded-md transition-colors bg-white border border-gray-200">
      <Avatar className="h-10 w-10 bg-yellow-400 flex items-center justify-center">
        {userProfile?.profile ? (
          <img src={userProfile.profile} alt={userProfile.name} className="w-full h-full rounded-full" />
        ) : (
          <img src={placeholderProfile} alt="Placeholder" className="w-9 h-9 rounded-full" />
        )}
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {getNotificationIcon(notification.notificationType)}
          <span className="font-normal text-primary">
            {notification.notificationType === NotificationType.LIKE ? (
              <>
                <span className="font-bold text-primary">{userProfile?.name}</span> liked your {notification.notificationData.title}
              </>
            ) : notification.notificationType === NotificationType.COMMENT ? (
              <>
                <span className="font-bold text-primary">{userProfile?.name}</span> commented on your {notification.notificationData.title}
              </>
            ) : (
              <>
                <span className="font-bold text-primary">{userProfile?.name}</span> replied to your {notification.notificationData.title}
              </>
            )}
          </span>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2">{notification.message}</p>
        <p className="text-slate-500 text-sm line-clamp-2">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>

      <div className="flex items-center gap-2">
        {!isRead && <div className="h-2 w-2 rounded-full bg-yellow-600" />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 border-none focus:outline-none active:border-none focus:ring-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-none">
            <DropdownMenuItem onClick={handleMarkAsRead} className="border-none text-yellow-600">
              <CircleCheck className="mr-2 text-yellow-600" />
              <span className="text-yellow-600">{isRead ? 'Mark as unread' : 'Mark as read'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemoveNotification} className="border-none text-red-700">
              <Trash2 className="mr-2 text-red-700" />
              <span className="text-red-700">Remove</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
