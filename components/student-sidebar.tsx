"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { 
  User, 
  MessageSquare, 
  Map, 
  Bell, 
  FileText, 
  BookOpen, 
  UserCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Define custom blue king color
const blueKingColor = "#1E40AF"; // Deep blue color

export function StudentSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const navItems = [
    { 
      name: "Student", 
      href: "/dashboard", 
      icon: <User className="h-5 w-5" /> 
    },
    { 
      name: "Chat Bot", 
      href: "/dashboard/chatbot", 
      icon: <MessageSquare className="h-5 w-5" /> 
    },
    { 
      name: "Carte", 
      href: "/dashboard/carte", 
      icon: <Map className="h-5 w-5" /> 
    },
    { 
      name: "Notification", 
      href: "/dashboard/notifications", 
      icon: <Bell className="h-5 w-5" /> 
    },
    { 
      name: "Exam", 
      href: "/dashboard/exam", 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: "Exercice", 
      href: "/dashboard/exercice", 
      icon: <BookOpen className="h-5 w-5" /> 
    },
    { 
      name: "Profile", 
      href: "/dashboard/profile", 
      icon: <UserCircle className="h-5 w-5" /> 
    },
  ];
  
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    
    // Redirect to the login page
    router.push("/");
  };

  return (
    <div className="h-screen w-[200px] bg-white border-r border-gray-200 flex flex-col fixed left-0 top-0 z-10">
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-bold text-xl" style={{ color: blueKingColor }}></h2>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex items-center space-x-3 p-3 rounded-lg font-medium text-sm transition-all ${
                isActive 
                  ? 'text-white shadow-md' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              style={isActive ? { backgroundColor: blueKingColor } : {}}
            >
              <div>
                {item.icon}
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-700">
              {typeof window !== 'undefined' ? localStorage.getItem("username") || "User" : "User"}
            </div>
            <div className="text-gray-500 text-xs">Student</div>
          </div>
        </div>
        
        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full rounded-lg text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 flex items-center justify-center"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}
