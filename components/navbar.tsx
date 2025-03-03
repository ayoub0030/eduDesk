"use client";

import { useState } from "react";
import Link from "next/link";
import { HealthStatus } from "./ready-to-use-examples/health-status";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";

export function Navbar() {
  const [healthData, setHealthData] = useState<any>(null);
  const [healthError, setHealthError] = useState<string | null>(null);

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
        bgColor: "bg-red-900/40",
        textColor: "text-red-400"
      };
    }
    
    if (!healthData) {
      return {
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        text: "Checking",
        bgColor: "bg-zinc-800",
        textColor: "text-zinc-400"
      };
    }
    
    const status = healthData.status?.toLowerCase();
    
    if (["healthy", "ok", "up", "running"].includes(status)) {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        text: "Healthy",
        bgColor: "bg-green-900/40",
        textColor: "text-green-400"
      };
    } else if (["warning", "degraded"].includes(status)) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        text: "Warning",
        bgColor: "bg-yellow-900/40",
        textColor: "text-yellow-400"
      };
    } else {
      return {
        icon: <XCircle className="h-4 w-4" />,
        text: "Error",
        bgColor: "bg-red-900/40",
        textColor: "text-red-400"
      };
    }
  };

  const statusDisplay = getStatusDisplay();

  return (
    <div className="sticky top-0 z-50 w-full border-b border-indigo-800/30 bg-indigo-950/80 backdrop-blur-md shadow-md">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="flex items-center gap-2 font-bold text-white"
          >
            <span className="bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg p-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                <path d="M4 2.00004C4 1.44776 4.44772 1.00004 5 1.00004H19C19.5523 1.00004 20 1.44776 20 2.00004V22L12 19L4 22V2.00004Z" />
              </svg>
            </span>
            <span>StudyTube</span>
            <span className="text-yellow-300 text-xs px-2 py-0.5 rounded-full bg-yellow-300/10 font-medium hidden sm:inline-block">Beta</span>
          </Link>
        </div>
        
        <div className="flex items-center gap-5">
          <Link 
            href="/dashboard" 
            className="text-sm font-medium text-indigo-300 hover:text-white transition flex items-center gap-1.5"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M3 9H21" />
            </svg>
            Dashboard
          </Link>
          <Link 
            href="/quiz" 
            className="text-sm font-medium text-indigo-300 hover:text-white transition flex items-center gap-1.5"
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
            className="text-sm font-medium text-indigo-300 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            About
          </a>
      
          
        </div>
      </div>
    </div>
  );
}
