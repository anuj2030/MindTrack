"use client"

import { useState } from "react"
import { BellRing, Calendar, Check, Heart, MessageCircle, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

// Sample notifications data
const notifications = [
  {
    id: "1",
    type: "reminder",
    title: "Meditation Reminder",
    description: "Your scheduled meditation session starts in 15 minutes",
    time: "15 minutes ago",
    read: false,
  },
  {
    id: "2",
    type: "community",
    title: "New Comment",
    description: "Jane Doe replied to your post in Anxiety Support group",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "achievement",
    title: "Streak Milestone!",
    description: "You've maintained your meditation streak for 7 days",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "4",
    type: "system",
    title: "New Feature Available",
    description: "Check out our new sleep analysis tools in the app",
    time: "1 day ago",
    read: true,
  },
  {
    id: "5",
    type: "community",
    title: "Post Liked",
    description: "Mark Smith liked your journal entry",
    time: "2 days ago",
    read: true,
  },
]

export function NotificationsDropdown() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [notificationState, setNotificationState] = useState(notifications)

  const unreadCount = notificationState.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotificationState(notificationState.map((n) => ({ ...n, read: true })))
  }

  const markAsRead = (id: string) => {
    setNotificationState(notificationState.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const getFilteredNotifications = () => {
    if (activeTab === "all") return notificationState
    if (activeTab === "unread") return notificationState.filter((n) => !n.read)
    return notificationState
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "reminder":
        return <Calendar className="h-4 w-4 text-blue-500" />
      case "community":
        return <MessageCircle className="h-4 w-4 text-green-500" />
      case "achievement":
        return <Heart className="h-4 w-4 text-red-500" />
      case "system":
        return <BellRing className="h-4 w-4 text-orange-500" />
      default:
        return <User className="h-4 w-4 text-primary" />
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <BellRing className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4">
          <div className="font-medium">Notifications</div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Mark all as read
            </Button>
          )}
        </div>
        <Separator />
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <div className="px-4 pt-2">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="secondary" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all" className="h-full">
            <ScrollArea className="h-[300px]">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <Card
                    key={notification.id}
                    className={`m-2 cursor-pointer ${!notification.read ? "bg-muted/50" : ""}`}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{notification.title}</div>
                            {!notification.read && <div className="h-2 w-2 rounded-full bg-primary"></div>}
                          </div>
                          <div className="text-sm text-muted-foreground">{notification.description}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{notification.time}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <BellRing className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">No notifications</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="unread" className="h-full">
            <ScrollArea className="h-[300px]">
              {getFilteredNotifications().length > 0 ? (
                getFilteredNotifications().map((notification) => (
                  <Card
                    key={notification.id}
                    className="m-2 cursor-pointer bg-muted/50"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div className="p-3">
                      <div className="flex items-start gap-3">
                        <div className="rounded-full bg-primary/10 p-2">{getNotificationIcon(notification.type)}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{notification.title}</div>
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          </div>
                          <div className="text-sm text-muted-foreground">{notification.description}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{notification.time}</div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <div className="text-center">
                    <Check className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">All caught up!</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
        <Separator />
        <div className="p-2">
          <Button variant="outline" size="sm" className="w-full" onClick={() => setOpen(false)}>
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

