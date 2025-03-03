"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AuthScreen() {
  const router = useRouter();
  const [isTeacher, setIsTeacher] = useState(false);
  const [username, setUsername] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a fake login - just redirect to the main page
    // In a real app, you would validate credentials here
    if (username && studentId) {
      // Store user type in localStorage for persistence
      localStorage.setItem("userType", isTeacher ? "teacher" : "student");
      localStorage.setItem("username", username);
      
      // Redirect to the appropriate dashboard based on user type
      if (isTeacher) {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard");
      }
    }
  };
  
  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a fake account creation - just redirect to the main page
    // In a real app, you would create an account here
    if (username && studentId && email) {
      // Store user type in localStorage for persistence
      localStorage.setItem("userType", isTeacher ? "teacher" : "student");
      localStorage.setItem("username", username);
      localStorage.setItem("email", email);
      
      // Redirect to the appropriate dashboard based on user type
      if (isTeacher) {
        router.push("/dashboard/teacher");
      } else {
        router.push("/dashboard");
      }
    }
  };

  const toggleAccountCreation = () => {
    setIsCreatingAccount(!isCreatingAccount);
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-white">
      <div className="border-2 border-black rounded-3xl p-8 max-w-md w-full mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">
          welcome to <span className="text-blue-500">eduLoc</span>
        </h1>
        
        {/* Toggle Switch */}
        <div className="flex justify-center mb-8">
          <div className="border-2 border-black rounded-full p-1 flex w-32 relative">
            <button
              onClick={() => setIsTeacher(false)}
              className={`flex-1 rounded-full py-1 px-2 z-10 relative ${
                !isTeacher ? "text-white" : "text-black"
              }`}
            >
              S
            </button>
            <button
              onClick={() => setIsTeacher(true)}
              className={`flex-1 rounded-full py-1 px-2 z-10 relative ${
                isTeacher ? "text-white" : "text-black"
              }`}
            >
              T
            </button>
            <div 
              className={`absolute top-1 bottom-1 w-[calc(50%-2px)] rounded-full transition-all duration-300 ease-in-out ${
                isTeacher ? "right-1 bg-green-500" : "left-1 bg-blue-500"
              }`}
            ></div>
          </div>
        </div>
        
        <div className="mb-4 text-center">
          <span className="font-medium">{isTeacher ? "Teacher" : "Student"} Mode</span>
        </div>
        
        {isCreatingAccount ? (
          /* Create Account Form */
          <form onSubmit={handleCreateAccount} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-xl font-bold block text-left">
                user-name
              </label>
              <div className="border-2 border-black rounded-lg">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-0 bg-transparent h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-xl font-bold block text-left">
                email
              </label>
              <div className="border-2 border-black rounded-lg">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-0 bg-transparent h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="studentId" className="text-xl font-bold block text-left">
                {isTeacher ? "teacher-id" : "student-id"}
              </label>
              <div className="border-2 border-black rounded-lg">
                <Input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="border-0 bg-transparent h-12"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-transparent border-2 border-blue-500 text-blue-500 rounded-full py-2 h-12"
              >
                create account
              </Button>
            </div>
            
            <div className="pt-2">
              <button
                type="button"
                onClick={toggleAccountCreation}
                className="text-xl font-bold text-black"
              >
                back to login
              </button>
            </div>
          </form>
        ) : (
          /* Login Form */
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="text-xl font-bold block text-left">
                user-name
              </label>
              <div className="border-2 border-black rounded-lg">
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-0 bg-transparent h-12"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="studentId" className="text-xl font-bold block text-left">
                {isTeacher ? "teacher-id" : "student-id"}
              </label>
              <div className="border-2 border-black rounded-lg">
                <Input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="border-0 bg-transparent h-12"
                  required
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                className="w-full bg-transparent border-2 border-blue-500 text-blue-500 rounded-full py-2 h-12"
              >
                log in
              </Button>
            </div>
            
            <div className="pt-2">
              <button
                type="button"
                onClick={toggleAccountCreation}
                className="text-xl font-bold text-black"
              >
                create account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
