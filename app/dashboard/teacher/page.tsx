"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle, Edit, Trash2, Bell, X, UsersRound, BookOpen, GraduationCap, Award, LogOut } from "lucide-react";

// Define custom blue king color
const blueKingColor = "#1E40AF"; // Deep blue color

// Fake student data
const initialStudents = [
  { id: 1, name: "John Doe", email: "john@example.com", course: "Mathematics", grade: "A" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", course: "Physics", grade: "B+" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", course: "Chemistry", grade: "A-" },
  { id: 4, name: "Sara Wilson", email: "sara@example.com", course: "Biology", grade: "B" },
  { id: 5, name: "Alex Brown", email: "alex@example.com", course: "Computer Science", grade: "A+" },
];

// Fake notifications
const initialNotifications = [
  { id: 1, message: "New student registered: Emma Davis", time: "10 minutes ago", read: false },
  { id: 2, message: "Assignment deadline approaching for Physics class", time: "1 hour ago", read: false },
  { id: 3, message: "System maintenance scheduled for tonight", time: "3 hours ago", read: true },
];

// Fake analytics data
const analyticsData = [
  { title: "Total Students", value: "156", icon: <UsersRound className="h-6 w-6" style={{ color: blueKingColor }} /> },
  { title: "Active Courses", value: "12", icon: <BookOpen className="h-6 w-6 text-green-500" /> },
  { title: "Graduation Rate", value: "94%", icon: <GraduationCap className="h-6 w-6 text-purple-500" /> },
  { title: "Honor Students", value: "37", icon: <Award className="h-6 w-6 text-yellow-500" /> },
];

