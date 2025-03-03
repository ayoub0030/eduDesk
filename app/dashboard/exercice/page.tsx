"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Check, Clock, BarChart, Star, Search, Filter, ArrowRight, CheckCircle, Circle } from "lucide-react";

// Define custom blue king color
const blueKingColor = "#1E40AF";

export default function ExercicePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string | null>(null);
  const [showCompleted, setShowCompleted] = useState(true);
  
  const exerciseSets = [
    {
      id: 1,
      subject: "Mathematics",
      title: "Calculus: Derivatives and Integrals",
      totalExercises: 20,
      completedExercises: 15,
      difficulty: "Intermediate",
      estimatedTime: "45 minutes",
      dueDate: "March 10, 2025",
      tags: ["calculus", "mathematics"],
      completed: false
    },
    {
      id: 2,
      subject: "Physics",
      title: "Dynamics: Forces and Motion",
      totalExercises: 15,
      completedExercises: 15,
      difficulty: "Advanced",
      estimatedTime: "60 minutes",
      dueDate: "February 28, 2025",
      tags: ["physics", "mechanics"],
      completed: true
    },
    {
      id: 3,
      subject: "Computer Science",
      title: "Algorithms: Sorting and Searching",
      totalExercises: 12,
      completedExercises: 8,
      difficulty: "Intermediate",
      estimatedTime: "40 minutes",
      dueDate: "March 15, 2025",
      tags: ["programming", "algorithms"],
      completed: false
    },
    {
      id: 4,
      subject: "Chemistry",
      title: "Organic Chemistry: Functional Groups",
      totalExercises: 18,
      completedExercises: 5,
      difficulty: "Beginner",
      estimatedTime: "30 minutes",
      dueDate: "March 5, 2025",
      tags: ["chemistry", "organic"],
      completed: false
    },
    {
      id: 5,
      subject: "English",
      title: "Grammar and Composition",
      totalExercises: 25,
      completedExercises: 25,
      difficulty: "Beginner",
      estimatedTime: "50 minutes",
      dueDate: "February 20, 2025",
      tags: ["grammar", "writing"],
      completed: true
    },
  ];
  
  // Apply filters
  const filteredExercises = exerciseSets.filter(exercise => {
    // Search query filter
    if (searchQuery && !exercise.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !exercise.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !exercise.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Difficulty filter
    if (difficultyFilter && exercise.difficulty !== difficultyFilter) {
      return false;
    }
    
    // Completed/Incomplete filter
    if (!showCompleted && exercise.completed) {
      return false;
    }
    
    return true;
  });
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pl-[220px]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <BookOpen className="h-6 w-6 mr-3" style={{ color: blueKingColor }} />
          <h1 className="text-2xl font-bold text-gray-900">Practice Exercises</h1>
        </div>
        
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="text"
                placeholder="Search exercises..."
                className="pl-10 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Button 
              variant={difficultyFilter ? "default" : "outline"}
              className="flex items-center rounded-lg"
              style={difficultyFilter ? { backgroundColor: blueKingColor } : {}}
              onClick={() => {
                // Cycle through difficulty filters
                if (!difficultyFilter) setDifficultyFilter("Beginner");
                else if (difficultyFilter === "Beginner") setDifficultyFilter("Intermediate");
                else if (difficultyFilter === "Intermediate") setDifficultyFilter("Advanced");
                else setDifficultyFilter(null);
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              {difficultyFilter || "All Levels"}
            </Button>
            
            <Button 
              variant="outline"
              className={`flex items-center rounded-lg ${!showCompleted ? 'border-blue-500 text-blue-600' : ''}`}
              onClick={() => setShowCompleted(!showCompleted)}
            >
              {showCompleted ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Show All
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4 mr-2" />
                  Hide Completed
                </>
              )}
            </Button>
          </div>
          
          {/* Active filters display */}
          {(searchQuery || difficultyFilter || !showCompleted) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {searchQuery && (
                <div className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                  <span>Search: {searchQuery}</span>
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700" 
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {difficultyFilter && (
                <div className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                  <span>Level: {difficultyFilter}</span>
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700" 
                    onClick={() => setDifficultyFilter(null)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              {!showCompleted && (
                <div className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full flex items-center">
                  <span>Incomplete Only</span>
                  <button 
                    className="ml-2 text-gray-500 hover:text-gray-700" 
                    onClick={() => setShowCompleted(true)}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              <button 
                className="text-sm text-blue-600 hover:text-blue-800 ml-auto"
                onClick={() => {
                  setSearchQuery("");
                  setDifficultyFilter(null);
                  setShowCompleted(true);
                }}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
        
        {/* Exercise Sets */}
        {filteredExercises.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700 mb-1">No exercises found</h3>
            <p className="text-gray-500">
              Try adjusting your filters or search for something else
            </p>
            <Button 
              className="mt-4 rounded-lg"
              style={{ backgroundColor: blueKingColor }}
              onClick={() => {
                setSearchQuery("");
                setDifficultyFilter(null);
                setShowCompleted(true);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredExercises.map((exercise) => (
              <div 
                key={exercise.id} 
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  exercise.completed ? 'border border-green-200' : ''
                }`}
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex items-center mb-2 flex-wrap gap-2">
                        <span 
                          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 mr-2"
                        >
                          {exercise.subject}
                        </span>
                        <span 
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}
                        >
                          {exercise.difficulty}
                        </span>
                        {exercise.completed && (
                          <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Completed
                          </span>
                        )}
                      </div>
                      <h3 className="font-medium text-gray-900 text-lg mb-2">{exercise.title}</h3>
                    </div>
                    
                    <Button 
                      className="mt-4 sm:mt-0 rounded-lg"
                      style={{ backgroundColor: blueKingColor }}
                    >
                      {exercise.completed ? "Review" : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="h-2.5 rounded-full" 
                        style={{ 
                          width: `${(exercise.completedExercises / exercise.totalExercises) * 100}%`,
                          backgroundColor: blueKingColor 
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm text-gray-600">
                        {exercise.completedExercises} of {exercise.totalExercises} completed
                      </span>
                      <span className="text-sm text-gray-600">
                        {Math.round((exercise.completedExercises / exercise.totalExercises) * 100)}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-5 w-5 mr-2 text-gray-400" />
                      <span>{exercise.estimatedTime}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                      <span>Due: {exercise.dueDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Progress Summary */}
        <div className="bg-white rounded-xl shadow-md p-5 mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Your Progress</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: blueKingColor }}>
                {exerciseSets.filter(ex => ex.completed).length}
              </div>
              <div className="text-sm text-gray-600">Sets Completed</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: blueKingColor }}>
                {exerciseSets.reduce((sum, ex) => sum + ex.completedExercises, 0)}
              </div>
              <div className="text-sm text-gray-600">Exercises Solved</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold" style={{ color: blueKingColor }}>
                {Math.round(
                  (exerciseSets.reduce((sum, ex) => sum + ex.completedExercises, 0) / 
                  exerciseSets.reduce((sum, ex) => sum + ex.totalExercises, 0)) * 100
                )}%
              </div>
              <div className="text-sm text-gray-600">Overall Completion</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Calendar icon component
function Calendar(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

// X icon component
function X(props: React.SVGProps<SVGSVGElement>) {
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
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
