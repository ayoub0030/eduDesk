"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bell, Info, AlertTriangle, CheckCircle, Clock, X, Filter, MoreVertical } from "lucide-react";

// Define custom blue king color
const blueKingColor = "#1E40AF";

// Notification types and their colors
const notificationTypes = {
  info: { 
    icon: <Info className="h-5 w-5" />, 
    bg: "bg-blue-50", 
    iconColor: "text-blue-500",
    borderColor: "border-blue-200"
  },
  warning: { 
    icon: <AlertTriangle className="h-5 w-5" />, 
    bg: "bg-amber-50", 
    iconColor: "text-amber-500",
    borderColor: "border-amber-200"
  },
  success: { 
    icon: <CheckCircle className="h-5 w-5" />, 
    bg: "bg-green-50", 
    iconColor: "text-green-500",
    borderColor: "border-green-200"
  },
  reminder: { 
    icon: <Clock className="h-5 w-5" />, 
    bg: "bg-purple-50", 
    iconColor: "text-purple-500",
    borderColor: "border-purple-200"
  }
};

// Fake notifications data
const initialNotifications = [
  {
    id: 1,
    type: "warning",
    title: "Assignment Deadline Approaching",
    message: "Your Physics assignment is due in 2 days. Make sure to submit on time.",
    time: "10 minutes ago",
    read: false
  },
  {
    id: 2,
    type: "info",
    title: "New Course Materials",
    message: "New materials have been posted for your Data Structures class.",
    time: "2 hours ago",
    read: false
  },
  {
    id: 3,
    type: "success",
    title: "Grade Posted",
    message: "Your grade for Biology midterm has been posted. You received an A-!",
    time: "Yesterday",
    read: true
  },
  {
    id: 4,
    type: "reminder",
    title: "Study Group Meeting",
    message: "Don't forget your study group meeting at the library today at 5 PM.",
    time: "Yesterday",
    read: true
  },
  {
    id: 5,
    type: "info",
    title: "Schedule Changes",
    message: "Your Computer Science class has been moved to Room 302 for the remainder of the semester.",
    time: "2 days ago",
    read: true
  },
  {
    id: 6,
    type: "warning",
    title: "Registration Deadline",
    message: "Course registration for next semester begins next week. Plan your schedule accordingly.",
    time: "3 days ago",
    read: true
  },
  {
    id: 7,
    type: "success",
    title: "Scholarship Application Accepted",
    message: "Your application for the Academic Excellence Scholarship has been accepted for review.",
    time: "1 week ago",
    read: true
  }
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState("all"); // all, unread, read
  
  const filteredNotifications = notifications.filter(notification => {
    if (filter === "unread") return !notification.read;
    if (filter === "read") return notification.read;
    return true;
  });
  
  const unreadCount = notifications.filter(notification => !notification.read).length;
  
  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const deleteNotification = (id: number) => {
    setNotifications(
      notifications.filter(notification => notification.id !== id)
    );
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pl-[220px]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Bell className="h-6 w-6 mr-3" style={{ color: blueKingColor }} />
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <div 
                className="ml-3 px-2.5 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: blueKingColor }}
              >
                {unreadCount} new
              </div>
            )}
          </div>
          
          <div className="flex space-x-2">
            <div className="relative">
              <Button 
                variant="outline" 
                size="sm"
                className="rounded-lg flex items-center"
                onClick={() => setFilter(
                  filter === "all" ? "unread" : filter === "unread" ? "read" : "all"
                )}
              >
                <Filter className="h-4 w-4 mr-2" />
                {filter === "all" ? "All" : filter === "unread" ? "Unread" : "Read"}
              </Button>
            </div>
            
            {unreadCount > 0 && (
              <Button 
                size="sm"
                className="rounded-lg"
                style={{ backgroundColor: blueKingColor }}
                onClick={markAllAsRead}
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        {/* Notifications List */}
        {filteredNotifications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <Bell className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h2 className="text-lg font-medium text-gray-700 mb-1">No notifications</h2>
            <p className="text-gray-500">
              {filter !== "all" 
                ? `You don't have any ${filter} notifications` 
                : "You're all caught up!"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const typeInfo = notificationTypes[notification.type as keyof typeof notificationTypes];
              
              return (
                <div 
                  key={notification.id} 
                  className={`bg-white rounded-xl shadow-md border-l-4 ${typeInfo.borderColor} p-4 transition-all ${
                    !notification.read ? "shadow-md" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div className={`rounded-full p-2 mr-4 ${typeInfo.bg} ${typeInfo.iconColor}`}>
                      {typeInfo.icon}
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                            {notification.title}
                          </h3>
                          <p className={`mt-1 ${!notification.read ? "text-gray-800" : "text-gray-600"}`}>
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        
                        <div className="flex space-x-1 ml-4">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 rounded-full text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