export default function TeacherDashboard() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // CRUD state
  const [students, setStudents] = useState(initialStudents);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [newStudent, setNewStudent] = useState({ name: "", email: "", course: "", grade: "" });
  const [isAddingStudent, setIsAddingStudent] = useState(false);

  useEffect(() => {
    // Check if user is logged in as teacher
    const storedUserType = localStorage.getItem("userType");
    
    if (!storedUserType) {
      // Redirect to login if not authenticated
      router.push("/");
    } else if (storedUserType !== "teacher") {
      // Redirect to student dashboard if not a teacher
      router.push("/dashboard");
    } else {
      setUserType(storedUserType);
      setIsLoading(false);
    }
  }, [router]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userType");
    router.push("/");
  };

  // CRUD Functions
  const handleAddStudent = () => {
    if (newStudent.name && newStudent.email) {
      setStudents([
        ...students,
        { 
          id: students.length + 1, 
          name: newStudent.name, 
          email: newStudent.email,
          course: newStudent.course,
          grade: newStudent.grade 
        }
      ]);
      setNewStudent({ name: "", email: "", course: "", grade: "" });
      setIsAddingStudent(false);
      
      // Add notification
      const newNotification = {
        id: notifications.length + 1,
        message: `New student added: ${newStudent.name}`,
        time: "Just now",
        read: false
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  const handleEditStudent = (student: any) => {
    setEditingStudent({ ...student });
  };

  const handleUpdateStudent = () => {
    if (editingStudent && editingStudent.name && editingStudent.email) {
      setStudents(
        students.map(student => 
          student.id === editingStudent.id ? editingStudent : student
        )
      );
      setEditingStudent(null);
      
      // Add notification
      const newNotification = {
        id: notifications.length + 1,
        message: `Student updated: ${editingStudent.name}`,
        time: "Just now",
        read: false
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  const handleDeleteStudent = (id: number) => {
    const studentToDelete = students.find(student => student.id === id);
    setStudents(students.filter(student => student.id !== id));
    
    // Add notification
    if (studentToDelete) {
      const newNotification = {
        id: notifications.length + 1,
        message: `Student removed: ${studentToDelete.name}`,
        time: "Just now",
        read: false
      };
      setNotifications([newNotification, ...notifications]);
    }
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin h-8 w-8 border-4" style={{ borderColor: `${blueKingColor} transparent ${blueKingColor} transparent` }}></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen">
      {/* Header with Teacher Badge, Title & Logout */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <div 
            className="text-white px-3 py-1 rounded-lg font-semibold text-sm inline-block shadow-md"
            style={{ backgroundColor: blueKingColor }}
          >
            Teacher
          </div>
          <h1 className="text-2xl font-bold ml-4 text-gray-900">Dashboard</h1>
        </div>
        <Button 
          onClick={handleLogout} 
          variant="outline"
          className="flex items-center border rounded-lg hover:bg-gray-100"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {analyticsData.map((item, index) => (
          <div 
            key={index} 
            className="bg-white border border-gray-200 rounded-xl p-6 shadow-md transition-all hover:shadow-lg"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-gray-800 font-semibold">{item.title}</div>
              {item.icon}
            </div>
            <div className="text-3xl font-bold" style={{ color: blueKingColor }}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Student CRUD */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Students</h2>
          <Button 
            onClick={() => setIsAddingStudent(true)} 
            className="rounded-lg shadow-sm transition-all hover:shadow-md"
            style={{ backgroundColor: blueKingColor }}
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Add Student
          </Button>
        </div>

        {/* Add Student Form */}
        {isAddingStudent && (
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4 shadow-md">
            <h3 className="font-medium mb-3 text-gray-800">Add New Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input 
                placeholder="Name" 
                value={newStudent.name} 
                onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                className="rounded-lg"
              />
              <Input 
                placeholder="Email" 
                value={newStudent.email} 
                onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                className="rounded-lg"
              />
              <Input 
                placeholder="Course" 
                value={newStudent.course} 
                onChange={(e) => setNewStudent({...newStudent, course: e.target.value})}
                className="rounded-lg"
              />
              <Input 
                placeholder="Grade" 
                value={newStudent.grade} 
                onChange={(e) => setNewStudent({...newStudent, grade: e.target.value})}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setIsAddingStudent(false)}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleAddStudent}
                className="rounded-lg"
                style={{ backgroundColor: blueKingColor }}
              >
                Add Student
              </Button>
            </div>
          </div>
        )}

        {/* Edit Student Form */}
        {editingStudent && (
          <div className="bg-white p-6 rounded-xl border border-gray-200 mb-4 shadow-md">
            <h3 className="font-medium mb-3 text-gray-800">Edit Student</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <Input 
                placeholder="Name" 
                value={editingStudent.name} 
                onChange={(e) => setEditingStudent({...editingStudent, name: e.target.value})}
                className="rounded-lg"
              />
              <Input 
                placeholder="Email" 
                value={editingStudent.email} 
                onChange={(e) => setEditingStudent({...editingStudent, email: e.target.value})}
                className="rounded-lg"
              />
              <Input 
                placeholder="Course" 
                value={editingStudent.course} 
                onChange={(e) => setEditingStudent({...editingStudent, course: e.target.value})}
                className="rounded-lg"
              />
              <Input 
                placeholder="Grade" 
                value={editingStudent.grade} 
                onChange={(e) => setEditingStudent({...editingStudent, grade: e.target.value})}
                className="rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setEditingStudent(null)}
                className="rounded-lg"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleUpdateStudent}
                className="rounded-lg"
                style={{ backgroundColor: blueKingColor }}
              >
                Update Student
              </Button>
            </div>
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white overflow-hidden border border-gray-200 rounded-xl shadow-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.course}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      className="hover:text-blue-500"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.id)}
                      className="hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <div className="flex items-center mb-4">
          <Bell className="h-5 w-5 mr-2" style={{ color: blueKingColor }} />
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        </div>
        
        {notifications.length === 0 ? (
          <div className="bg-white text-gray-500 p-4 rounded-xl border border-gray-200 text-center">
            No notifications
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex justify-between items-start p-4 rounded-xl shadow-sm border ${
                  notification.read 
                    ? "bg-white border-gray-200" 
                    : "border-blue-100"
                }`}
                style={!notification.read ? { backgroundColor: '#EBF4FF', borderColor: blueKingColor } : {}}
              >
                <div>
                  <div className="font-medium text-gray-800">{notification.message}</div>
                  <div className="text-sm text-gray-500">{notification.time}</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => dismissNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
