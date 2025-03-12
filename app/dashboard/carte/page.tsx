"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Map, Navigation, Search, MapPin, Filter, Layers, Bookmark, Circle, Star, BookOpen, Code } from "lucide-react";
import { FlipCards } from "@/components/flip-cards";
import { PythonExercises } from "@/components/python-exercises";
import { transcriptStore } from "@/services/transcript-store";

// Define custom blue king color
const blueKingColor = "#1E40AF";

export default function CartePage() {
  const [currentTab, setCurrentTab] = useState("campus");
  const [selectedVideos, setSelectedVideos] = useState<string[]>([]);
  const [storedVideos, setStoredVideos] = useState<any[]>([]);
  const [transcriptContext, setTranscriptContext] = useState("");
  
  // Load stored transcripts when component mounts
  useEffect(() => {
    const allTranscripts = transcriptStore.getAllTranscripts();
    
    // Convert to selection entries
    const videoEntries = allTranscripts.map(transcript => ({
      ...transcript,
      selected: false,
      title: `Video ${transcript.videoId}`
    }));
    
    setStoredVideos(videoEntries);
  }, []);

  // Update transcriptContext when selectedVideos change
  useEffect(() => {
    updateTranscriptContext();
  }, [selectedVideos, updateTranscriptContext]);

  // Toggle video selection
  const toggleVideoSelection = (videoId: string) => {
    // Find if the video is already selected
    const isCurrentlySelected = selectedVideos.includes(videoId);
    
    if (isCurrentlySelected) {
      // Remove the video from selected list
      setSelectedVideos(prev => prev.filter(id => id !== videoId));
    } else {
      // Add the video to selected list if less than 3 videos are selected
      if (selectedVideos.length < 3) {
        setSelectedVideos(prev => [...prev, videoId]);
      }
    }
    
    // Update the stored videos selection state
    setStoredVideos(prev => 
      prev.map(video => 
        video.videoId === videoId 
          ? { ...video, selected: !isCurrentlySelected } 
          : video
      )
    );
  };

  // Get combined transcript content from selected videos
  const updateTranscriptContext = useCallback(() => {
    let combinedContext = "";
    
    // Add each selected video's transcript to the context
    storedVideos.forEach(video => {
      if (selectedVideos.includes(video.videoId)) {
        combinedContext += `VIDEO: ${video.title || video.videoId}\n\n${video.transcript}\n\n`;
      }
    });
    
    setTranscriptContext(combinedContext);
  }, [storedVideos, selectedVideos]);
  
  const places = {
    campus: [
      { id: 1, name: "Main Library", description: "Central campus library with study spaces", distance: "0.2 miles", rating: 4.9 },
      { id: 2, name: "Science Building", description: "Labs and lecture halls", distance: "0.5 miles", rating: 4.7 },
      { id: 3, name: "Student Center", description: "Food, recreation, and study areas", distance: "0.3 miles", rating: 4.8 },
      { id: 4, name: "Engineering Hall", description: "Computer labs and classrooms", distance: "0.7 miles", rating: 4.6 },
      { id: 5, name: "Sports Complex", description: "Gym, pool, and athletic fields", distance: "1.0 miles", rating: 4.5 },
    ],
    study: [
      { id: 1, name: "Quiet Study Lounge", description: "Silent study area with individual desks", distance: "0.4 miles", rating: 4.9 },
      { id: 2, name: "Group Study Room B", description: "Collaborative space with whiteboard", distance: "0.3 miles", rating: 4.7 },
      { id: 3, name: "Library 3rd Floor", description: "Open study area with power outlets", distance: "0.2 miles", rating: 4.8 },
      { id: 4, name: "Computer Lab", description: "Access to computers and printing", distance: "0.5 miles", rating: 4.6 },
      { id: 5, name: "Outdoor Study Garden", description: "Peaceful outdoor study space", distance: "0.8 miles", rating: 4.5 },
    ],
    food: [
      { id: 1, name: "Campus Café", description: "Coffee, sandwiches, and snacks", distance: "0.2 miles", rating: 4.3 },
      { id: 2, name: "Student Center Food Court", description: "Multiple food options", distance: "0.3 miles", rating: 4.5 },
      { id: 3, name: "Green Leaf Salad Bar", description: "Healthy options and smoothies", distance: "0.4 miles", rating: 4.7 },
      { id: 4, name: "Pizza Corner", description: "Pizza, pasta, and quick meals", distance: "0.5 miles", rating: 4.2 },
      { id: 5, name: "International Kitchen", description: "Global cuisine options", distance: "0.7 miles", rating: 4.6 },
    ],
  };
  
  return (
    <div className="container mx-auto px-4 py-8 pl-[220px]">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900"></h1>
          </div>
          
        
          
          {/* Flashcards Section */}
          {transcriptContext && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 mr-2" style={{ color: blueKingColor }} />
                <h2 className="text-xl font-semibold text-gray-900">Study Flashcards</h2>
              </div>
              <FlipCards transcriptContext={transcriptContext} />
            </div>
          )}
          
          {/* Python Exercises Section */}
          {transcriptContext && (
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <Code className="h-5 w-5 mr-2" style={{ color: blueKingColor }} />
                <h2 className="text-xl font-semibold text-gray-900">Python Exercises</h2>
              </div>
              <PythonExercises transcriptContext={transcriptContext} />
            </div>
          )}
        </div>
        
        <div className="flex items-center mb-6">
          <Map className="h-6 w-6 mr-3" style={{ color: blueKingColor }} />
          <h1 className="text-2xl font-bold text-gray-900">Campus Map</h1>
        </div>
        
        {/* Search bar */}
        <div className="relative mb-6">
          <div className="flex items-center bg-white rounded-xl shadow-sm border border-gray-200 pl-4 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
            <Search className="h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              className="w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none"
              placeholder="Search locations, buildings, or services..." 
            />
            <Button 
              className="rounded-r-xl h-full px-5"
              style={{ backgroundColor: blueKingColor }}
            >
              Search
            </Button>
          </div>
        </div>
        
        {/* Map view */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="relative h-[300px] bg-gray-100">
            {/* Placeholder for an actual map */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-10 w-10 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-500 font-medium">Interactive Campus Map</p>
                <p className="text-sm text-gray-400">Map view would appear here</p>
              </div>
            </div>
            
            {/* Map controls */}
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 bg-white shadow-md rounded-full border-gray-200"
              >
                <Layers className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 bg-white shadow-md rounded-full border-gray-200"
              >
                <Plus className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                className="h-10 w-10 bg-white shadow-md rounded-full border-gray-200"
              >
                <Minus className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Actions bar */}
          <div className="p-4 border-t border-gray-200 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              className="rounded-lg flex items-center"
            >
              <Navigation className="h-4 w-4 mr-2" />
              Directions
            </Button>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-lg flex items-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-lg flex items-center"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          </div>
        </div>
        
        {/* Category tabs */}
        <div className="flex mb-6 border-b border-gray-200">
          {["campus", "study", "food"].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 font-medium text-sm ${
                currentTab === tab
                  ? 'border-b-2 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={{ 
                borderColor: currentTab === tab ? blueKingColor : 'transparent',
                color: currentTab === tab ? blueKingColor : ''
              }}
              onClick={() => setCurrentTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Locations
            </button>
          ))}
        </div>
        
        {/* Places list */}
        <div className="space-y-4">
          {places[currentTab as keyof typeof places].map((place) => (
            <div 
              key={place.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{place.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{place.description}</p>
                  
                  <div className="flex items-center mt-2">
                    <div className="flex items-center text-sm text-gray-500 mr-4">
                      <Navigation className="h-4 w-4 mr-1" />
                      {place.distance}
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Star className="h-4 w-4 text-yellow-400 mr-1" />
                      <span className="text-gray-700">{place.rating}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="rounded-lg"
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Plus icon component
function Plus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

// Minus icon component
function Minus(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}
