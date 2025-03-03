"use client";

import { StudentSidebar } from "@/components/student-sidebar";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    // Check if user is authenticated
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType);
    
    if (!storedUserType) {
      router.push("/");
    }
  }, [router]);

  // Initial server-side render won't show navbar, only after client-side hydration
  if (!isClient) {
    return <div className="bg-white">{children}</div>;
  }

  // Check if this is the teacher dashboard path
  const isTeacherDashboard = pathname === "/dashboard/teacher";

  // Return the layout
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Show student sidebar for student users */}
      {userType === "student" && <StudentSidebar />}
      
      {/* Main content */}
      <main className={userType === "student" ? "min-h-screen" : ""}>
        {children}
      </main>
    </div>
  );
}
