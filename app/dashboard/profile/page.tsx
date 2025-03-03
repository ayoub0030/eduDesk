"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Mail, Phone, MapPin, Pencil, Save, X, Book, GraduationCap, Award } from "lucide-react";

// Define custom blue king color
const blueKingColor = "#1E40AF";

export default function ProfilePage() {
  const [username, setUsername] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 University Ave, New York, NY",
    department: "Computer Science",
    year: "Junior Year",
    gpa: "3.85"
  });
  
  const [editableProfile, setEditableProfile] = useState({ ...profile });
  
  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditableProfile({ ...profile });
    }
    setIsEditing(!isEditing);
  };
  
  const handleSaveProfile = () => {
    setProfile({ ...editableProfile });
    setIsEditing(false);
  };
  
  const handleInputChange = (field: string, value: string) => {
    setEditableProfile({
      ...editableProfile,
      [field]: value
    });
  };
  
  const coursesList = [
    { id: 1, name: "Introduction to AI", grade: "A", credits: 4, status: "Completed" },
    { id: 2, name: "Data Structures & Algorithms", grade: "A-", credits: 4, status: "Completed" },
    { id: 3, name: "Advanced Web Development", grade: "B+", credits: 3, status: "In Progress" },
    { id: 4, name: "Machine Learning Basics", grade: "A", credits: 4, status: "In Progress" },
    { id: 5, name: "Database Systems", grade: "B", credits: 3, status: "Completed" },
  ];
  
  const achievements = [
    { id: 1, title: "Dean's List", date: "Fall 2024", icon: <Award className="h-5 w-5" /> },
    { id: 2, title: "Hackathon Winner", date: "Spring 2024", icon: <Trophy className="h-5 w-5" /> },
    { id: 3, title: "Academic Excellence Award", date: "2023", icon: <GraduationCap className="h-5 w-5" /> },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 pl-[220px]">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="h-40 bg-gradient-to-r from-blue-500 to-purple-600 relative">
            <Button 
              variant="outline" 
              size="sm" 
              className="absolute top-4 right-4 bg-white/80 hover:bg-white"
            >
              <Camera className="h-4 w-4 mr-2" />
              Update Cover
            </Button>
          </div>
          
          <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center">
            <div className="flex-shrink-0 sm:-mt-16 mb-4 sm:mb-0">
              <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-4 border-white shadow-md flex items-center justify-center text-white text-4xl font-bold">
                {username.charAt(0).toUpperCase()}
              </div>
            </div>
            
            <div className="sm:ml-6 flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.fullName}</h1>
                  <p className="text-gray-600 mt-1">{profile.department} Student</p>
                </div>
                
                <Button 
                  variant={isEditing ? "outline" : "default"}
                  className="mt-4 sm:mt-0 rounded-lg"
                  onClick={handleEditToggle}
                  style={!isEditing ? { backgroundColor: blueKingColor } : {}}
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Pencil className="h-4 w-4 mr-2" />
                      Edit Profile
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Personal Info */}
          <div className="md:col-span-1 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: blueKingColor }}>
                Personal Information
              </h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Full Name</label>
                    <Input 
                      value={editableProfile.fullName} 
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Email</label>
                    <Input 
                      value={editableProfile.email} 
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Phone</label>
                    <Input 
                      value={editableProfile.phone} 
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Address</label>
                    <Input 
                      value={editableProfile.address} 
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <Button 
                    onClick={handleSaveProfile}
                    className="w-full mt-2 rounded-lg"
                    style={{ backgroundColor: blueKingColor }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Email</div>
                      <div className="text-gray-800">{profile.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Phone</div>
                      <div className="text-gray-800">{profile.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Address</div>
                      <div className="text-gray-800">{profile.address}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Academic Info Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: blueKingColor }}>
                Academic Information
              </h2>
              
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Department</label>
                    <Input 
                      value={editableProfile.department} 
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">Year</label>
                    <Input 
                      value={editableProfile.year} 
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-500 mb-1 block">GPA</label>
                    <Input 
                      value={editableProfile.gpa} 
                      onChange={(e) => handleInputChange('gpa', e.target.value)}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Book className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Department</div>
                      <div className="text-gray-800">{profile.department}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">Year</div>
                      <div className="text-gray-800">{profile.year}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Award className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                    <div>
                      <div className="text-sm text-gray-500">GPA</div>
                      <div className="text-gray-800">{profile.gpa}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Courses & Achievements */}
          <div className="md:col-span-2 space-y-6">
            {/* Courses Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: blueKingColor }}>
                Current and Past Courses
              </h2>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Course</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Credits</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Grade</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {coursesList.map((course) => (
                      <tr key={course.id} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-800">{course.name}</td>
                        <td className="py-3 px-4 text-gray-800">{course.credits}</td>
                        <td className="py-3 px-4 text-gray-800">{course.grade}</td>
                        <td className="py-3 px-4">
                          <span 
                            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                              course.status === 'Completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {course.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Achievements Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: blueKingColor }}>
                Achievements & Awards
              </h2>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id} 
                    className="flex items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div 
                      className="h-10 w-10 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${blueKingColor}20` }}
                    >
                      {achievement.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{achievement.title}</div>
                      <div className="text-sm text-gray-500">{achievement.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Trophy icon component
function Trophy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
