"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HealthStatus } from "./ready-to-use-examples/health-status";
import { CheckCircle, AlertTriangle, XCircle, Loader2, LogOut } from "lucide-react";

export function Navbar() {
  const router = useRouter();
  const [healthData, setHealthData] = useState<any>(null);
  const [healthError, setHealthError] = useState<string | null>(null);
  const [username, setUsername] = useState<string>("");
  const [userType, setUserType] = useState<string>("");

  useEffect(() => {
    // Get user info from localStorage
    const storedUsername = localStorage.getItem("username");
    const storedUserType = localStorage.getItem("userType");
    
    if (storedUsername) setUsername(storedUsername);
    if (storedUserType) setUserType(storedUserType);
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    
    // Redirect to login page
    router.push("/");
  };

  const handleHealthDataChange = (data: any, error: string | null) => {
    setHealthData(data);
    setHealthError(error);
  };

  // Helper function to determine status display for the navbar
  const getStatusDisplay = () => {
    if (healthError) {
      return {
        icon: <XCircle className="h-4 w-4" />,
        text: "Error",
        bgColor: "bg-red-100",
        textColor: "text-red-600"
      };
    }
    
    if (!healthData) {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        text: "Checking",
        bgColor: "bg-gray-100",
        textColor: "text-gray-600"
      };
    }
    
    const status = healthData.status?.toLowerCase();
    
    if (["healthy", "ok", "up", "running"].includes(status)) {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        text: "Healthy",
        bgColor: "bg-green-100",
        textColor: "text-green-600"
      };
    } else if (["warning", "degraded"].includes(status)) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        text: "Warning",
        bgColor: "bg-yellow-100",
        textColor: "text-yellow-600"
      };
    } else {
      return {
        icon: <XCircle className="h-4 w-4" />,
        text: "Error",
        bgColor: "bg-red-100",
        textColor: "text-red-600"
      };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            href="/dashboard" 
            className="flex items-center gap-2 font-bold text-gray-900"
          >
            <span className="bg-blue-500 rounded-lg p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M4 2.00004C4 1.44776 4.44772 1.00004 5 1.00004H19C19.5523 1.00004 20 1.44776 20 2.00004V22L12 19L4 22V2.00004Z" />
              </svg>
            </span>
            <span>StudyTube</span>
            <span className="text-blue-600 text-xs px-2 py-0.5 rounded-full bg-blue-50 font-medium hidden sm:inline-block">Beta</span>
          </Link>
          
          {/* User type badge */}
          {userType && (
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-2 ${
              userType === 'teacher' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-blue-100 text-blue-800'
            }`}>
              {userType === 'teacher' ? 'Teacher' : 'Student'}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-5">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9H21" />
            </svg>
            Dashboard
          </Link>
          <Link 
            href="/dashboard/carte" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
            Study Cards
          </Link>
          <Link 
            href="/quiz" 
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            Quiz
          </Link>
          <a 
            href="#top" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center gap-1.5 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            About
          </a>
          
          {/* Username display */}
          {username && (
            <span className="text-sm font-medium text-gray-700 hidden md:inline-block">
              {username}
            </span>
          )}
          
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition flex items-center gap-1.5"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
