'use client'

import { Card } from "@/components/ui/card"
import { MessageSquare, Heart, MoreVertical, Reply, Bell } from 'lucide-react'
import Image from 'next/image'

interface NotificationStatic {
  id: string
  type: 'notification' | 'comment' | 'like' | 'reply'
  image: string
  content: string
  title: string
  timestamp: string
  unread: boolean
}

const notifications: NotificationStatic[] = [
 
  {
    id: "2",
    type: 'comment',
    image: "/2.png",
    title: 'New Comment',
    content: 'John Doe commented on your post "Getting Started with Next.js"',
    timestamp: 'over 1 year ago',
    unread: true,
  },
  {
    id: "3",
    type: 'like',
    image: "/3.png",
    title: 'New Like',
    content: 'Jane Smith liked your comment on "React Hooks Explained"',
    timestamp: 'over 1 year ago',
    unread: false,
  },
  {
    id: "4",
    type: 'reply',
    image: "/about-us/me.png",
    title: 'Pol Sokhann Share your post',
    content: 'Alice Johnson replied to your comment on "TypeScript Best Practices"',
    timestamp: 'over 1 year ago',
    unread: true,
  },
  {
    id: "5",
    type: 'comment',
    image: "/about-us/5.png",
    title: 'New Comment',
    content: 'Bob Williams commented on your post "CSS Grid Layout Tutorial"',
    timestamp: 'over 1 year ago',
    unread: true,
  },
  {
    id: "6",
    type: 'like',
    image: "/about-us/6.png",
    title: 'New Like',
    content: 'Emma Davis liked your post "JavaScript Promises Demystified"',
    timestamp: 'over 1 year ago',
    unread: false,
  },
]

const NotificationIcon = ({ type }: { type: NotificationStatic['type'] }) => {
  switch (type) {
 
    case 'comment':
      return <MessageSquare className="h-4 w-4 text-blue-500" />
    case 'like':
      return <Heart className="h-4 w-4 text-secondary" />
    case 'reply':
      return <Reply className="h-4 w-4 text-blue-500" />
  }
}

export default function NotificationStatic() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-2">
            <h1 className="text-2xl font-bold text-primary mb-6">Notifications</h1>
    
      {notifications.map((notification) => (
        <Card key={notification.id} className="flex items-start gap-3 rounded-sm relative p-4 bg-white">
          <div className="h-16 w-16 relative rounded-full overflow-hidden flex-shrink-0">
            <Image 
              src={notification.image}
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <NotificationIcon type={notification.type} />
              <span className="font-medium text-lg text-gray-900">{notification.title}</span>
            </div>
            <p className="text-gray-600 text-sm mt-1">
              {notification.content}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {notification.timestamp}
            </p>
          </div>

          {notification.unread && (
            <div className="absolute right-16 top-12 h-2 w-2 rounded-full bg-blue-500" />
          )}
          
          <button className="flex-shrink-0 p-6 right-10 hover:bg-gray-100 rounded-full">
            <MoreVertical className="h-5 w-5 text-gray-400" />
            <span className="sr-only">More options</span>
          </button>
        </Card>
      ))}
    </div>
  )
}

