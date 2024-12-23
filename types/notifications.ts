export type NotificationData = {
    uuid: string
    slug: string
    title: string
    thumbnail: string | null
    isContent: boolean
  }
  
  export enum NotificationType {
    LIKE = 'LIKE',
    COMMENT = 'COMMENT',
    REPLY = 'REPLY'
  }
  
  export type Notification = {
    id: string
    title: string
    message: string
    notificationData: NotificationData
    notificationType: NotificationType
    read: boolean
    senderId: string
    receiverId: string
    createdAt: string
  }

  export interface NotificationActions {
    markAsRead: (id: string, status: boolean) => Promise<void>;
    remove: (id: string) => Promise<void>;
  }
  
  