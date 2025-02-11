import { useRouter } from 'next/navigation';
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
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { findUserProfileByUuid } from '@/hooks/api-hook/user/user-service';
import Image from "next/image";

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
    case NotificationType.VOTE:
      return <Heart className="h-4 w-4 text-purple-500" />;
    case NotificationType.ACCEPT:
      return <CircleCheck className="h-4 w-4 text-green-500" />;
    case NotificationType.CREATE:
      return <MessageSquare className="h-4 w-4 text-yellow-500" />;
    case NotificationType.REPORT:
      return <Trash2 className="h-4 w-4 text-red-500" />;
    case NotificationType.ANSWER:
      return <Reply className="h-4 w-4 text-blue-500" />;
    case NotificationType.QUESTION:
      return <MessageSquare className="h-4 w-4 text-orange-500" />;
    default:
      return null;
  }
};

export function NotificationItem({ notification, actions }: NotificationItemProps) {
  const [isRead, setIsRead] = useState(notification.read);
  const router = useRouter();
  const { data: user } = useQuery({
    queryFn: () => findUserProfileByUuid(notification.senderId),
    queryKey: ['userNotification', notification.senderId],
  });

  const profileImage = user?.profileImage || placeholderProfile;
  const username = user?.username || 'Unknown';

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

  const handleNotificationClick = async () => {
    const route = notification.notificationData.isContent ? `/content/${notification.notificationData.slug}` : `/forum/${notification.notificationData.slug}`;
    router.push(route);
    if (!isRead) {
      await handleMarkAsRead();
    }
  };

  return (
    <div onClick={handleNotificationClick} className="flex items-start gap-4 p-6 rounded-md transition-colors bg-white border border-gray-200 cursor-pointer">
      <Avatar className="h-10 w-10 bg-yellow-400 flex items-center justify-center">
        <Image src={profileImage} alt={username} width={40} height={40} className="w-full h-full rounded-full" />
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          {getNotificationIcon(notification.notificationType)}
          <span className="font-normal text-primary">
            {notification.notificationType === NotificationType.LIKE ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានចូលចិត្ត
              </>
            ) : notification.notificationType === NotificationType.COMMENT ? (
              <>
                <span className="font-bold text-primary">{username}</span> បញ្ចេញមតិ
              </>
            ) : notification.notificationType === NotificationType.REPLY ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានឆ្លើយតប
              </>
            ) : notification.notificationType === NotificationType.VOTE ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានបោះឆ្នោត
              </>
            ) : notification.notificationType === NotificationType.ACCEPT ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានយល់ព្រម
              </>
            ) : notification.notificationType === NotificationType.CREATE ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានបង្កើត
              </>
            ) : notification.notificationType === NotificationType.REPORT ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានរាយការណ៍
              </>
            ) : notification.notificationType === NotificationType.ANSWER ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានឆ្លើយសំណួរ
              </>
            ) : notification.notificationType === NotificationType.QUESTION ? (
              <>
                <span className="font-bold text-primary">{username}</span> បានសួរសំណួរ
              </>
            ) : null}
          </span>
        </div>

        <p className="text-slate-500 text-sm line-clamp-2">{notification.message}</p>
        <p className="text-slate-500 text-sm line-clamp-2">
          {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
        </p>
      </div>

      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        {!isRead && <div className="h-2 w-2 rounded-full bg-yellow-600" />}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 border-none focus:outline-none active:border-none focus:ring-0">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="border-none p-2">
            <DropdownMenuItem onClick={handleMarkAsRead} className="border-none text-yellow-600 pb-2">
              <CircleCheck className="text-yellow-600" />
              <span className="text-yellow-600">{isRead ? 'សម្គាល់ថាមិនទាន់អាន' : 'សម្គាល់ថាអានរូច'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleRemoveNotification} className="border-none text-red-700">
              <Trash2 className="text-red-700" />
              <span className="text-red-700">លុបការជូនដំណឹងនេះ</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
