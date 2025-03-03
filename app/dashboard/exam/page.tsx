"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Clock, Calendar, Check, AlertTriangle, Search, Filter, ChevronRight, ArrowRight } from "lucide-react";

// Define custom blue king color
const blueKingColor = "#1E40AF";

export default function ExamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const upcomingExams = [
    { 
      id: 1, 
      subject: "Mathematics", 
      title: "Calculus II Midterm", 
      date: "March 15, 2025", 
      time: "10:00 AM - 12:00 PM", 
      location: "Science Hall Room 302",
      status: "Upcoming",
      daysLeft: 12
    },
    { 
      id: 2, 
      subject: "Computer Science", 
      title: "Data Structures Final", 
      date: "March 20, 2025", 
      time: "2:00 PM - 5:00 PM", 
      location: "Engineering Building Room 204",
      status: "Upcoming",
      daysLeft: 17
    },
    { 
      id: 3, 
      subject: "Physics", 
      title: "Classical Mechanics Quiz", 
      date: "March 10, 2025", 
      time: "1:00 PM - 2:00 PM", 
      location: "Physics Lab A",
      status: "Upcoming",
      daysLeft: 7
    }
  ];
  
  const pastExams = [
    { 
      id: 4, 
      subject: "English Literature", 
      title: "Modern Poetry Exam", 
      date: "February 25, 2025", 
      time: "9:00 AM - 11:00 AM", 
      location: "Humanities Building Room 107",
      status: "Completed",
      grade: "A-"
    },
    { 
      id: 5, 
      subject: "Biology", 
      title: "Molecular Cell Biology", 
      date: "February 18, 2025", 
      time: "11:00 AM - 1:00 PM", 
      location: "Life Sciences Building Room 205",
      status: "Completed",
      grade: "B+"
    },
    { 
      id: 6, 
      subject: "Chemistry", 
      title: "Organic Chemistry I", 
      date: "February 10, 2025", 
      time: "10:00 AM - 12:00 PM", 
      location: "Chemistry Building Room 301",
      status: "Completed",
      grade: "A"
    }
  ];
  
  const filteredUpcomingExams = upcomingExams.filter(exam => 
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredPastExams = pastExams.filter(exam => 
    exam.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exam.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="container mx-auto px-4 py-8 pl-[220px]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <FileText className="h-6 w-6 mr-3" style={{ color: blueKingColor }} />
          <h1 className="text-2xl font-bold text-gray-900">Exams & Assessments</h1>
        </div>
        
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input 
              type="text"
              placeholder="Search exams..."
              className="pl-10 rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            className="flex items-center space-x-2 rounded-lg"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          
          <Button 
            className="rounded-lg"
            style={{ backgroundColor: blueKingColor }}
          >
            Practice Exams
          </Button>
        </div>
        
        {/* Upcoming Exams Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Upcoming Exams</h2>
          
          {filteredUpcomingExams.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No upcoming exams</h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? "No exams match your search criteria" 
                  : "You have no upcoming exams scheduled at this time"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredUpcomingExams.map((exam) => (
                <div 
                  key={exam.id} 
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <div className="flex items-center mb-2">
                          <span 
                            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2"
                          >
                            {exam.subject}
                          </span>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {exam.daysLeft} days left
                          </span>
                        </div>
                        <h3 className="font-medium text-gray-900 text-lg mb-1">{exam.title}</h3>
                      </div>
                      
                      <Button 
                        className="mt-4 sm:mt-0 rounded-lg"
                        style={{ backgroundColor: blueKingColor }}
                      >
                        Prepare
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                        <span>{exam.date}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-5 w-5 mr-2 text-gray-400" />
                        <span>{exam.time}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center text-gray-600">
                        <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                        <span>{exam.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Past Exams Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Past Exams</h2>
          
          {filteredPastExams.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-6 text-center">
              <FileText className="h-12 w-12 mx-auto text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No past exams</h3>
              <p className="text-gray-500">
                {searchQuery 
                  ? "No past exams match your search criteria" 
                  : "Your past exam history will appear here"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPastExams.map((exam) => (
                <div 
                  key={exam.id} 
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center mb-1">
                        <span 
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                        >
                          {exam.subject}
                        </span>
                        {exam.grade && (
                          <span 
                            className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                          >
                            Grade: {exam.grade}
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900">{exam.title}</h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {exam.date} • {exam.time}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-2 sm:mt-0 text-gray-600 hover:text-gray-900 rounded-lg"
                    >
                      View Details
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// MapPin icon component
function MapPin(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
