"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Award, 
  TrendingUp,
  Plus,
  Check,
  X,
  Edit
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define custom blue king color
const blueKingColor = "#1E40AF"; // Deep blue color

export default function Dashboard() {
  const router = useRouter();
  const [userType, setUserType] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [todoItems, setTodoItems] = useState([
    { id: 1, text: "Complete Math Assignment", completed: false },
    { id: 2, text: "Study for Biology Exam", completed: true },
    { id: 3, text: "Read Chapter 5 of History Book", completed: false },
    { id: 4, text: "Prepare presentation slides", completed: false }
  ]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodo, setEditingTodo] = useState<{id: number, text: string} | null>(null);

  // Student class schedule data
  const classSchedule = [
    { id: 1, subject: "Mathematics", time: "08:30 - 10:00", room: "A-101", day: "Monday" },
    { id: 2, subject: "Physics", time: "10:15 - 11:45", room: "B-203", day: "Monday" },
    { id: 3, subject: "Computer Science", time: "13:00 - 14:30", room: "Lab C", day: "Monday" },
    { id: 4, subject: "English Literature", time: "08:30 - 10:00", room: "D-105", day: "Tuesday" },
    { id: 5, subject: "Chemistry", time: "10:15 - 11:45", room: "Lab B", day: "Tuesday" },
    { id: 6, subject: "History", time: "13:00 - 14:30", room: "A-205", day: "Tuesday" },
    { id: 7, subject: "Biology", time: "08:30 - 10:00", room: "Lab A", day: "Wednesday" }
  ];

  // Student statistics
  const studentStats = [
    { label: "Courses Enrolled", value: "6", icon: <BookOpen className="h-6 w-6" /> },
    { label: "Attendance Rate", value: "94%", icon: <Calendar className="h-6 w-6" /> },
    { label: "Study Hours", value: "18h", icon: <Clock className="h-6 w-6" /> },
    { label: "Completed Tasks", value: "12", icon: <CheckCircle className="h-6 w-6" /> }
  ];

  useEffect(() => {
    // Check if user is logged in
    const storedUserType = localStorage.getItem("userType");
    
    if (!storedUserType) {
      // Redirect to login if not authenticated
      router.push("/");
    } else {
      setUserType(storedUserType);
      
      // Redirect teachers to their specific dashboard
      if (storedUserType === "teacher") {
        router.push("/dashboard/teacher");
      } else {
        setIsLoading(false);
      }
    }
  }, [router]);

  // Todo list handlers
  const addTodo = () => {
    if (newTodo.trim() === "") return;
    
    const newId = todoItems.length > 0 ? Math.max(...todoItems.map(item => item.id)) + 1 : 1;
    setTodoItems([...todoItems, { id: newId, text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const toggleTodo = (id: number) => {
    setTodoItems(todoItems.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTodo = (id: number) => {
    setTodoItems(todoItems.filter(item => item.id !== id));
  };

  const startEditTodo = (id: number, text: string) => {
    setEditingTodo({ id, text });
  };

  const saveEditTodo = () => {
    if (editingTodo) {
      setTodoItems(todoItems.map(item => 
        item.id === editingTodo.id ? { ...item, text: editingTodo.text } : item
      ));
      setEditingTodo(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="animate-spin h-8 w-8 border-4" style={{ borderColor: `${blueKingColor} transparent ${blueKingColor} transparent` }}></div>
      </div>
    );
  }

  // Get today's classes
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const todayClasses = classSchedule.filter(cls => cls.day === today);

  // This is the student dashboard
  return (
    <div className="container mx-auto py-6 px-4 bg-gray-50 min-h-screen pl-[220px]">
      <div className="mb-8">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Student Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {localStorage.getItem("username") || "User"}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {studentStats.map((stat, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center"
          >
            <div className="p-3 rounded-full mr-4" style={{ backgroundColor: `${blueKingColor}20` }}>
              <div className="text-blue-700">
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
              <p className="text-2xl font-bold" style={{ color: blueKingColor }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Classes */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold" style={{ color: blueKingColor }}>Today's Class Schedule</h2>
              <div className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                {today}
              </div>
            </div>
            
            {todayClasses.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Room
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {todayClasses.map((cls) => (
                      <tr key={cls.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{cls.subject}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{cls.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-gray-500">{cls.room}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No classes scheduled for today.</p>
              </div>
            )}
          </div>

          {/* Weekly Schedule */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-4" style={{ color: blueKingColor }}>Weekly Schedule</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Day
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Room
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {classSchedule.map((cls) => (
                    <tr key={cls.id} className={cls.day === today ? "bg-blue-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{cls.day}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{cls.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{cls.time}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-500">{cls.room}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* To-Do List */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md h-full">
            <h2 className="text-xl font-semibold mb-4" style={{ color: blueKingColor }}>To-Do List</h2>
            
            {/* Add new todo */}
            <div className="flex mb-4">
              <Input
                placeholder="Add a new task..."
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                className="flex-1 rounded-l-lg border-gray-300"
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <Button 
                className="rounded-r-lg"
                style={{ backgroundColor: blueKingColor }}
                onClick={addTodo}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Todo list */}
            <div className="space-y-2">
              {todoItems.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-3 rounded-lg border ${
                    item.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
                  }`}
                >
                  {editingTodo && editingTodo.id === item.id ? (
                    <div className="flex items-center">
                      <Input
                        value={editingTodo.text}
                        onChange={(e) => setEditingTodo({...editingTodo, text: e.target.value})}
                        className="flex-1 border-gray-300"
                      />
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={saveEditTodo}
                        className="ml-2"
                      >
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <button 
                          onClick={() => toggleTodo(item.id)}
                          className={`h-5 w-5 rounded-full mr-3 flex items-center justify-center ${
                            item.completed ? 'bg-green-500 text-white' : 'border border-gray-300'
                          }`}
                        >
                          {item.completed && <Check className="h-3 w-3" />}
                        </button>
                        <span className={item.completed ? 'line-through text-gray-400' : ''}>
                          {item.text}
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => startEditTodo(item.id, item.text)}
                          className="text-gray-400 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => deleteTodo(item.id)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              {todoItems.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                  <p>No tasks on your list.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
