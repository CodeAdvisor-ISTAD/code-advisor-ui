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
    REPLY = 'REPLY',
    VOTE = 'VOTE',
    ACCEPT = 'ACCEPT',
    CREATE = 'CREATE',
    REPORT = 'REPORT',
    ANSWER = 'ANSWER',
    QUESTION = 'QUESTION'
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
  
  